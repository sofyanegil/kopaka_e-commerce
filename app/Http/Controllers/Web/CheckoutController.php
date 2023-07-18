<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\DeliveryArea;
use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $deliveryAreas = DeliveryArea::all();
        $stores = Store::all();
        return Inertia::render('Web/Checkouts/Index', [
            'deliveryAreas' => $deliveryAreas,
            'stores' => $stores
        ]);
    }

    public function store(Request $request)
    {
        $duitkuConfig = new \Duitku\Config(config('duitku.merchant_key'), config('duitku.merchant_code'));
        $duitkuConfig->setSandboxMode(config('duitku.sandbox_mode'));
        $duitkuConfig->setSanitizedMode(true);
        $duitkuConfig->setDuitkuLogs(false);

        $this->validate($request, [
            'order_type' => 'required',
            'delivery_phone' => 'required|digits_between:10,13|numeric',
            'delivery_date' => 'required',
            'delivery_address' => $request->order_type === 'DELIVERY' ? 'required' : '',
        ]);

        DB::transaction(function () use ($duitkuConfig, $request) {
            $orderType = $request->order_type;
            $orderNumber = 'ORD-' . date('ymdhi') . '-' . rand(1, 100);
            $customerDetail = [
                'firstName' => auth()->user()->user_name,
                'phoneNumber' => $request->delivery_phone,
                'email' => auth()->user()->user_email,
            ];
            $paymentAmount = $request->grand_total;

            $orderData = [
                'user_id' => auth()->user()->id,
                'order_number' => $orderNumber,
                'order_date' => now(),
                'delivery_date' => $request->delivery_date,
                'delivery_phone' => $request->delivery_phone,
                'order_note' => $request->order_note,
                'order_type' => $orderType,
                'payment_status' => 'UNPAID',
                'order_status' => 'PENDING',
                'grand_total' => $request->grand_total,
            ];

            if ($orderType === 'DELIVERY') {
                $deliveryArea = DeliveryArea::findOrFail($request->delivery_area_id);
                $orderData['delivery_area_id'] = $request->delivery_area_id;
                $orderData['delivery_address'] = $request->delivery_address;

                $customerDetail['shippingAddress'] = [
                    'firstName' => 'Delivery to ' . $deliveryArea->delivery_area_name,
                    'address' => $request->delivery_address,
                ];
            } elseif ($orderType === 'PICKUP') {
                $store = Store::findOrFail($request->store_id);
                $orderData['store_id'] = $request->store_id;

                $customerDetail['shippingAddress'] = [
                    'firstName' => 'Pickup at ' . $store->store_name,
                    'address' => $store->store_address,
                ];
            }

            $order = Order::create($orderData);

            $itemDetails = [];
            $carts = Cart::with('product', 'productVariant')->where('user_id', auth()->user()->id)->get();

            foreach ($carts as $cart) {
                $order->orderDetails()->create([
                    'order_id' => $order->order_id,
                    'product_id' => $cart->product_id,
                    'product_variant_id' => $cart->product_variant_id,
                    'product_quantity' => $cart->product_quantity,
                    'product_price' => $cart->total_price,
                ]);

                $productVariant = ProductVariant::findOrFail($cart->product_variant_id);
                $itemDetails[] = [
                    'name' => $cart->product->product_name . ' - ' . $productVariant->product_variant_name,
                    'price' => $productVariant->product_variant_price,
                    'quantity' => $cart->product_quantity,
                ];
            }

            if ($orderType === 'DELIVERY') {
                $itemDetails[] = [
                    'name' => 'Shipping Cost',
                    'price' => $request->delivery_cost,
                    'quantity' => 1,
                ];
            }

            Cart::where('user_id', auth()->user()->id)->delete();

            $productDetails = "Pembayaran untuk Order: " . $orderNumber;
            $callbackUrl = config('app.url') . '/callback';
            $returnUrl = config('app.url') . '/account/orders/' . $orderNumber;
            $expiryPeriod = 1440;

            $payload = [
                'paymentAmount' => $paymentAmount,
                'merchantOrderId' => $orderNumber,
                'productDetails' => $productDetails,
                'customerVaName' => auth()->user()->user_name,
                'itemDetails' => $itemDetails,
                'customerDetail' => $customerDetail,
                'callbackUrl' => $callbackUrl,
                'returnUrl' => $returnUrl,
                'expiryPeriod' => $expiryPeriod,
            ];

            try {
                $responseDuitkuPop = \Duitku\Pop::createInvoice($payload, $duitkuConfig);
                $getReference = json_decode($responseDuitkuPop, true);

                $order->reference = $getReference['reference'];
                $order->save();

                $this->response['invoice'] = $order->order_number;
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        });

        return redirect()->route('account.orders_history.show', $this->response);
    }
}

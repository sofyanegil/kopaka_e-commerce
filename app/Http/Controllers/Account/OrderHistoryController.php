<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderHistoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return inertia('Account/OrderHistory/Index', [
            'orders' => $orders,
        ]);
    }

    public function show($order_number)
    {
        $user = Auth::user();

        $order = $user->orders()->with([
            'orderDetails.product',
            'orderDetails.productVariant',
            'orderDetails.product.productImages',
            'store',
            'deliveryArea',
        ])
            ->where('order_number', $order_number)
            ->firstOrFail();

        $transformedOrder = collect([
            'order' => $order->only(['order_number', 'order_date', 'delivery_date', 'order_note', 'order_type', 'delivery_address', 'delivery_phone', 'payment_status', 'order_status', 'grand_total', 'reference']),
            'orderDetails' => $order->orderDetails,
            'user' => $order->user->user_name,
        ]);

        $deliveryMethod = $order->order_type;
        if ($deliveryMethod === 'PICKUP') {
            $transformedOrder['store'] = $order->store;
        } elseif ($deliveryMethod === 'DELIVERY') {
            $transformedOrder['deliveryArea'] = $order->deliveryArea;
        }

        return inertia('Account/OrderHistory/Show', [
            'data' => $transformedOrder,
        ]);
    }
}

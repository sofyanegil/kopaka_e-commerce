<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')->when(request()->q, function ($order) {
            $order = $order->where('order_number', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);

        $orders->appends(['q' => request()->q]);

        return inertia('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show($order_number)
    {
        $order = Order::with([
            'orderDetails.product',
            'orderDetails.productVariant',
            'orderDetails.product.productImages',
            'store',
            'deliveryArea',
        ])->where('order_number', $order_number)->firstOrFail();

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

        return inertia('Admin/Orders/Show', [
            'data' => $transformedOrder,
        ]);
    }

    public function edit(
        $order_number
    ) {
        $order = Order::with([
            'orderDetails.product',
            'orderDetails.productVariant',
            'orderDetails.product.productImages',
            'store',
            'deliveryArea',
        ])->where('order_number', $order_number)->firstOrFail();

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

        return inertia('Admin/Orders/Edit', [
            'data' => $transformedOrder,
        ]);
    }

    public function update(Request $request, $order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        $this->validate($request, [
            'delivery_date' => 'required|date',
            'order_status' => 'required|string',
        ]);

        $order->update([
            'delivery_date' => $request->delivery_date,
            'order_status' => $request->order_status,
        ]);

        return redirect()->route('admin.orders.index');
    }
}

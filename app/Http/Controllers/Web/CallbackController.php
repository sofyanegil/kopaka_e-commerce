<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class CallbackController extends Controller
{
    public function __invoke(Request $request)
    {
        $duitkuConfig = new \Duitku\Config(config('duitku.merchant_key'), config('duitku.merchant_code'));
        // true for sandbox mode, false for production mode
        $duitkuConfig->setSandboxMode(config('duitku.sandbox_mode'));
        // set sanitizer (default : true)
        $duitkuConfig->setSanitizedMode(true);
        // set log parameter (default : true)
        $duitkuConfig->setDuitkuLogs(false);

        try {
            $callback = \Duitku\Api::callback($duitkuConfig);

            header('Content-Type: application/json');
            $notif = json_decode($callback);

            // Get transaction
            $order = Order::where('order_number', $notif->merchantOrderId)->first();

            if ($notif->resultCode == "00") {
                // Action Success
                $order->payment_status = 'PAID';
                if ($order->order_status == 'PENDING') {
                    $order->order_status = 'PROCESS';
                }
            } else if ($notif->resultCode == "01") {
                // Action Failed
                $order->payment_status = 'UNPAID';
            } else if ($notif->resultCode == "02") {
                // Action Failed
                $order->payment_status = 'CANCELLED';
                $order->order_status = 'CANCELED';
            }

            $order->save();
        } catch (Exception $e) {
            http_response_code(400);
            echo $e->getMessage();
        }
    }
}

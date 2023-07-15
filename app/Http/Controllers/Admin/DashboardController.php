<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $pending     = Order::where('order_status', 'PENDING')->count();
        $process       = Order::where('order_status', 'PROCESS')->count();
        $delivered    = Order::where('order_status', 'DELIVERED')->count();
        $cancelled  = Order::where('order_status', 'CANCELED')->count();

        $year   = date('Y');

        $orders = DB::table('orders')
            ->addSelect(DB::raw('SUM(grand_total) as grand_total'))
            ->addSelect(DB::raw('MONTH(order_date) as month'))
            ->addSelect(DB::raw('MONTHNAME(order_date) as month_name'))
            ->addSelect(DB::raw('YEAR(order_date) as year'))
            ->whereYear('order_date', '=', $year)
            ->where('order_status', 'DELIVERED')
            ->groupBy('month')
            ->orderByRaw('month ASC')
            ->get();

        $month_name     = [];
        $grand_total    = [];

        if (count($orders)) {
            foreach ($orders as $result) {
                array_push($month_name, $result->month_name);
                array_push($grand_total, (int) $result->grand_total);
            }
        }

        return inertia('Admin/Dashboard/Index', [
            'count' => [
                'pending'    => $pending,
                'process'      => $process,
                'delivered'   => $delivered,
                'cancelled' => $cancelled
            ],
            'chart' => [
                'month_name'    => $month_name,
                'grand_total'   => $grand_total
            ]
        ]);
    }
}

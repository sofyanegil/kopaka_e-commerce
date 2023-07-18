<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::with('product.productImages', 'productVariant')
            ->where('user_id', auth()->user()->id)
            ->latest()
            ->get();


        return Inertia::render('Web/Carts/Index', [
            'carts' => $carts,

        ]);
    }

    public function store(Request $request)
    {
        $productVariant = ProductVariant::findOrFail($request->product_variant_id);
        $cart = Cart::where('product_id', $request->product_id)
            ->where('product_variant_id', $request->product_variant_id)
            ->where('user_id', auth()->user()->id)
            ->first();

        if ($cart) {
            $cart->product_quantity += $request->product_quantity;
            $cart->total_price += ($request->product_quantity * $productVariant->product_variant_price);
            $cart->save();
        } else {
            $totalPrice = $productVariant->product_variant_price * $request->product_quantity;
            $cart = Cart::create([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'product_variant_id' => $request->product_variant_id,
                'product_quantity' => $request->product_quantity,
                'total_price' => $totalPrice,
            ]);
        }

        return redirect()->back();
    }

    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        if ($cart->user_id != auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $cart->delete();

        return redirect()->back();
    }
}

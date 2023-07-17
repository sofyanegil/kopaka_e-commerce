<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('productImages', 'productVariants')->latest()->paginate(8);

        return inertia('Web/Products/Index', [
            'products' => $products,
        ]);
    }


    public function show($product_slug)
    {
        $product = Product::where('product_slug', $product_slug)->with('productImages', 'productVariants')->firstOrFail();

        return inertia('Web/Products/Show', [
            'product' => $product
        ]);
    }
}

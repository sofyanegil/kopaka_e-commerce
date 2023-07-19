<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */

    public function __invoke(Request $request)
    {
        if ($request->q != "") {
            //get products by keywords
            $products = Product::where('product_name', 'like', '%' . $request->q . '%')->get();
        } else {
            $products = [];
        }

        //return response
        return response()->json([
            'products' => $products,
        ]);
    }
}

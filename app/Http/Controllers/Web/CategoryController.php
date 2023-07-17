<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Web/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function show(Category $category)
    {
        $category = Category::where('category_slug', $category->category_slug)->with('products.productImages', 'products.productVariants')->firstOrFail();

        return Inertia::render('Web/Categories/Show', [
            'category' => $category,
        ]);
    }
}

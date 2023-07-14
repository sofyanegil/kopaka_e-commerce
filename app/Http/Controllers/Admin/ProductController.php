<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::when(
            request()->q,
            function ($query) {
                $query->where('product_name', 'like', '%' . request()->q . '%');
            }
        )->with('category', 'productVariants', 'productImages')->latest()->paginate(10);

        $products->appends(['q' => request()->q]);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);

        $product->setRelation('productImages', $product->productImages()->paginate(5));

        return inertia('Admin/Products/Show', [
            'product'   => $product,
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $this->validate(
            $request,
            [
                'category_id' => 'required',
                'product_name' => 'required|unique:products',
                'product_description' => 'required',
                'product_weight' => 'required',
                'product_variants' => 'required|array|min:2',
                'product_variants.*.product_variant_name' => 'required',
                'product_variants.*.product_variant_price' => 'required',
            ]
        );

        $product = Product::create(
            [
                'category_id' => $request->category_id,
                'product_name' => $request->product_name,
                'product_slug' => Str::slug($request->product_name, '-'),
                'product_description' => $request->product_description,
                'product_weight' => $request->product_weight,
            ]
        );

        if ($request->product_variants > 0) {
            foreach ($request->product_variants as $data) {
                $product->productVariants()->create([
                    'product_variant_name' => $data['product_variant_name'],
                    'product_variant_price' => (int) $data['product_variant_price']
                ]);
            }
        }

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();

        $product->load('productVariants');

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $this->validate(
            $request,
            [
                'category_id' => 'required',
                'product_name' => 'required|unique:products,product_name,' . $product->product_id . ',product_id',
                'product_description' => 'required',
                'product_weight' => 'required',
                'product_variants' => 'required|array|min:2',
                'product_variants.*.product_variant_name' => 'required',
                'product_variants.*.product_variant_price' => 'required',
            ]
        );

        $product->update([
            'category_id' => $request->category_id,
            'product_name' => $request->product_name,
            'product_slug' => Str::slug($request->product_name, '-'),
            'product_description' => $request->product_description,
            'product_weight' => $request->product_weight,
        ]);

        if ($request->product_variants > 0) {
            $product_variant_id = Arr::pluck($request->product_variants, 'product_variant_id');
            $product->productVariants()->whereNotIn('product_variant_id', $product_variant_id)->delete();

            foreach ($request->product_variants as $data) {

                $productVariantName = $product->productVariants()->where('product_id', $product->product_id)->where('product_variant_name', $data['product_variant_name'])->first();

                if ($productVariantName) {
                    $productVariantName->update([
                        'product_variant_name' => $data['product_variant_name'],
                        'product_variant_price' => (int) $data['product_variant_price'],
                    ]);
                } else {
                    $product->productVariants()->create([
                        'product_variant_name' => $data['product_variant_name'],
                        'product_variant_price' => (int) $data['product_variant_price'],
                    ]);
                }
            }
        }

        return redirect()->route('admin.products.index');
    }


    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return redirect()->route('admin.products.index');
    }

    public function storeImageProduct(Request $request)
    {
        $this->validate($request, [
            'product_image_url'      => 'required|mimes:png,jpg|max:2048',
        ]);

        $product = Product::findOrFail($request->product_id);
        $product_image_url = $request->file('product_image_url');
        $product_image_url->storeAs('public/products', $product_image_url->hashName());
        $product->productImages()->create([
            'product_image_url'     => $product_image_url->hashName(),
        ]);

        return redirect()->back();
    }

    public function destroyImage($id)
    {
        $product_image = ProductImage::findOrFail($id);

        Storage::disk('local')->delete('public/products/' . basename($product_image->product_image_url));

        $product_image->delete();

        return redirect()->back();
    }
}

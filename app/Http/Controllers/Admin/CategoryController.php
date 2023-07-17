<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::when(request()->q, function ($categories) {
            $categories = $categories->where('category_name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);

        $categories->appends(['q' => request()->q]);
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'category_name' => 'required|unique:categories',
            'category_image_url' => 'required|mimes:jpeg,png,jpg|max:2048',
        ], [
            [
                'category_image_url.required' => 'Image is required',
                'category_image_url.mimes' => 'Image must be a file of type: jpg, jpeg or png.',
                'category_image_url.max' => 'Image size must not be larger than 2MB.'
            ]
        ]);

        $category_image_url = $request->file('category_image_url');
        $category_image_url->storeAs('public/categories', $category_image_url->hashName());

        Category::create([
            'category_name' => $request->category_name,
            'category_image_url' => $category_image_url->hashName(),
            'category_slug' => Str::slug($request->category_name, '-')
        ]);

        return redirect()->route('admin.categories.index');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $this->validate($request, [
            'category_name' => 'required|unique:categories,category_name,' . $category->category_id . ',category_id',
            'category_image_url' => 'nullable|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('category_image_url')) {
            Storage::disk('local')->delete('public/categories/' . basename($category->category_image_url));

            $category_image_url = $request->file('category_image_url');
            $category_image_url->storeAs('public/categories', $category_image_url->hashName());

            $category->update([
                'category_name' => $request->category_name,
                'category_image_url' => $category_image_url->hashName(),
                'category_slug' => Str::slug($request->category_name, '-')
            ]);
        } else {
            $category->update([
                'category_name' => $request->category_name,
                'category_slug' => Str::slug($request->category_name, '-')
            ]);
        }

        return redirect()->route('admin.categories.index');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        Storage::disk('local')->delete('public/categories/' . basename($category->category_image_url));

        $category->delete();

        return redirect()->route('admin.categories.index');
    }
}

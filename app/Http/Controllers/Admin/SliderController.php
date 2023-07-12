<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::latest()->paginate(10);
        return Inertia::render('Admin/Sliders/Index', [
            'sliders' => $sliders
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'slider_image_url' => 'required|mimes:jpeg,png,jpg|max:2048',
            'slider_link' => 'required',
        ], [
            'slider_image_url.required' => 'Image is required',
            'slider_image_url.mimes' => 'Image must be a file of type: jpg, jpeg or png.',
            'slker_image_url.max' => 'Image size must not be larger than 2MB.'
        ]);

        $slider_image_url = $request->file('slider_image_url');
        $slider_image_url->storeAs('public/sliders', $slider_image_url->hashName());

        Slider::create([
            'slider_image_url' => $slider_image_url->hashName(),
            'slider_link' => $request->slider_link
        ]);

        return redirect()->route('admin.sliders.index');
    }

    public function destroy($id)
    {
        $slider = Slider::findOrFail($id);

        Storage::disk('local')->delete('public/sliders/' . basename($slider->slider_image_url));

        $slider->delete();

        return redirect()->route('admin.sliders.index');
    }
}

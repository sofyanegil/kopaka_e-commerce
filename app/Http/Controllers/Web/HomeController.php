<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Slider;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $sliders = Slider::latest()->take(5)->get();
        $categories = Category::take(4)->get();
        return inertia('Web/Home/Index', [
            'sliders'       => $sliders,
            'categories'    => $categories,
        ]);
    }
}

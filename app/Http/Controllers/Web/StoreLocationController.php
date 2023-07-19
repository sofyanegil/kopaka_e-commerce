<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreLocationController extends Controller
{
    public function index()
    {
        $stores = \App\Models\Store::all();
        return Inertia::render('Web/Stores/Index', [
            'stores' => $stores
        ]);
    }
}

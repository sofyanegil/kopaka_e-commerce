<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DeliveryArea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeliveryAreaController extends Controller
{
    public function index()
    {
        $deliveryAreas = DeliveryArea::when(request()->q, function ($deliveryArea) {
            $deliveryArea = $deliveryArea->where('delivery_area_name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);

        $deliveryAreas->appends(['q' => request()->q]);
        return Inertia::render('Admin/DeliveryAreas/Index', [
            'deliveryAreas' => $deliveryAreas
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'delivery_area_name' => 'required|unique:delivery_areas,delivery_area_name',
            'delivery_area_price' => 'required',
        ]);

        DeliveryArea::create([
            'delivery_area_name' => $request->delivery_area_name,
            'delivery_area_price' => $request->delivery_area_price,
        ]);

        return redirect()->route('admin.delivery_areas.index');
    }

    public function edit(DeliveryArea $deliveryArea)
    {
        return Inertia::render('Admin/DeliveryAreas/Edit', [
            'deliveryArea' => $deliveryArea
        ]);
    }

    public function update(Request $request, DeliveryArea $deliveryArea)
    {
        $this->validate($request, [
            'delivery_area_name' => 'required|unique:delivery_areas,delivery_area_name,' . $deliveryArea->delivery_area_id . ',delivery_area_id',
            'delivery_area_price' => 'required',
        ]);

        $deliveryArea->update([
            'delivery_area_name' => $request->delivery_area_name,
            'delivery_area_price' => $request->delivery_area_price,
        ]);

        return redirect()->route('admin.delivery_areas.index');
    }

    public function destroy(DeliveryArea $deliveryArea)
    {
        $deliveryArea->delete();

        return redirect()->route('admin.delivery_areas.index');
    }
}

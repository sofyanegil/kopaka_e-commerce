<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Stores/Index', [
            'stores' => Store::latest()->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'store_name' => 'required|unique:stores,store_name',
            'store_address' => 'required',
            'store_phone' => 'required',
            'store_open' => 'required',
            'store_close' => 'required',
        ]);

        Store::create([
            'store_name' => $request->store_name,
            'store_address' => $request->store_address,
            'store_phone' => $request->store_phone,
            'store_open' => $request->store_open,
            'store_close' => $request->store_close,
        ]);

        return redirect()->route('admin.stores.index');
    }

    public function edit(Store $store)
    {
        return Inertia::render('Admin/Stores/Edit', [
            'store' => $store
        ]);
    }

    public function update(Request $request, Store $store)
    {
        $this->validate($request, [
            'store_name' => 'required|unique:stores,store_name,' . $store->store_id . ',store_id',
            'store_address' => 'required',
            'store_phone' => 'required',
            'store_open' => 'required',
            'store_close' => 'required',
        ]);

        $store->update([
            'store_name' => $request->store_name,
            'store_address' => $request->store_address,
            'store_phone' => $request->store_phone,
            'store_open' => $request->store_open,
            'store_close' => $request->store_close,
        ]);

        return redirect()->route('admin.stores.index');
    }

    public function destroy($id)
    {
        $store = Store::findOrFail($id);

        $store->delete();

        return redirect()->route('admin.stores.index');
    }
}

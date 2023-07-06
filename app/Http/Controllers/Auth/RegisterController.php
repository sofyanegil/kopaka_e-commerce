<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_name' => ['required', 'max:255'],
            'user_email' => ['required', 'email', 'max:255', 'unique:users'],
            'user_phone' => ['required', 'unique:users', 'digits_between:11,13', 'numeric'],
            'password' => ['required', 'confirmed', 'min:8', 'alpha_num', 'numeric'],
        ]);

        $user = User::create([
            'user_name' => $request->user_name,
            'user_email' => $request->user_email,
            'password' => Hash::make($request->password),
            'user_phone' => '+62' . substr($request->user_phone, 1),
            'user_dob' => now(),
        ]);

        $role = Role::findByName('customer');

        $user->assignRole($role);

        return redirect()->route('login');
    }
}

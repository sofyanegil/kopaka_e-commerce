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
            'user_name' => ['required', 'max:255', 'min:3'],
            'user_email' => ['required', 'email', 'max:255', 'unique:users'],
            'user_phone' => ['required', 'unique:users', 'digits_between:10,13', 'numeric'],
            'password' => ['required', 'confirmed', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/'],
        ], [
            'password.regex' => 'Password must contain at least one letter and one number',
            'password.confirmed' => 'Password confirmation does not match',
            'password.min' => 'Password must be at least 8 characters',
            ''
        ]);

        $user = User::create([
            'user_name' => $request->user_name,
            'user_email' => $request->user_email,
            'password' => Hash::make($request->password),
            'user_phone' => $request->user_phone,
            'user_dob' => now(),
        ]);

        $role = Role::findByName('customer');

        $user->assignRole($role);

        return redirect()->route('login');
    }
}

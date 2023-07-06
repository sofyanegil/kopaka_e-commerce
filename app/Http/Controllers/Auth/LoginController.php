<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $credentials = $request->only('user_email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->route('account.profile');
        } else {
            return redirect()->back()->withInput()->withErrors([
                'user_email' => 'The provided credentials do not match our records'
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
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
            'password' => ['required', 'min:8'],
        ], [
            'password.regex' => 'Password must contain at least one letter and one number',
            'password.min' => 'Password must be at least 8 characters',
        ]);

        $credentials = $request->only('user_email', 'password');
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->route('account.profile.index');
        } else {
            $user = User::where('user_email', $request->user_email)->first();

            if (!$user) {
                return redirect()->back()->withInput()->withErrors([
                    'user_email' => 'Email does not exist.'
                ]);
            } else {
                return redirect()->back()->withInput()->withErrors([
                    'password' => 'Password is incorrect'
                ]);
            }
        }
    }
}

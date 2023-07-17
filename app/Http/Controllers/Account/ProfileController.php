<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Account/Profile/Index', [
            'user' => $user,
        ]);
    }

    public function edit()
    {
        $user = Auth::user();
        return Inertia::render('Account/Profile/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'user_name' => ['required', 'max:255'],
            'user_email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'user_phone' => ['required', 'digits_between:11,13', 'numeric', Rule::unique('users')->ignore($user->id)],
            'user_dob' => ['required', 'date', 'before_or_equal:today'],
        ]);

        $user->update([
            'user_name' => $request->user_name,
            'user_email' => $request->user_email,
            'user_phone' => $request->user_phone,
            'user_dob' => $request->user_dob,
        ]);

        return redirect()->route('account.profile.index');
    }

    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        $request->validate(
            [
                'password' => ['required', 'confirmed', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/'],
            ],
            [
                'password.regex' => 'Password must contain at least one letter and one number',
                'password.confirmed' => 'Password confirmation does not match',
                'password.min' => 'Password must be at least 8 characters',
            ]
        );

        $user->update([
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('account.profile.index');
    }
}

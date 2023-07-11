<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::when(request()->q, function ($users) {
            $users = $users->where('user_name', 'like', '%' . request()->q . '%');
        })->with('roles')->latest()->paginate(15);

        $users->appends(['q' => request()->q]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function edit($id)
    {
        $user = User::with('roles')->findOrFail($id);

        $roles = Role::all();

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }


    public function update(Request $request, User $user)
    {

        $this->validate($request, [
            'user_name'     => 'required',
            'user_email'    => 'required|unique:users,user_email,' . $user->id,
            'password' => ['nullable', 'confirmed', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/'],
        ], [
            'password.regex' => 'Password must contain at least one letter and one number',
            'password.confirmed' => 'Password confirmation does not match',
            'password.min' => 'Password must be at least 8 characters',
        ]);

        if ($request->password == '') {

            $user->update([
                'user_name'     => $request->user_name,
                'user_email'    => $request->user_email
            ]);
        } else {

            $user->update([
                'user_name'     => $request->user_name,
                'user_email'    => $request->user_email,
                'password' => bcrypt($request->password)
            ]);
        }

        $user->syncRoles($request->roles);

        return redirect()->route('admin.users.index');
    }


    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return redirect()->route('admin.users.index');
    }
}

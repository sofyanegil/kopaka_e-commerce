<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'user_name' => 'Admin',
            'user_email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ]);

        // get all permissions
        $permissions = Permission::all();

        // get role admin
        $role = Role::find(1);

        // assign all permissions to admin role
        $role->syncPermissions($permissions);

        // assign role admin to user admin
        $user->assignRole($role);
    }
}

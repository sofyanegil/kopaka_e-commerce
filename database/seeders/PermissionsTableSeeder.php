<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // permission profile
        Permission::create(['name' => 'profile.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'profile.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'profile.update', 'guard_name' => 'web']);


        // permission order history
        Permission::create(['name' => 'orderHistory.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'orderHistory.show', 'guard_name' => 'web']);

        // permission dashboard
        Permission::create(['name' => 'dashboard.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'dashboard.statistics', 'guard_name' => 'web']);
        Permission::create(['name' => 'dashboard.chart', 'guard_name' => 'web']);

        // permission permissions
        Permission::create(['name' => 'permissions.index', 'guard_name' => 'web']);

        // permission roles
        Permission::create(['name' => 'roles.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'web']);

        // permission users
        Permission::create(['name' => 'users.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'web']);

        // permission categories
        Permission::create(['name' => 'categories.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories.delete', 'guard_name' => 'web']);

        // permission products
        Permission::create(['name' => 'products.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'products.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'products.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'products.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'products.delete', 'guard_name' => 'web']);

        // permission orders
        Permission::create(['name' => 'orders.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'orders.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'orders.edit', 'guard_name' => 'web']);

        // permission stores
        Permission::create(['name' => 'stores.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'stores.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'stores.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'stores.delete', 'guard_name' => 'web']);

        // permission deliveryArea
        Permission::create(['name' => 'deliveryAreas.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'deliveryAreas.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'deliveryAreas.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'deliveryAreas.delete', 'guard_name' => 'web']);

        // permission sliders
        Permission::create(['name' => 'sliders.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'sliders.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'sliders.delete', 'guard_name' => 'web']);
    }
}

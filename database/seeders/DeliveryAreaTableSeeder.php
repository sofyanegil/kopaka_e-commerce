<?php

namespace Database\Seeders;

use App\Models\DeliveryArea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryAreaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DeliveryArea::create(
            [
                'delivery_area_name' => 'Kota Bandung',
                'delivery_area_price' => 10000,
            ]
        );
    }
}

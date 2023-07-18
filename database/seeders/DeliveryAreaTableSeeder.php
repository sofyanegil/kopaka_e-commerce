<?php

namespace Database\Seeders;

use App\Models\DeliveryArea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class DeliveryAreaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        function seedDeliveryAreas($cityId)
        {
            $response = Http::get("https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota={$cityId}");
            if ($response->successful()) {
                $data = $response->json();
                foreach ($data['kecamatan'] as $area) {
                    DeliveryArea::create([
                        'delivery_area_name' => $area['nama'],
                        'delivery_area_price' => 10000
                    ]);
                }
            }
        }

        // Kota Bandung
        seedDeliveryAreas(3273);
        // //Kabupaten Bandung
        // seedDeliveryAreas(3204);
        // // Cimahi
        // seedDeliveryAreas(3277);
    }
}

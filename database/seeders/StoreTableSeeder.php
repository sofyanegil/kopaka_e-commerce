<?php

namespace Database\Seeders;

use App\Models\Store;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StoreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Store::create([
            'store_name' => 'Kopaka Kopo Bihbul',
            'store_address' => 'Jl. Bihbul Raya No. 101, Sayati, Kec. Margahayu, Kabupaten Bandung, Jawa Barat 40228',
            'store_phone' => '(022) 5400506',
            'store_open' => '09:00',
            'store_close' => '17:00',
        ]);
        Store::create([
            'store_name' => 'Kopaka Maulana Yusuf',
            'store_address' => 'Jalan Maulana Yusuf No.17, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115',
            'store_phone' => '(022) 4262536',
            'store_open' => '10:00',
            'store_close' => '17:00',
        ]);
        Store::create([
            'store_name' => 'Kopaka 23 Paskal',
            'store_address' => 'Jalan Pasirkaliki (23 Paskal) Blok D-15 , Kebon Jeruk, Andir, Kb. Jeruk, Bandung, Kota Bandung, Jawa Barat 40161',
            'store_phone' => '(022) 86061009',
            'store_open' => '10:00',
            'store_close' => '16:00',
        ]);
    }
}

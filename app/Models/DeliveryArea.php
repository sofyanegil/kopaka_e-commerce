<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class DeliveryArea extends Model
{
    use HasFactory;

    protected $primaryKey = 'delivery_area_id';
    protected $fillable = [
        'delivery_area_name',
        'delivery_area_price',
    ];
}

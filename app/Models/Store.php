<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $primaryKey = 'store_id';
    protected $fillable = [
        'store_name',
        'store_address',
        'store_phone',
        'store_open',
        'store_close',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'store_id', 'store_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_id';
    protected $fillable = [
        'user_id',
        'delivery_area_id',
        'store_id',
        'order_number',
        'order_date',
        'delivery_date',
        'delivery_phone',
        'order_note',
        'order_type',
        'delivery_address',
        'payment_status',
        'order_status',
        'grand_total',
        'reference'
    ];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'order_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function deliveryArea()
    {
        return $this->belongsTo(DeliveryArea::class, 'delivery_area_id', 'delivery_area_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id', 'store_id');
    }
}

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
        return $this->hasMany(OrderDetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function deliveryArea()
    {
        return $this->belongsTo(DeliveryArea::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function orderDate(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => \Carbon\Carbon::parse($value)->translatedFormat('1, d F Y'),
        );
    }

    public function deliveryDate(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => \Carbon\Carbon::parse($value)->translatedFormat('1, d F Y'),
        );
    }
}

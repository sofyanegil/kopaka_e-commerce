<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'product_image_id';
    protected $fillable = [
        'product_id',
        'product_image_url',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    // accessor
    public function productImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn ($productImageUrl) => asset('/storage/products/' . $productImageUrl),
        );
    }
}

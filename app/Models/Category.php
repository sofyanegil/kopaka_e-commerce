<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id';
    protected $fillable = [
        'category_name',
        'category_slug',
        'category_description',
        'category_image_url',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // accessor
    public function categoryImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn ($category_image_url) => asset('/storage/categories/' . $category_image_url),
        );
    }
}

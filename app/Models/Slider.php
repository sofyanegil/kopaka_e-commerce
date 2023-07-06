<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    use HasFactory;
    protected $fillable = [
        'slider_image_url',
        'slider_link'
    ];

    // accessor
    public function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/sliders/' . $image),
        );
    }
}

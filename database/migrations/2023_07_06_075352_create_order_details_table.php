<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->uuid('order_detail_id')->primary();
            $table->foreignUuid('order_id')->references('order_id')->on('orders')->cascadeOnDelete();
            $table->foreignUuid('product_id')->references('product_id')->on('products')->cascadeOnDelete();
            $table->foreignUuid('product_variant_id')->references('product_variant_id')->on('product_variants')->cascadeOnDelete();
            $table->integer('product_quantity');
            $table->bigInteger('product_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};

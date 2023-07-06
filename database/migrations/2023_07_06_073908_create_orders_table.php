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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->foreignId('user_id')->references('user_id')->on('users')->cascadeOnDelete();
            $table->foreignId('delivery_area_id')->nullable()->references('delivery_area_id')->on('delivery_areas')->cascadeOnDelete();
            $table->foreignId('store_id')->nullable()->references('store_id')->on('stores')->cascadeOnDelete();
            $table->string('order_number');
            $table->string('order_date');
            $table->string('delivery_date');
            $table->string('delivery_phone');
            $table->string('order_note')->nullable();
            $table->enum('order_type', array('DELIVERY', 'PICKUP'))->default('DELIVERY');
            $table->string('delivery_address')->nullable();
            $table->enum('payment_status', array('UNPAID', 'PAID', 'EXPIRED', 'CANCELLED'))->default('UNPAID');
            $table->enum('order_status', array('PENDING', 'PROCESS', 'DELIVERED', 'CANCELLED'))->default('PENDING');
            $table->bigInteger('grand_total');
            $table->string('reference')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

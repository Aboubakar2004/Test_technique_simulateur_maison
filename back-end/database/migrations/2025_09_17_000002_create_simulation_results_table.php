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
        if (!Schema::hasTable('simulation_results')) {
            Schema::create('simulation_results', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id');
                $table->decimal('borrowing_capacity', 15, 2)->nullable();
                $table->decimal('debt_ratio', 5, 2)->nullable();
                $table->decimal('total_project_cost', 15, 2)->nullable();
                $table->decimal('total_credit_cost', 15, 2)->nullable();
                $table->decimal('estimated_monthly_payment', 10, 2)->nullable();
                $table->timestamps();

                // Clé étrangère vers la table app_users
                $table->foreign('user_id')->references('id')->on('app_users')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simulation_results');
    }
};

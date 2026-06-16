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
        Schema::create('pays', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100);
            $table->string('code_iso', 5)->unique()->nullable();
            $table->string('indicatif_tel', 10);
            $table->foreignId('devise_id')->nullable()->constrained('devises')->cascadeOnUpdate();
            $table->boolean('est_actif')->default(true);
            
            // Audit
            $table->unsignedBigInteger('cree_par');
            $table->unsignedBigInteger('modifie_par');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pays');
    }
};

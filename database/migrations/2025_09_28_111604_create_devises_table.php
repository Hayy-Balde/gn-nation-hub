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
        Schema::create('devises', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100); // Ex : Franc guinéen
            $table->string('code', 10)->unique(); // Ex : GNF, USD, EUR
            $table->string('symbole', 10)->nullable(); // Ex : FG, $, €
            $table->integer('decimales')->default(2); // Nombre de décimales utilisées

            $table->boolean('est_actif')->default(true);

            // Audit
            $table->unsignedBigInteger('cree_par')->nullable();
            $table->unsignedBigInteger('modifie_par')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devises');
    }
};

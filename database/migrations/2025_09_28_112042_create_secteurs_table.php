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
        Schema::create('secteurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quartier_id')->constrained('quartiers')->cascadeOnUpdate();
            $table->string('nom', 100);
            $table->string('code', 10)->nullable();
            $table->boolean('est_actif')->default(true);

            // Audit
            $table->unsignedBigInteger('cree_par');
            $table->unsignedBigInteger('modifie_par');
            $table->timestamps();

            $table->unique(['quartier_id', 'nom'], 'uq_secteur_nom_par_quartier');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('secteurs');
    }
};

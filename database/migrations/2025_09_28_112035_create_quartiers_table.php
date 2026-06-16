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
        Schema::create('quartiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commune_id')->constrained('communes')->cascadeOnUpdate();
            $table->string('nom', 100);
            $table->string('code', 10)->nullable();
            $table->boolean('est_actif')->default(true);

            // Audit
            $table->unsignedBigInteger('cree_par');
            $table->unsignedBigInteger('modifie_par');
            $table->timestamps();

            $table->unique(['commune_id', 'nom'], 'uq_quartier_nom_par_commune');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quartiers');
    }
};

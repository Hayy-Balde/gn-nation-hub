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
        Schema::create('prefectures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('region_id')->constrained('regions')->cascadeOnUpdate();
            $table->string('nom', 100);
            $table->string('code', 10)->nullable();
            $table->boolean('est_actif')->default(true);

            // Audit
            $table->unsignedBigInteger('cree_par');
            $table->unsignedBigInteger('modifie_par');
            $table->timestamps();

            $table->unique(['region_id', 'nom'], 'uq_prefecture_nom_par_region');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prefectures');
    }
};

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
        Schema::create('communes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prefecture_id')->constrained('prefectures')->cascadeOnUpdate();
            $table->string('nom', 100);
            $table->string('code', 10)->nullable();
            $table->string('code_postal', 15)->nullable();
            $table->boolean('est_actif')->default(true);

            // Audit
            $table->unsignedBigInteger('cree_par');
            $table->unsignedBigInteger('modifie_par');
            $table->timestamps();

            $table->unique(['prefecture_id', 'nom'], 'uq_commune_nom_par_prefecture');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('communes');
    }
};

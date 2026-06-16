<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quartier extends Model
{
    protected $table = 'quartiers';
    public $timestamps = false;

    protected $fillable = [
        'commune_id',
        'nom',
        'code',
        'est_actif',
        'cree_le',
        'cree_par',
        'modifie_le',
        'modifie_par'
    ];

    // Relations
    public function commune()
    {
        return $this->belongsTo(Commune::class, 'commune_id');
    }

    public function secteurs()
    {
        return $this->hasMany(Secteur::class, 'quartier_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    protected $table = 'communes';
    public $timestamps = false;

    protected $fillable = [
        'prefecture_id',
        'nom',
        'code',
        'code_postal',
        'est_actif',
        'cree_le',
        'cree_par',
        'modifie_le',
        'modifie_par'
    ];

    // Relations
    public function prefecture()
    {
        return $this->belongsTo(Prefecture::class, 'prefecture_id');
    }

    public function quartiers()
    {
        return $this->hasMany(Quartier::class, 'commune_id');
    }
}

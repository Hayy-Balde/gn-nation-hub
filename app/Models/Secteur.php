<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Secteur extends Model
{
    protected $table = 'secteurs';
    public $timestamps = false;

    protected $fillable = [
        'quartier_id',
        'nom',
        'code',
        'est_actif',
        'cree_le',
        'cree_par',
        'modifie_le',
        'modifie_par'
    ];

    // Relations
    public function quartier()
    {
        return $this->belongsTo(Quartier::class, 'quartier_id');
    }
}

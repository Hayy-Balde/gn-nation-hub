<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $table = 'regions';
    public $timestamps = false;

    protected $fillable = [
        'pays_id',
        'nom',
        'code',
        'est_actif',
        'cree_le',
        'cree_par',
        'modifie_le',
        'modifie_par'
    ];

    // Relations
    public function pays()
    {
        return $this->belongsTo(Pays::class, 'pays_id');
    }

    public function prefectures()
    {
        return $this->hasMany(Prefecture::class, 'region_id');
    }
}

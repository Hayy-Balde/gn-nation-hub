<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prefecture extends Model
{
    protected $table = 'prefectures';
    public $timestamps = false;

    protected $fillable = [
        'region_id',
        'nom',
        'code',
        'est_actif',
        'cree_le',
        'cree_par',
        'modifie_le',
        'modifie_par'
    ];

    // Relations
    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function communes()
    {
        return $this->hasMany(Commune::class, 'prefecture_id');
    }
}

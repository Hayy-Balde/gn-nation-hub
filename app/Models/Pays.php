<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pays extends Model
{
    protected $table = 'pays';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'code_iso',
        'indicatif_tel',
        'devise_id',
        'est_actif',
        'cree_le',
        'cree_par',
        'modifie_le',
        'modifie_par'
    ];

    // Relations
    public function devise()
    {
        return $this->belongsTo(Devise::class, 'devise_id');
    }

    public function regions()
    {
        return $this->hasMany(Region::class, 'pays_id');
    }
}

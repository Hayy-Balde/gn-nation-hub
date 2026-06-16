<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devise extends Model
{
    protected $table = 'devises';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'code_iso',
        'symbole',
        'est_actif',
        'cree_le',
        'cree_par',
        'modifie_le',
        'modifie_par',
    ];

    // Relations
    public function pays()
    {
        return $this->hasMany(Pays::class, 'devise_id');
    }
}

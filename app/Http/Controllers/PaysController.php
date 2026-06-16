<?php

namespace App\Http\Controllers;

use App\Models\Pays;
use App\Models\Devise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaysController extends Controller
{
    /**
     * Affiche la liste des pays.
     */
    public function index()
    {
        $pays = Pays::with('devises')->orderBy('nom')->get();

        return Inertia::render('Pays/Index', [
            'pays' => $pays
        ]);
    }

    /**
     * Affiche le formulaire de création.
     */
    public function create()
    {
        $devises = Devise::where('est_actif', true)->get();

        return Inertia::render('Pays/Create', [
            'devises' => $devises
        ]);
    }

    /**
     * Enregistre un nouveau pays.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:pays,nom',
            'code_iso' => 'nullable|string|max:5|unique:pays,code_iso',
            'indicatif_tel' => 'required|string|max:10',
            'devise_id' => 'nullable|exists:devises,id',
            'est_actif' => 'boolean',
        ]);

        $pays = Pays::create([
            ...$validated,
            'cree_par' => auth()->id() ?? 1,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('pays.index')
            ->with('success', 'Pays créé avec succès');
    }

    /**
     * Affiche un pays spécifique.
     */
    public function show(Pays $pays)
    {
        $pays->load('devises');

        return Inertia::render('Pays/Show', [
            'pays' => $pays
        ]);
    }

    /**
     * Affiche le formulaire d'édition.
     */
    public function edit(Pays $pays)
    {
        $devises = Devise::where('est_actif', true)->get();

        return Inertia::render('Pays/Edit', [
            'pays' => $pays,
            'devises' => $devises
        ]);
    }

    /**
     * Met à jour un pays existant.
     */
    public function update(Request $request, Pays $pays)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:pays,nom,' . $pays->id,
            'code_iso' => 'nullable|string|max:5|unique:pays,code_iso,' . $pays->id,
            'indicatif_tel' => 'sometimes|string|max:10',
            'devise_id' => 'nullable|exists:devises,id',
            'est_actif' => 'boolean',
        ]);

        $pays->update([
            ...$validated,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('pays.index')
            ->with('success', 'Pays mis à jour avec succès');
    }

    /**
     * Supprime un pays.
     */
    public function destroy(Pays $pays)
    {
        $pays->delete();

        return redirect()->route('pays.index')
            ->with('success', 'Pays supprimé avec succès');
    }
}

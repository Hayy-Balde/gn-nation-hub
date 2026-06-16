<?php

namespace App\Http\Controllers;

use App\Models\Devise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeviseController extends Controller
{
    /**
     * Affiche la liste des devises.
     */
    public function index()
    {
        $devises = Devise::orderBy('nom')->get();

        return Inertia::render('Devises/Index', [
            'devises' => $devises
        ]);
    }

    /**
     * Formulaire de création d'une nouvelle devise.
     */
    public function create()
    {
        return Inertia::render('Devises/Create');
    }

    /**
     * Enregistre une nouvelle devise.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:devises,nom',
            'code_iso' => 'required|string|max:5|unique:devises,code_iso',
            'symbole' => 'nullable|string|max:5',
            'est_actif' => 'boolean',
        ]);

        $devise = Devise::create([
            ...$validated,
            'cree_par' => auth()->id() ?? 1,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('devises.index')
            ->with('success', 'Devise créée avec succès');
    }

    /**
     * Affiche une devise spécifique.
     */
    public function show(Devise $devise)
    {
        return Inertia::render('Devises/Show', [
            'devise' => $devise
        ]);
    }

    /**
     * Formulaire d'édition d'une devise.
     */
    public function edit(Devise $devise)
    {
        return Inertia::render('Devises/Edit', [
            'devise' => $devise
        ]);
    }

    /**
     * Met à jour une devise existante.
     */
    public function update(Request $request, Devise $devise)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:devises,nom,' . $devise->id,
            'code_iso' => 'sometimes|string|max:5|unique:devises,code_iso,' . $devise->id,
            'symbole' => 'nullable|string|max:5',
            'est_actif' => 'boolean',
        ]);

        $devise->update([
            ...$validated,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('devises.index')
            ->with('success', 'Devise mise à jour avec succès');
    }

    /**
     * Supprime une devise.
     */
    public function destroy(Devise $devise)
    {
        $devise->delete();

        return redirect()->route('devises.index')
            ->with('success', 'Devise supprimée avec succès');
    }
}

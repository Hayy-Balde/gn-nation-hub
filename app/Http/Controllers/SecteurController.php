<?php

namespace App\Http\Controllers;

use App\Models\Secteur;
use App\Models\Quartier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecteurController extends Controller
{
    /**
     * Liste tous les secteurs.
     */
    public function index()
    {
        $secteurs = Secteur::with('quartiers')->orderBy('nom')->get();

        return Inertia::render('Home/Secteurs/Index', [
            'secteurs' => $secteurs
        ]);
    }

    /**
     * Formulaire de création d'un secteur.
     */
    public function create()
    {
        $quartiers = Quartier::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Secteurs/Create', [
            'quartiers' => $quartiers
        ]);
    }

    /**
     * Enregistre un nouveau secteur.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:secteurs,nom',
            'code' => 'nullable|string|max:5',
            'quartier_id' => 'required|exists:quartiers,id',
            'est_actif' => 'boolean',
        ]);

        $secteur = Secteur::create([
            ...$validated,
            'cree_par' => auth()->id() ?? 1,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('secteurs.index')
            ->with('success', 'Secteur créé avec succès');
    }

    /**
     * Affiche un secteur spécifique.
     */
    public function show(Secteur $secteur)
    {
        $secteur->load('quartiers');

        return Inertia::render('Secteurs/Show', [
            'secteur' => $secteur
        ]);
    }

    /**
     * Formulaire d'édition d'un secteur.
     */
    public function edit(Secteur $secteur)
    {
        $quartiers = Quartier::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Secteurs/Edit', [
            'secteur' => $secteur,
            'quartiers' => $quartiers
        ]);
    }

    /**
     * Met à jour un secteur existant.
     */
    public function update(Request $request, Secteur $secteur)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:secteurs,nom,' . $secteur->id,
            'code' => 'nullable|string|max:5',
            'quartier_id' => 'required|exists:quartiers,id',
            'est_actif' => 'boolean',
        ]);

        $secteur->update([
            ...$validated,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('secteurs.index')
            ->with('success', 'Secteur mis à jour avec succès');
    }

    /**
     * Supprime un secteur.
     */
    public function destroy(Secteur $secteur)
    {
        $secteur->delete();

        return redirect()->route('secteurs.index')
            ->with('success', 'Secteur supprimé avec succès');
    }
}

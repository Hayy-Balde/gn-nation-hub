<?php

namespace App\Http\Controllers;

use App\Models\Quartier;
use App\Models\Commune;
use App\Models\Secteur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuartierController extends Controller
{
    /**
     * Liste tous les quartiers.
     */
    public function index()
    {
        $quartiers = Quartier::with('commune')->orderBy('nom')->get();

        return Inertia::render('Home/Quartiers/Index', [
            'quartiers' => $quartiers
        ]);
    }

    /**
     * Formulaire de création d'un quartier.
     */
    public function create()
    {
        $communes = Commune::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Quartiers/Create', [
            'communes' => $communes
        ]);
    }

    /**
     * Enregistre un nouveau quartier.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:quartiers,nom',
            'code' => 'nullable|string|max:5',
            'commune_id' => 'required|exists:communes,id',
            'est_actif' => 'boolean',
        ]);

        $quartier = Quartier::create([
            ...$validated,
            'cree_par' => auth()->id() ?? 1,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('quartiers.index')
            ->with('success', 'Quartier créé avec succès');
    }

    /**
     * Affiche un quartier spécifique.
     */
    public function show(Quartier $quartier)
    {
        $quartier->load('communes');

        return Inertia::render('Quartiers/Show', [
            'quartier' => $quartier
        ]);
    }

    public function showPublic(Quartier $quartier)
    {
        $quartier->load('commune');
        $secteurs = Secteur::with('quartier')->where('quartier_id', $quartier->id)->orderBy('nom')->get();

        return Inertia::render('Home/Quartiers/Show', [
            'quartier' => $quartier,
            'secteurs' => $secteurs
        ]);
    }

    /**
     * Formulaire d'édition d'un quartier.
     */
    public function edit(Quartier $quartier)
    {
        $communes = Commune::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Quartiers/Edit', [
            'quartier' => $quartier,
            'communes' => $communes
        ]);
    }

    /**
     * Met à jour un quartier existant.
     */
    public function update(Request $request, Quartier $quartier)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:quartiers,nom,' . $quartier->id,
            'code' => 'nullable|string|max:5',
            'commune_id' => 'required|exists:communes,id',
            'est_actif' => 'boolean',
        ]);

        $quartier->update([
            ...$validated,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('quartiers.index')
            ->with('success', 'Quartier mis à jour avec succès');
    }

    /**
     * Supprime un quartier.
     */
    public function destroy(Quartier $quartier)
    {
        $quartier->delete();

        return redirect()->route('quartiers.index')
            ->with('success', 'Quartier supprimé avec succès');
    }
}

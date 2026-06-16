<?php

namespace App\Http\Controllers;

use App\Models\Commune;
use App\Models\Prefecture;
use App\Models\Quartier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommuneController extends Controller
{
    /**
     * Liste toutes les communes.
     */
    public function index()
    {
        $communes = Commune::with('prefecture')->orderBy('nom')->paginate(10);

        return Inertia::render('Home/Communes/Index', [
            'communes' => $communes
        ]);
    }

    /**
     * Formulaire de création d'une commune.
     */
    public function create()
    {
        $prefectures = Prefecture::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Communes/Create', [
            'prefectures' => $prefectures
        ]);
    }

    /**
     * Enregistre une nouvelle commune.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:communes,nom',
            'code' => 'nullable|string|max:5',
            'code_postal' => 'nullable|string|max:15',
            'prefecture_id' => 'required|exists:prefectures,id',
            'est_actif' => 'boolean',
        ]);

        $commune = Commune::create([
            ...$validated,
            'cree_par' => auth()->id() ?? 1,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('communes.index')
            ->with('success', 'Commune créée avec succès');
    }

    /**
     * Affiche une commune spécifique.
     */
    public function show(Commune $commune)
    {
        $commune->load('prefectures');

        return Inertia::render('Communes/Show', [
            'commune' => $commune
        ]);
    }

    public function showPublic(Commune $commune)
    {
        $commune->load('prefecture');
        $quartiers = Quartier::with('commune')->where('commune_id', $commune->id)->orderBy('nom')->get();

        return Inertia::render('Home/Communes/Show', [
            'commune' => $commune,
            'quartiers' => $quartiers
        ]);
    }

    /**
     * Formulaire d'édition d'une commune.
     */
    public function edit(Commune $commune)
    {
        $prefectures = Prefecture::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Communes/Edit', [
            'commune' => $commune,
            'prefectures' => $prefectures
        ]);
    }

    /**
     * Met à jour une commune existante.
     */
    public function update(Request $request, Commune $commune)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:communes,nom,' . $commune->id,
            'code' => 'nullable|string|max:5',
            'code_postal' => 'nullable|string|max:15',
            'prefecture_id' => 'required|exists:prefectures,id',
            'est_actif' => 'boolean',
        ]);

        $commune->update([
            ...$validated,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('communes.index')
            ->with('success', 'Commune mise à jour avec succès');
    }

    /**
     * Supprime une commune.
     */
    public function destroy(Commune $commune)
    {
        $commune->delete();

        return redirect()->route('communes.index')
            ->with('success', 'Commune supprimée avec succès');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Commune;
use App\Models\Prefecture;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrefectureController extends Controller
{
    /**
     * Liste toutes les préfectures.
     */
    public function indexPublic(Request $request)
    {
        $prefectures = Prefecture::with('region')->orderBy('nom')->get();

        return Inertia::render('Home/Prefectures/Index', [
            'prefectures' => $prefectures
        ]);
    }

    public function index(Request $request)
    {
        $prefectures = Prefecture::with('region')->orderBy('nom')->get();

        return Inertia::render('Home/Prefectures/Index', [
            'prefectures' => $prefectures
        ]);
    }


    /**
     * Formulaire de création d'une préfecture.
     */
    public function create()
    {
        $regions = Region::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Prefectures/Create', [
            'regions' => $regions
        ]);
    }

    /**
     * Enregistre une nouvelle préfecture.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:prefectures,nom',
            'code' => 'nullable|string|max:5',
            'region_id' => 'required|exists:regions,id',
            'est_actif' => 'boolean',
        ]);

        $prefecture = Prefecture::create([
            ...$validated,
            'cree_par' => auth()->id() ?? 1,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('prefectures.index')
            ->with('success', 'Préfecture créée avec succès');
    }

    /**
     * Affiche une préfecture spécifique.
     */
    public function show(Prefecture $prefecture)
    {
        $prefecture->load('regions');

        return Inertia::render('Prefectures/Show', [
            'prefecture' => $prefecture
        ]);
    }

    public function showPublic(Prefecture $prefecture)
    {
        $prefecture->load('region');
        $communes = Commune::with('prefecture')->where('prefecture_id', $prefecture->id)->orderBy('nom')->get();

        return Inertia::render('Home/Prefectures/Show', [
            'prefecture' => $prefecture,
            'communes' => $communes
        ]);
    }

    /**
     * Formulaire d'édition d'une préfecture.
     */
    public function edit(Prefecture $prefecture)
    {
        $regions = Region::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Prefectures/Edit', [
            'prefecture' => $prefecture,
            'regions' => $regions
        ]);
    }

    /**
     * Met à jour une préfecture existante.
     */
    public function update(Request $request, Prefecture $prefecture)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:prefectures,nom,' . $prefecture->id,
            'code' => 'nullable|string|max:5',
            'region_id' => 'required|exists:regions,id',
            'est_actif' => 'boolean',
        ]);

        $prefecture->update([
            ...$validated,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('prefectures.index')
            ->with('success', 'Préfecture mise à jour avec succès');
    }

    /**
     * Supprime une préfecture.
     */
    public function destroy(Prefecture $prefecture)
    {
        $prefecture->delete();

        return redirect()->route('prefectures.index')
            ->with('success', 'Préfecture supprimée avec succès');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Region;
use App\Models\Pays;
use App\Models\Prefecture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegionController extends Controller
{
    /**
     * Liste toutes les régions.
     */
    public function index()
    {
        $regions = Region::with('pays')->orderBy('nom')->paginate(10);

        return Inertia::render('Home/Regions/Index', [
            'regions' => $regions
        ]);
    }

    /**
     * Formulaire de création d'une région.
     */
    public function create()
    {
        $pays = Pays::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Home/Regions/Create', [
            'pays' => $pays
        ]);
    }

    /**
     * Enregistre une nouvelle région.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100|unique:regions,nom',
            'code' => 'nullable|string|max:5',
            'pays_id' => 'required|exists:pays,id',
            'est_actif' => 'boolean',
        ]);

        $region = Region::create([
            ...$validated,
            'cree_par' => auth()->id() ?? 1,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('regions.index')
            ->with('success', 'Région créée avec succès');
    }

    /**
     * Affiche une région spécifique.
     */
    public function show(Region $region)
    {
        $region->load('pays');

        return Inertia::render('Home/Regions/Show', [
            'region' => $region
        ]);
    }
    public function showPublic(Region $region)
    {
        $region->load('pays');
        $prefectures = Prefecture::with('region')->where('region_id', $region->id)->orderBy('nom')->get();

        return Inertia::render('Home/Regions/Show', [
            'region' => $region,
            'prefectures' => $prefectures
        ]);
    }

    /**
     * Formulaire d'édition d'une région.
     */
    public function edit(Region $region)
    {
        $pays = Pays::where('est_actif', true)->orderBy('nom')->get();

        return Inertia::render('Home/Regions/Edit', [
            'region' => $region,
            'pays' => $pays
        ]);
    }

    /**
     * Met à jour une région existante.
     */
    public function update(Request $request, Region $region)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:100|unique:regions,nom,' . $region->id,
            'code' => 'nullable|string|max:5',
            'pays_id' => 'required|exists:pays,id',
            'est_actif' => 'boolean',
        ]);

        $region->update([
            ...$validated,
            'modifie_par' => auth()->id() ?? 1,
        ]);

        return redirect()->route('regions.index')
            ->with('success', 'Région mise à jour avec succès');
    }

    /**
     * Supprime une région.
     */
    public function destroy(Region $region)
    {
        $region->delete();

        return redirect()->route('regions.index')
            ->with('success', 'Région supprimée avec succès');
    }
}

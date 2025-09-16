<?php

namespace App\Http\Controllers;

use App\Models\SimulationResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SimulationController extends Controller
{
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'borrowing_capacity' => 'required|numeric|min:0',
            'debt_ratio' => 'required|numeric|min:0|max:100',
            'total_project_cost' => 'required|numeric|min:0',
            'total_credit_cost' => 'required|numeric|min:0',
            'estimated_monthly_payment' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => 'Données invalides',
                'details' => $validator->errors()
            ], 400);
        }

        try {
            $simulation = SimulationResult::create([
                'user_id' => $request->user()->id,
                'borrowing_capacity' => $request->borrowing_capacity,
                'debt_ratio' => $request->debt_ratio,
                'total_project_cost' => $request->total_project_cost,
                'total_credit_cost' => $request->total_credit_cost,
                'estimated_monthly_payment' => $request->estimated_monthly_payment,
            ]);

            return response()->json([
                'ok' => true,
                'message' => 'Simulation sauvegardée avec succès',
                'data' => $simulation
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur sauvegarde simulation: ' . $e->getMessage());
            return response()->json([
                'ok' => false,
                'error' => 'Erreur lors de la sauvegarde: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUserSimulations(Request $request)
    {
        try {
            $simulations = SimulationResult::where('user_id', $request->user()->id)
                ->orderBy('id', 'desc')
                ->get();

            return response()->json([
                'ok' => true,
                'data' => $simulations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'ok' => false,
                'error' => 'Erreur lors de la récupération des simulations'
            ], 500);
        }
    }

    public function deleteSimulation(Request $request, $id)
    {
        try {
            $user = $request->user();
            $simulation = SimulationResult::where('id', $id)
                ->where('user_id', $user->id)
                ->first();

            if (!$simulation) {
                return response()->json([
                    'ok' => false,
                    'error' => 'Simulation non trouvée'
                ], 404);
            }

            $simulation->delete();

            return response()->json([
                'ok' => true,
                'message' => 'Simulation supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression de la simulation: ' . $e->getMessage());
            return response()->json([
                'ok' => false,
                'error' => 'Erreur lors de la suppression de la simulation'
            ], 500);
        }
    }
}

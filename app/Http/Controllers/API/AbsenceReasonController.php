<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AbsenceReason;
use Illuminate\Http\Request;

class AbsenceReasonController extends Controller
{
    public function index()
    {
        return AbsenceReason::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reason_name' => 'required|string|max:255',
            'is_respectful' => 'required|boolean',
        ]);

        return AbsenceReason::create($validated);
    }

    public function show($id)
    {
        return AbsenceReason::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $absenceReason = AbsenceReason::findOrFail($id);

        $validated = $request->validate([
            'reason_name' => 'sometimes|required|string|max:255',
            'is_respectful' => 'sometimes|required|boolean',
        ]);

        $absenceReason->update($validated);
        return $absenceReason;
    }

    public function destroy($id)
    {
        $absenceReason = AbsenceReason::findOrFail($id);
        $absenceReason->delete();

        return response()->noContent();
    }
}

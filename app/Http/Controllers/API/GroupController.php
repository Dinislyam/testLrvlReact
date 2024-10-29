<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index()
    {
        return Group::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'group_name' => 'required|string|max:255|unique:groups',
            'is_professional' => 'required|boolean',
            'building_id' => 'required|exists:buildings,id',
        ]);

        return Group::create($validated);
    }

    public function show($id)
    {
        return Group::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $group = Group::findOrFail($id);

        $validated = $request->validate([
            'group_name' => 'sometimes|required|string|max:255|unique:groups,group_name,' . $id,
            'is_professional' => 'sometimes|required|boolean',
            'building_id' => 'sometimes|required|exists:buildings,id',
        ]);

        $group->update($validated);
        return $group;
    }

    public function destroy($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        try {
            $tags = Tag::all();
            return $tags;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => $e->getCode() || 500], $e->getCode() || 500);
        }
    }

    public function show(string $id)
    {
        try {
            $tag = Tag::find($id);
            return $tag;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => $e->getCode() || 500], $e->getCode() || 500);
        }
    }
}

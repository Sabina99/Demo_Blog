<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();
            return $categories;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => $e->getCode() || 500], $e->getCode() || 500);
        }
    }

    public function show(string $id)
    {
        try {
            $category = Category::find($id);
            return $category;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => $e->getCode() || 500], $e->getCode() || 500);
        }
    }
}

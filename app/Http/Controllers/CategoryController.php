<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            // error not authorized
        }
        $categories = Category::all();
        return $categories;
    }

    public function show(string $id)
    {
        if (!Auth::check()) {
            // error not authorized
        }
        $categorie = Category::find($id);
        return $categorie;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();
        return $tags;
    }

    public function show(string $id)
    {
        $tag = Tag::find($id);
        return $tag;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use mysql_xdevapi\Exception;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('tags')->get();
        return csrf_token();
//        return 'bbb';
//        return $articles;
    }

    public function show(string $id)
    {
        if (!Auth::check()) {
            // error not authorized
            return 'NOT authorized';
        }

        $article = Article::with('tags')->find($id);

        if (!$article) {
            // error
        }

        return $article;
    }

    public function store(Request $request)
    {
        if (!Auth::check()) {
            // error not authorized
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'excerpt' => 'required',
            'content' => 'required',
            'active' => 'required',
            'tags' => 'required',
            'image' => 'required',
            'category' => 'required'
        ]);

        if ($validator->fails()) {
            return $validator->errors()->first();
        }

        $categoryId = Category::where(['id' => $request->input('category')])->get()->first();
        if (!$categoryId) {
            // error
        }

        $article = Article::create([
            'title' => $request->input('title'),
            'excerpt' => $request->input('excerpt'),
            'content' => $request->input('content'),
            'active' => $request->input('active'),
            'image' => $request->input('image'),
            'category_id' => $request->input('category')
        ]);

        $tagIds = [];
        foreach ($request->input('tags') as $tag) {
            if (Tag::where(['id' => $tag])->get()->first()) {
                $tagIds[] = $tag;
            }
        }

        $article->tags()->attach($tagIds);

        return $article;
    }

    public function update(Request $request, string $id) {

    }
}

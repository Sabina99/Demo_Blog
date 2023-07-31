<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('tags', 'category')->get();
        return $articles->map(fn (Article $article) => ([
            'id' => $article->id,
            'title' => $article->title,
            'content' => $article->content,
            'category' => $article->category->jsonSerialize(),
            'tags' => $article->tags->jsonSerialize(),
            'excerpt' => $article->excerpt,
            'image' => '/storage/images/' . $article->image
        ]));
    }

    public function show(string $id)
    {
        try {
            $article = Article::with('tags')->find($id);

            if (!$article) {
                throw new \Exception("Article not found.", 404);
            }

            return response()->json([
                'id' => $article->id,
                'title' => $article->title,
                'content' => $article->content,
                'category' => $article->category->jsonSerialize(),
                'tags' => $article->tags->jsonSerialize(),
                'excerpt' => $article->excerpt,
                'image' => '/storage/images/' . $article->image
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => $e->getCode()], $e->getCode());
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'excerpt' => 'required',
            'content' => 'required',
            'tags' => 'required',
            'category' => 'required',
            'file' => 'required|image|mimes:jpg,png,jpeg'
        ]);

        DB::beginTransaction();

        try {
            if ($validator->fails()) {
                throw new \Exception($validator->errors()->first(), 422 );
            }

            $categoryId = Category::where(['id' => $request->input('category')])->get()->first();
            if (!$categoryId) {
                throw new \Exception("Category not found.", 404);
            }

            $request->file('file')->store('images', 'public');

            $article = Article::create([
                'title' => $request->input('title'),
                'excerpt' => $request->input('excerpt'),
                'content' => $request->input('content'),
                'active' => true,
                'image' => $request->file('file')->hashName(),
                'category_id' => $request->input('category')
            ]);

            $tagIds = [];

            foreach (explode(',', $request->input('tags')) as $tag) {
                if (Tag::where(['id' => $tag])->get()->first()) {
                    $tagIds[] = $tag;
                }
            }

            $article->tags()->attach($tagIds);

            DB::commit();
            return $article;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage(), 'status' => $e->getCode() || 500], $e->getCode() || 500);
        }
    }

    public function update(Request $request, $id) {
        return $request->all();
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'excerpt' => 'required',
            'content' => 'required',
            'tags' => 'required',
            'category' => 'required',
        ]);

        DB::beginTransaction();

        try {
            if ($validator->fails()) {
                throw new \Exception($validator->errors()->first(), 422 );
            }

            if ($request->hasFile('file')) {
                $validateImage = Validator::make($request->all(), [
                    'file' => 'required|image|mimes:jpg,png,jpeg'
                ]);


                if ($validateImage->fails()) {
                    throw new \Exception($validateImage->errors()->first(), 422 );
                }

                $request->file('file')->store('images', 'public');
                $article = Article::where('id', $id)
                    ->update([
                        'title' => $request->input('title'),
                        'excerpt' => $request->input('excerpt'),
                        'content' => $request->input('content'),
                        'active' => $request->input('active'),
                        'image' => $request->file('file')->hashName(),
                        'category_id' => $request->input('category')
                    ]);
            } else {
                $article = Article::where('id', $id)
                    ->update([
                        'title' => $request->input('title'),
                        'excerpt' => $request->input('excerpt'),
                        'content' => $request->input('content'),
                        'active' => $request->input('active'),
                        'category_id' => $request->input('category')
                    ]);
            }
            DB::commit();
            return $article;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage(), 'status' => $e->getCode()], $e->getCode());
        }
    }
}

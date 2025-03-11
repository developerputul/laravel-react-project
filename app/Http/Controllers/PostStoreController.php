<?php

namespace App\Http\Controllers;

use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;

class PostStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'required|image',
        ]);
        $data['slug'] = str($data['title'])->slug();

        if ($request->hasFile('image')) {
            $data['image'] = Storage::disk('public')->put('post', $request->file('image'));
        }
        $request->user()->posts()->create($data);

        return to_route('posts/index');
    }
}

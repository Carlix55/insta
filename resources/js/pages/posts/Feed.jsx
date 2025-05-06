import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Heart } from 'lucide-react';

export default function Feed({ posts, auth }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Feed" />

            <div className="max-w-3xl mx-auto space-y-6 p-4">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} auth={auth} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

function PostCard({ post, auth }) {
    const [liked, setLiked] = useState(post.liked_by_user || false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [comments, setComments] = useState(post.comments || []);
    const [isFollowing, setIsFollowing] = useState(post.user.is_followed || false);

    const { post: toggleLike } = useForm();
    const { post: toggleFollow } = useForm();
    const { data, setData, post: submitComment, processing, reset } = useForm({
        content: ''
    });

    const handleLike = () => {
        toggleLike(route('posts.like', post.id), {
            preserveScroll: true,
            onSuccess: () => {
                setLiked(!liked);
                setLikesCount((prev) => liked ? prev - 1 : prev + 1);
            }
        });
    };

    const handleFollow = () => {
        toggleFollow(route('user.follow', post.user.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsFollowing((prev) => !prev);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        submitComment(route('posts.comment', post.id), {
            preserveScroll: true,
            onSuccess: () => {
                setComments([
                    ...comments,
                    {
                        id: Date.now(),
                        content: data.content,
                        user: { name: auth.user.name }
                    }
                ]);
                reset();
            }
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <img
                src={`/storage/${post.image}`}
                alt="Post"
                className="w-full h-auto object-cover"
            />

            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <button onClick={handleLike}>
                            {liked ? (
                                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                            ) : (
                                <Heart className="w-6 h-6 text-gray-500" />
                            )}
                        </button>
                        <span className="text-sm text-gray-800">{likesCount} me gusta</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">@{post.user.name}</span>

                        {auth.user.id !== post.user.id && (
                            <button
                                onClick={handleFollow}
                                className={`text-xs px-3 py-1 rounded-full transition ${
                                    isFollowing
                                        ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            >
                                {isFollowing ? 'Siguiendo' : 'Seguir'}
                            </button>
                        )}
                    </div>
                </div>

                <p className="text-sm text-gray-900 mb-3">{post.caption}</p>

                <div className="space-y-1 mb-4 max-h-32 overflow-y-auto pr-1">
                    {comments.map((comment) => (
                        <p key={comment.id} className="text-sm text-gray-700">
                            <strong>{comment.user.name}</strong>: {comment.content}
                        </p>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="flex-1 border rounded-full px-4 py-1 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

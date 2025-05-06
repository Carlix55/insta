import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Followers({ followers, following, auth }) {
    const { post } = useForm();

    const handleToggleFollow = (userId) => {
        post(`/follow/${userId}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tu red</h2>}
        >
            <Head title="Seguidores y Seguidos" />

            <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
                {/* Siguiendo */}
                <section>
                    <h3 className="text-lg font-bold mb-3 text-blue-600">Siguiendo</h3>
                    <ul className="space-y-2">
                        {following.length > 0 ? (
                            following.map((user) => (
                                <li key={user.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggleFollow(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                                    >
                                        Dejar de seguir
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No estás siguiendo a nadie aún.</p>
                        )}
                    </ul>
                </section>

                {/* Seguidores */}
                <section>
                    <h3 className="text-lg font-bold mb-3 text-green-600">Tus seguidores</h3>
                    <ul className="space-y-2">
                        {followers.length > 0 ? (
                            followers.map((user) => {
                                const isFollowing = following.some(f => f.id === user.id);
                                return (
                                    <li key={user.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleToggleFollow(user.id)}
                                            className={`p-2 rounded text-white ${
                                                isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                                            }`}
                                        >
                                            {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-500">Todavía no tienes seguidores.</p>
                        )}
                    </ul>
                </section>

            </div>
        </AuthenticatedLayout>
    );
}

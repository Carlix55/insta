import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react'; // No es necesario importar 'Inertia' desde @inertiajs/react
import { Inertia } from '@inertiajs/inertia'; // Correcto, importamos desde 'inertia' para hacer la petición PUT
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EditPost({ post }) {
    const { data, setData, processing, errors } = useForm({
        caption: post.caption || '',
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Usamos Inertia.put para actualizar el post
        Inertia.put(route('posts.update', post.id), data);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Posts</h2>}
        >
            <Head title="Editar Post" />

            <div className="max-w-2xl mx-auto py-6 px-4">
                <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Caption</label>
                        <textarea
                            value={data.caption}
                            onChange={(e) => setData('caption', e.target.value)}
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                        />
                        {errors.caption && <div className="text-sm text-red-500 mt-1">{errors.caption}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Imagen</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm"
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="mt-4 w-full rounded shadow" />
                        )}
                        {!preview && post.image && (
                            <img
                                src={`/storage/${post.image}`}
                                alt="Imagen actual"
                                className="mt-4 w-full rounded shadow"
                            />
                        )}
                        {errors.image && <div className="text-sm text-red-500 mt-1">{errors.image}</div>}
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            href={route('posts.mine')}
                            className="text-sm text-gray-600 hover:text-gray-800 underline"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

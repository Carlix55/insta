import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function Dashboard() {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        caption: '',
    });

    const [preview, setPreview] = useState(null); // Vista previa de la imagen

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'), {
            onSuccess: () => {
                reset();
                setPreview(null); // limpiar vista previa
                alert('📸 Foto subida con éxito!');
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Añadir Posts
                </h2>
            }
        >
            <Head title="Añadir Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-8">

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 text-gray-900">
                        ¡Estás dentro! Bienvenido.
                    </div>

                    {/* Formulario para subir fotos */}
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Subir una nueva foto</h3>

                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label
                                    htmlFor="image"
                                    className="flex items-center justify-center gap-2 cursor-pointer bg-gray-100 border border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-200 transition"
                                >
                                    <Upload className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm text-gray-700">Selecciona una imagen</span>
                                    <input
                                        id="image"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                {errors.image && (
                                    <div className="text-red-500 text-sm mt-1">{errors.image}</div>
                                )}
                            </div>

                            {preview && (
                                <div className="mt-2">
                                    <img
                                        src={preview}
                                        alt="Vista previa"
                                        className="max-h-64 rounded border"
                                    />
                                </div>
                            )}

                            <div>
                                <textarea
                                    name="caption"
                                    placeholder="Escribe un pie de foto..."
                                    value={data.caption}
                                    onChange={(e) => setData('caption', e.target.value)}
                                    className="w-full border rounded p-2 text-sm"
                                />
                                {errors.caption && (
                                    <div className="text-red-500 text-sm mt-1">{errors.caption}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                <Upload className="w-4 h-4" />
                                Publicar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

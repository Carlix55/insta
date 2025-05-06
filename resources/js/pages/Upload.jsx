import React, { useState } from 'react';
import axios from 'axios';

export default function Upload() {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);

        try {
            await axios.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            setCaption('');
            setImage(null);
            alert('¡Publicación subida!');
        } catch (err) {
            console.error(err);
            alert('Error al subir imagen');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Nueva publicación</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={e => setImage(e.target.files[0])} className="mb-2" />
                <textarea
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    className="w-full border p-2 mb-2"
                    placeholder="Escribe un comentario..."
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                    Subir
                </button>
            </form>
        </div>
    );
}

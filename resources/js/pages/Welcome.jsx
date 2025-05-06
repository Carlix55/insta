import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

const images = [
    '/images/bg1.jpg',
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
]; // Asegúrate de tener estas imágenes en tu carpeta public/images

export default function Welcome() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // Cambia cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Fondo con imagen dinámica */}
            <div className="absolute inset-0 z-0 transition-opacity duration-1000">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
                {/* Overlay para oscurecer un poco el fondo */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 flex justify-center items-center min-h-screen">
                <div className="text-center bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-500">
                    <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Bienvenido a InstaClone</h1>
                    <p className="text-md mb-6 text-gray-600">¡Conéctate y comparte tus mejores momentos!</p>

                    <div className="mb-4">
                        <Link
                            href={route('login')}
                            className="inline-block w-full py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                        >
                            Iniciar sesión
                        </Link>
                    </div>

                    <div>
                        <p className="text-sm text-gray-700">
                            ¿No tienes una cuenta?{' '}
                            <Link
                                href={route('register')}
                                className="text-blue-500 hover:underline"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

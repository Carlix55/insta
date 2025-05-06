import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Instagram, Menu, X } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* NAVBAR */}
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* LOGO + LINKS */}
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Instagram className="text-pink-600 w-6 h-6" />
                                <span className="font-bold text-gray-800 text-lg">InstaClone</span>
                            </Link>
                            <div className="hidden sm:flex gap-6">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    📤 Publicar
                                </NavLink>
                                <NavLink href="/feed" active={route().current('feed')}>
                                    📰 Feed
                                </NavLink>
                                <NavLink href={route('followers.index')} active={route().current('followers.index')}>
                                    👥 Mi Red
                                </NavLink>

                                <NavLink href={route('posts.mine')} active={route().current('posts.mine')}>
                                    📸 Mis Posts
                                </NavLink>
                            </div>
                        </div>

                        {/* USER + DROPDOWN */}
                        <div className="hidden sm:flex items-center space-x-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                                        {user.name}
                                        <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                    <Dropdown.Link href={route('posts.mine')}>Mis Posts</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Cerrar sesión
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none transition"
                            >
                                {showingNavigationDropdown ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MENU RESPONSIVE */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden bg-white border-t`}>
                    <div className="px-4 pt-4 pb-2 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            📤 Publicar
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href="/feed" active={route().current('feed')}>
                            📰 Feed
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('followers.index')} active={route().current('followers.index')}>
                            👥 Mi Red
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('posts.mine')} active={route().current('posts.mine')}>
                            📸 Mis Posts
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t px-4 py-3">
                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                        <div className="text-sm font-medium text-gray-500">{user.email}</div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* CONTENIDO PRINCIPAL */}
            <main>{children}</main>
        </div>
    );
}


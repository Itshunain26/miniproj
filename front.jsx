'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Calendar, Activity, Settings } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', icon: Home, label: 'Dashboard' },
        { href: '/patients', icon: Users, label: 'Patients' },
        { href: '/appointments', icon: Calendar, label: 'Appointments' },
        { href: '/analytics', icon: Activity, label: 'Analytics' },
        { href: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-teal-600">Jarurat Care</h1>
                <p className="text-sm text-gray-500">Patient Management</p>
            </div>
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-teal-50 text-teal-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

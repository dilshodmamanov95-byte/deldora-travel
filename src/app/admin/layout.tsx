'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Globe, 
  Plane, 
  Bus, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/session')
      .then((response) => response.json())
      .then((data) => setIsAuthenticated(Boolean(data.authenticated)))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false));
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    router.push('/admin/login');
    router.refresh();
  };

  return { isAuthenticated, isLoading, logout };
};

// Навигация админки
const AdminSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Дашбоард' },
    { href: '/admin/tours', icon: Plane, label: 'Международные туры' },
    { href: '/admin/tours/domestic', icon: Bus, label: 'Внутренние туры' },
    { href: '/admin/blog', icon: FileText, label: 'Блог' },
    { href: '/admin/pages', icon: Globe, label: 'Страницы' },
    { href: '/admin/settings', icon: Settings, label: 'Настройки' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Deldora Admin
            </span>
          </h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Заголовок админки
const AdminHeader = ({ onMenuClick, onLogout }: { onMenuClick: () => void; onLogout: () => void }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-700 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <button onClick={onMenuClick} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Deldora Admin</h1>
        <button onClick={onLogout} className="p-2">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
      
      <div className="hidden lg:flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Deldora Admin</h1>
        <button onClick={onLogout} className="flex items-center p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <LogOut className="w-5 h-5 mr-2" />
          Выйти
        </button>
      </div>
    </header>
  );
};

// Основной layout админки
export default function AdminLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Если не авторизован и не загружается, редирект на логин
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !window.location.pathname.includes('/admin/login')) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated && !window.location.pathname.includes('/admin/login')) {
    return null; // Редирект обрабатывается через useEffect
  }

  // Для страницы логина не показываем sidebar
  if (window.location.pathname.includes('/admin/login')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="flex">
        <AdminSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <div className="flex-1 flex flex-col lg:ml-0">
          <AdminHeader 
            onMenuClick={() => setIsSidebarOpen(true)} 
            onLogout={logout}
          />
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

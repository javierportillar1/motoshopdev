import React from 'react';
import { 
  Home, 
  Users, 
  Car, 
  FileText, 
  Calendar,
  Package,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Órdenes de Trabajo', path: '/ordenes' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: Car, label: 'Vehículos', path: '/vehiculos' },
  { icon: Calendar, label: 'Recordatorios', path: '/recordatorios' },
  { icon: Package, label: 'Inventario', path: '/inventario' },
  { icon: BarChart3, label: 'Reportes', path: '/reportes' },
  { icon: Settings, label: 'Configuración', path: '/configuracion' },
];

export function Sidebar({ collapsed, onToggle, currentPath, onNavigate }: SidebarProps) {
  return (
    <div className={cn(
      'bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen transition-all duration-300 shadow-2xl',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Taller Motos
            </h1>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={cn(
                'w-full flex items-center px-4 py-3 text-left transition-all duration-200 rounded-lg mx-2 my-1',
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-105' 
                  : 'hover:bg-white/10 hover:scale-105'
              )}
            >
              <Icon size={20} />
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
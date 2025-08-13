import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors" size={20} />
            <Input
              type="text"
              placeholder="Buscar por placa, cliente, OT..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-80 border-0 bg-gray-50/50 focus:bg-white transition-all duration-200 focus:shadow-lg"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-110">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-110">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
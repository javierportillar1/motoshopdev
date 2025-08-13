import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Clientes } from './pages/Clientes';
import { OrdenesTrabajoList } from './pages/OrdenesTrabajoList';
import { Vehiculos } from './pages/Vehiculos';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/clientes':
        return <Clientes />;
      case '/ordenes':
        return <OrdenesTrabajoList />;
      case '/vehiculos':
        return <Vehiculos />;
      case '/recordatorios':
        return <div className="p-6">Recordatorios (En desarrollo)</div>;
      case '/inventario':
        return <div className="p-6">Inventario (En desarrollo)</div>;
      case '/reportes':
        return <div className="p-6">Reportes (En desarrollo)</div>;
      case '/configuracion':
        return <div className="p-6">Configuración (En desarrollo)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentPath={currentPath}
          onNavigate={setCurrentPath}
        />
        
        <div className="flex-1 flex flex-col">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <main className="flex-1 overflow-auto">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
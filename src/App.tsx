import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';

import { Dashboard } from './pages/Dashboard';
import { LiveTracking } from './pages/LiveTracking';
import { RoutesPage } from './pages/RoutesPage';
import { FeePortal } from './pages/FeePortal';
import { FleetManagement } from './pages/FleetManagement';
import { DriverManagement } from './pages/DriverManagement';
import { AdminLedger } from './pages/AdminLedger';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'live-tracking':
        return <LiveTracking />;
      case 'routes':
        return <RoutesPage onNavigate={setCurrentPage} />;
      case 'fee-portal':
        return <FeePortal />;
      case 'fleet-management':
        return <FleetManagement />;
      case 'driver-management':
        return <DriverManagement />;
      case 'admin-ledger':
        return <AdminLedger />;
      case 'alerts':
        return <AlertsPage />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-safety-orange selection:text-white font-sans">
      {/* Sidebar (Desktop permanent, mobile drawer) */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header Navbar */}
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNavigate={setCurrentPage}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderPage()}
        </main>

        {/* Institutional Footer */}
        <Footer onNavigate={setCurrentPage} />
      </div>

      {/* Mobile Bottom Quick Navigation Bar */}
      <MobileNav currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Global Toast Notification System */}
      <ToastContainer />
    </div>
  );
}

export default App;

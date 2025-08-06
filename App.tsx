import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Welcome } from "./components/Welcome";
import { Button } from "./components/ui/button";
import { Shield, Home, BarChart3 } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'dashboard'>('welcome');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-medium">KAVACH</h1>
              <p className="text-sm text-muted-foreground">AMR Intelligence System</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={currentView === 'welcome' ? 'default' : 'outline'}
              onClick={() => setCurrentView('welcome')}
              size="sm"
            >
              <Home className="h-4 w-4 mr-2" />
              About
            </Button>
            <Button 
              variant={currentView === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setCurrentView('dashboard')}
              size="sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {currentView === 'welcome' && <Welcome />}
        {currentView === 'dashboard' && <Dashboard />}
      </div>
    </div>
  );
}
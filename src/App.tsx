import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { JourneyBanner } from './components/JourneyBanner';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/common/Toast';

// Modals
import { ChallengeWizardModal } from './components/gov/ChallengeWizardModal';
import { ProposalModal } from './components/startup/ProposalModal';
import { InnovationPassportModal } from './components/passport/InnovationPassportModal';

// Views
import { GovDashboard } from './components/gov/GovDashboard';
import { ChallengeDetailView } from './components/gov/ChallengeDetailView';
import { StartupProfile } from './components/startup/StartupProfile';
import { ChallengeExplorer } from './components/startup/ChallengeExplorer';
import { StartupTracker } from './components/startup/StartupTracker';
import { EvaluatorQueue } from './components/evaluator/EvaluatorQueue';
import { ProposalEvaluationView } from './components/evaluator/ProposalEvaluationView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PilotResultsView } from './components/pilot/PilotResultsView';

const MainContent: React.FC = () => {
  const { role, activeTab } = useApp();

  const renderView = () => {
    // Universal cross-role views
    if (activeTab === 'pilot_view') {
      return <PilotResultsView />;
    }

    if (activeTab === 'passport') {
      return <PilotResultsView />;
    }

    // Role-specific view routing
    switch (role) {
      case 'gov_officer':
        if (activeTab === 'challenges') {
          return <ChallengeDetailView />;
        }
        return <GovDashboard />;

      case 'startup':
        if (activeTab === 'profile') {
          return <StartupProfile />;
        }
        if (activeTab === 'tracker') {
          return <StartupTracker />;
        }
        return <ChallengeExplorer />;

      case 'evaluator':
        if (activeTab === 'scoring') {
          return <ProposalEvaluationView />;
        }
        return <EvaluatorQueue />;

      case 'admin':
        return <AdminDashboard />;

      default:
        return <GovDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-950">
      <Header />
      <JourneyBanner />

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-3 sm:p-5 gap-6">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-16">{renderView()}</main>
      </div>

      {/* Global Modals & Toast */}
      <ChallengeWizardModal />
      <ProposalModal />
      <InnovationPassportModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

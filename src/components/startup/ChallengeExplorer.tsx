import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Challenge } from '../../types';
import {
  Search,
  Filter,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const ChallengeExplorer: React.FC = () => {
  const {
    challenges,
    setSelectedChallengeId,
    setActiveTab,
    setIsProposalModalOpen,
    startupProfile
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [savedIds, setSavedIds] = useState<string[]>(['chal-001']);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredChallenges = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.problemStatement.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector =
      selectedSector === 'all' ||
      c.eligibility.sectors.some((s) => s.toLowerCase().includes(selectedSector.toLowerCase()));

    const matchesSaved = !showSavedOnly || savedIds.includes(c.id);

    return matchesSearch && matchesSector && matchesSaved;
  });

  const recommendedChallenge = challenges.find((c) => c.id === 'chal-001') || challenges[0];

  return (
    <div className="space-y-6">
      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 text-white border border-blue-800 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                AI Matchmaking Engine • Maharashtra Innovation Procurement
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">Compatibility Score:</span>
              <span className="text-lg font-black font-mono text-emerald-400 bg-emerald-950/80 px-3 py-0.5 rounded-lg border border-emerald-500/40">
                98% MATCH
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <div className="font-mono text-xs text-blue-300">
                {recommendedChallenge.challengeCode} • {recommendedChallenge.department}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mt-1 tracking-tight">
                {recommendedChallenge.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {recommendedChallenge.expectedOutcome}
              </p>

              {/* Transparent AI Matching Justification */}
              <div className="mt-4 pt-3 border-t border-blue-800/80">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Why this is recommended for {startupProfile.name}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Your patented dual-beam ultrasonic sensor directly solves bin false-alarms</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Certified TRL 7 fulfills required minimum TRL 6 mandate</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Validated prior municipal PoC with Thane Municipal Corporation</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>STQC Safe-to-Host audit satisfies municipal cybersecurity clauses</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <button
                onClick={() => {
                  setSelectedChallengeId(recommendedChallenge.id);
                  setIsProposalModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Submit Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedChallengeId(recommendedChallenge.id);
                  setActiveTab('tracker');
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-900/60 hover:bg-blue-900 text-white text-xs font-semibold rounded-xl border border-blue-700 transition-all cursor-pointer"
              >
                <span>View Status / Telemetry</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search challenges by keyword, department, or civic domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">All Sectors</option>
            <option value="GovTech">GovTech</option>
            <option value="Smart Cities">Smart Cities</option>
            <option value="CleanTech">CleanTech</option>
            <option value="IoT">IoT & Hardware</option>
          </select>

          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
              showSavedOnly
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedIds.length})</span>
          </button>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChallenges.map((challenge) => {
          const isSaved = savedIds.includes(challenge.id);
          const isSelected = challenge.id === 'chal-001';

          return (
            <div
              key={challenge.id}
              className={`bg-white rounded-2xl border p-5 shadow-2xs flex flex-col justify-between transition-all hover:shadow-md ${
                isSelected ? 'border-blue-300 ring-1 ring-blue-200' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {challenge.challengeCode}
                  </span>
                  <button
                    onClick={() => toggleSave(challenge.id)}
                    className="text-slate-400 hover:text-amber-500 transition-colors p-1"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-2 leading-snug">
                  {challenge.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">{challenge.department}</p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {challenge.expectedOutcome}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {challenge.eligibility.sectors.slice(0, 3).map((sec) => (
                    <span
                      key={sec}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600"
                    >
                      {sec}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Min TRL {challenge.eligibility.minTRL}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Pilot Grant</span>
                    <span className="font-bold text-slate-900 font-mono">
                      ₹{challenge.budget.pilotBudgetInLakhs} Lakhs
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Scaling Value</span>
                    <span className="font-bold text-blue-700 font-mono">
                      ₹{challenge.budget.commercialScaleBudgetInCrores} Cr
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedChallengeId(challenge.id);
                      setIsProposalModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Apply with Proposal
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

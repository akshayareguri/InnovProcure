import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  FileText,
  Briefcase,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Plus,
  Cpu,
  Lock,
  Sparkles,
  Save,
  X
} from 'lucide-react';

export const StartupProfile: React.FC = () => {
  const { startupProfile, updateStartupProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    tagline: startupProfile.tagline,
    headquarters: startupProfile.headquarters,
    techStack: startupProfile.technologyStack.join(', '),
    coreSkills: startupProfile.coreSkills.join(', ')
  });

  const handleSave = () => {
    updateStartupProfile({
      tagline: editForm.tagline,
      headquarters: editForm.headquarters,
      technologyStack: editForm.techStack.split(',').map((s) => s.trim()),
      coreSkills: editForm.coreSkills.split(',').map((s) => s.trim())
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-2xl flex items-center justify-center shadow-xs border border-orange-400">
              EA
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {startupProfile.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  DPIIT Verified: {startupProfile.dpiitRecognitionNumber}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                  MahaStart ID: {startupProfile.maharashtraStartupId}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {startupProfile.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span>📍 {startupProfile.headquarters}</span>
                <span>•</span>
                <span>Incorporated: {startupProfile.incorporationDate}</span>
                <span>•</span>
                <span>Udyam: {startupProfile.udyamRegistration}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Gov Readiness Index
              </span>
              <span className="text-2xl font-black font-mono text-emerald-700">
                {startupProfile.readinessScore}/100
              </span>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Quick Sector Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500">Recognized Sectors:</span>
          {startupProfile.sectors.map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
            >
              {s}
            </span>
          ))}
          <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            TRL {startupProfile.trlLevel} Certified
          </span>
        </div>
      </div>

      {/* Edit Form Drawer */}
      {isEditing && (
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-amber-950 pb-2 border-b border-amber-200">
            <span>Edit Startup Capabilities & Details</span>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Tagline</label>
              <input
                type="text"
                value={editForm.tagline}
                onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                className="w-full p-2 border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Headquarters Address</label>
              <input
                type="text"
                value={editForm.headquarters}
                onChange={(e) => setEditForm({ ...editForm, headquarters: e.target.value })}
                className="w-full p-2 border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Technology Stack (comma-separated)</label>
              <input
                type="text"
                value={editForm.techStack}
                onChange={(e) => setEditForm({ ...editForm, techStack: e.target.value })}
                className="w-full p-2 border rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Core Skills (comma-separated)</label>
              <input
                type="text"
                value={editForm.coreSkills}
                onChange={(e) => setEditForm({ ...editForm, coreSkills: e.target.value })}
                className="w-full p-2 border rounded-lg bg-white"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* Two Column Layout: Tech Stack & Team + Certifications & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Tech Stack & Team */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Proprietary Technology Stack & Hardware IP</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {startupProfile.technologyStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Leadership & Engineering Team */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Founding & Core Engineering Team</span>
            </div>
            <div className="space-y-2.5">
              {startupProfile.team.map((member) => (
                <div key={member.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{member.name}</span>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{member.experience}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Past Municipal Work History */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>Municipal & Government Track Record</span>
            </div>
            <div className="space-y-2.5 text-xs">
              {startupProfile.pastWorkHistory.map((work) => (
                <div key={work.project} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{work.client} ({work.year})</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Verified PoC</span>
                  </div>
                  <div className="font-semibold text-slate-700 text-[11px] mt-0.5">{work.project}</div>
                  <p className="text-[11px] text-slate-500 mt-1">{work.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Certifications & Verification Documents */}
        <div className="space-y-6">
          {/* Statutory Certifications */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Security, Privacy & Standards Accreditations</span>
            </div>
            <div className="space-y-2.5">
              {startupProfile.certificates.map((cert) => (
                <div
                  key={cert.name}
                  className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-200 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{cert.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Issued by: {cert.issuer} • Valid from {cert.issueDate}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Technical & Financial Dossier */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Uploaded Legal & Technical Documents</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">3 Files</span>
            </div>
            <div className="space-y-2.5 text-xs">
              {startupProfile.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="font-bold text-slate-800 truncate max-w-xs">{doc.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

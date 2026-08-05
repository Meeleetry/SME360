import React, { useState } from 'react';
import {
  Building2,
  User,
  ShieldCheck,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  MapPin,
  Globe,
  Award,
  Edit2,
  Save,
} from 'lucide-react';
import { User as UserType } from '../types';

interface CompanyProfileViewProps {
  user: UserType | null;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [companyDetails, setCompanyDetails] = useState({
    name: user?.companyName || 'Apex SME Innovations Ltd',
    registrationNumber: 'REG-2024-884920',
    taxId: 'US-TAX-9948201',
    industry: 'Technology & Business Consulting',
    foundedYear: '2021',
    employeeCount: '48 employees',
    website: 'https://sme360.ai',
    address: '100 Innovation Way, Suite 400, San Francisco, CA 94105',
    phone: '+1 (555) 382-9900',
    currency: 'USD ($)',
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Alex Rivera', role: 'Founder & CEO', email: 'alex.rivera@sme360.ai', department: 'Executive' },
    { id: '2', name: 'Sarah Jenkins', role: 'VP of Operations', email: 'sarah.j@sme360.ai', department: 'Operations' },
    { id: '3', name: 'Michael Chen', role: 'Head of Finance', email: 'm.chen@sme360.ai', department: 'Finance' },
    { id: '4', name: 'Elena Rostova', role: 'Chief Product Officer', email: 'elena.r@sme360.ai', department: 'Product' },
  ]);

  const [newMember, setNewMember] = useState({ name: '', role: '', email: '', department: 'General' });
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;
    setTeamMembers((prev) => [
      ...prev,
      { id: `mem-${Date.now()}`, ...newMember },
    ]);
    setNewMember({ name: '', role: '', email: '', department: 'General' });
    setShowAddMemberModal(false);
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-sm">
            {companyDetails.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{companyDetails.name}</h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Verified Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {companyDetails.website}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          <span>{isEditing ? 'Cancel Editing' : 'Edit Company Details'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center gap-3 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Company profile updated successfully across SME360 AI modules!</span>
        </div>
      )}

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form or Detailed View */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 dark:text-white text-sm pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-500" />
              Corporate Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Company Legal Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={companyDetails.name}
                  onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg outline-none disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Business Registration ID</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={companyDetails.registrationNumber}
                  onChange={(e) => setCompanyDetails({ ...companyDetails, registrationNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg outline-none disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Federal Tax / VAT Identification</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={companyDetails.taxId}
                  onChange={(e) => setCompanyDetails({ ...companyDetails, taxId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg outline-none disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Industry Sector</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={companyDetails.industry}
                  onChange={(e) => setCompanyDetails({ ...companyDetails, industry: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg outline-none disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Year Founded</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={companyDetails.foundedYear}
                  onChange={(e) => setCompanyDetails({ ...companyDetails, foundedYear: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg outline-none disabled:opacity-75"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Employee Count Range</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={companyDetails.employeeCount}
                  onChange={(e) => setCompanyDetails({ ...companyDetails, employeeCount: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg outline-none disabled:opacity-75"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Headquarters Address</label>
              <input
                type="text"
                disabled={!isEditing}
                value={companyDetails.address}
                onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg outline-none disabled:opacity-75"
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
              >
                Save Profile Updates
              </button>
            )}
          </form>

          {/* Executive & Team Roster */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" />
                Key Executives & User Access
              </h2>
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Team Member
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {teamMembers.map((member) => (
                <div key={member.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{member.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{member.role} • {member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-[10px] rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                      {member.department}
                    </span>
                    {member.role !== 'Founder & CEO' && (
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Financial Verification & Banking */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Compliance & Security
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-200">ISO 27001 Certified</p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400">Valid through Nov 2027</p>
                </div>
                <Award className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-indigo-900 dark:text-indigo-200">SOC2 Type II Attested</p>
                  <p className="text-[10px] text-indigo-700 dark:text-indigo-400">Enterprise Cloud Security</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Tax ID Verification</p>
                  <p className="text-[10px] text-slate-500">Active IRS Clearance</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-500" />
              Bank Disbursement Details
            </h3>

            <div className="p-4 rounded-lg bg-slate-900 text-white space-y-2">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Primary Business Account</p>
              <p className="font-mono text-sm font-bold">Silicon Valley Bank •••• 8842</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                <span>Routing: 121140399</span>
                <span className="text-emerald-400 font-semibold">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Add Executive or Staff Member</h3>
            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border-0 rounded-lg outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Job Title / Role</label>
                <input
                  type="text"
                  required
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  placeholder="e.g. Tax Compliance Officer"
                  className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border-0 rounded-lg outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="marcus.vance@sme360.ai"
                  className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border-0 rounded-lg outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <select
                  value={newMember.department}
                  onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border-0 rounded-lg outline-none text-slate-900 dark:text-white"
                >
                  <option>Executive</option>
                  <option>Finance</option>
                  <option>Operations</option>
                  <option>Legal & Compliance</option>
                  <option>General</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs"
                >
                  Save Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

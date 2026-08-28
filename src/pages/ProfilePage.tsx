import React, { useState } from 'react';
import {
  Save,
  Moon,
  Sun,
} from 'lucide-react';
import { useTransit } from '../context/TransitContext';
import { useTheme } from '../context/ThemeContext';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { userRole, setUserRole, showToast } = useTransit();
  const { theme, toggleTheme } = useTheme();

  const [studentProfile, setStudentProfile] = useState({
    name: 'Rajesh Kumar Verma',
    rollNumber: '420423205002',
    department: 'Computer Science & Engineering',
    year: 'III Year / Section B',
    email: 'rajesh.verma.cse23@apec.edu.in',
    phone: '+91 98765 43210',
    bloodGroup: 'O+ Positive',
    emergencyContact: '+91 98765 00001 (Father)',
    boardingPoint: 'Aduturai Railway Crossing (Route 01)',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Updated', 'Your profile details have been saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-safety-orange font-mono">
            User Account & Identification
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Transport Profile & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personal identity credentials, emergency medical contacts, and portal settings
          </p>
        </div>

        {/* Role Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setUserRole('student')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              userRole === 'student'
                ? 'bg-white dark:bg-slate-900 text-apec-600 dark:text-apec-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Student Mode
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              userRole === 'admin'
                ? 'bg-safety-orange text-white shadow-glow-orange'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Admin Officer Mode
          </button>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ID Card Badge */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-deep-navy via-slate-900 to-apec-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 text-center relative overflow-hidden">
            <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-md mx-auto flex items-center justify-center font-bold text-4xl font-heading shadow-md mb-4 border border-white/20">
              {userRole === 'admin' ? 'AP' : 'RK'}
            </div>

            <h2 className="text-xl font-bold font-heading">
              {userRole === 'admin' ? 'Transport Operations Control' : studentProfile.name}
            </h2>
            <p className="text-xs text-safety-orange font-mono font-bold mt-0.5">
              {userRole === 'admin' ? 'STAFF-AUTH-904' : studentProfile.rollNumber}
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Designation:</span>
                <span className="font-semibold text-white">
                  {userRole === 'admin' ? 'Chief Transport Officer' : 'B.E. Computer Science'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Campus Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active / Authorized
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Transit Pass:</span>
                <span className="text-safety-orange font-bold font-mono">APEC-PASS-2024-089</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('fee-portal')}
              className="w-full mt-6 py-3 rounded-2xl bg-safety-orange hover:bg-orange-600 text-white font-bold text-xs shadow-glow-orange transition-all"
            >
              View Digital Bus Pass
            </button>
          </div>

          {/* Theme & Display Preferences Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold font-heading text-sm text-slate-900 dark:text-white mb-4">
              Display Preferences
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Application Theme
                </p>
                <p className="text-[11px] text-slate-400">
                  {theme === 'light' ? 'Light Mode Active' : 'Dark High-Contrast Active'}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-200/80 dark:border-slate-800">
            <h3 className="font-bold font-heading text-lg text-slate-900 dark:text-white mb-6">
              Identity & Contact Credentials
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={studentProfile.name}
                    onChange={(e) => setStudentProfile({ ...studentProfile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Roll Number
                  </label>
                  <input
                    type="text"
                    value={studentProfile.rollNumber}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College Official Email
                  </label>
                  <input
                    type="email"
                    value={studentProfile.email}
                    onChange={(e) => setStudentProfile({ ...studentProfile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={studentProfile.phone}
                    onChange={(e) => setStudentProfile({ ...studentProfile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Academic Department
                  </label>
                  <input
                    type="text"
                    value={studentProfile.department}
                    onChange={(e) => setStudentProfile({ ...studentProfile, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    value={studentProfile.bloodGroup}
                    onChange={(e) => setStudentProfile({ ...studentProfile, bloodGroup: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Parent / Guardian Emergency Contact
                </label>
                <input
                  type="text"
                  value={studentProfile.emergencyContact}
                  onChange={(e) => setStudentProfile({ ...studentProfile, emergencyContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Boarding Point & Transit Route
                </label>
                <input
                  type="text"
                  value={studentProfile.boardingPoint}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-500 font-medium"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-safety-orange hover:bg-orange-600 text-white font-bold text-xs shadow-glow-orange transition-all transform active:scale-95"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

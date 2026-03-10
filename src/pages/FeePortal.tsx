import { useState } from 'react';
import { Search, CheckCircle, XCircle, User, GraduationCap } from 'lucide-react';

interface StudentData {
  rollNumber: string;
  name: string;
  department: string;
  paymentStatus: 'Paid' | 'Pending';
  balance: number;
  totalFees: number;
  lastPayment: string;
}

const mockStudents: Record<string, StudentData> = {
  '2021CS001': {
    rollNumber: '2021CS001',
    name: 'Arun Kumar',
    department: 'Computer Science & Engineering',
    paymentStatus: 'Paid',
    balance: 0,
    totalFees: 85000,
    lastPayment: '2024-01-15',
  },
  '2021EC045': {
    rollNumber: '2021EC045',
    name: 'Priya Sharma',
    department: 'Electronics & Communication',
    paymentStatus: 'Pending',
    balance: 25000,
    totalFees: 85000,
    lastPayment: '2023-12-10',
  },
  '2021ME032': {
    rollNumber: '2021ME032',
    name: 'Vijay Rajan',
    department: 'Mechanical Engineering',
    paymentStatus: 'Paid',
    balance: 0,
    totalFees: 80000,
    lastPayment: '2024-02-01',
  },
};

export default function FeePortal() {
  const [rollNumber, setRollNumber] = useState('');
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStudentData(null);

    const data = mockStudents[rollNumber.toUpperCase()];
    if (data) {
      setStudentData(data);
    } else {
      setError('Student not found. Please check the roll number and try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Student Fee Portal</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Check payment status and balance details
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Enter Roll Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g., 2021CS001"
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-deep-navy dark:focus:border-safety-orange bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-deep-navy dark:bg-safety-orange hover:bg-blue-900 dark:hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
            <p className="text-red-700 dark:text-red-400 flex items-center gap-2">
              <XCircle size={20} />
              {error}
            </p>
          </div>
        )}

        {studentData && (
          <div className="max-w-2xl mx-auto mt-8 space-y-6">
            <div className="bg-gradient-to-br from-deep-navy to-blue-900 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{studentData.name}</h2>
                  <p className="text-gray-200">Roll No: {studentData.rollNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <GraduationCap size={20} />
                <span>{studentData.department}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Status</div>
                <div className="flex items-center gap-2">
                  {studentData.paymentStatus === 'Paid' ? (
                    <>
                      <CheckCircle className="text-green-500" size={24} />
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        Paid
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-safety-orange" size={24} />
                      <span className="text-2xl font-bold text-safety-orange">Pending</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Balance Due</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{studentData.balance.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Fees</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{studentData.totalFees.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Payment</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Date(studentData.lastPayment).toLocaleDateString('en-IN')}
                </div>
              </div>
            </div>

            {studentData.balance > 0 && (
              <button className="w-full bg-safety-orange hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
                Pay Now - ₹{studentData.balance.toLocaleString('en-IN')}
              </button>
            )}
          </div>
        )}

        {!studentData && !error && (
          <div className="max-w-2xl mx-auto mt-12 text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">Enter a roll number to view fee details</p>
            <p className="text-sm mt-2">Try: 2021CS001, 2021EC045, or 2021ME032</p>
          </div>
        )}
      </div>
    </div>
  );
}

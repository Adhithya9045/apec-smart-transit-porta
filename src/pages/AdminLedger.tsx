import { useState } from 'react';
import { Search, CheckCircle, AlertCircle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface LedgerEntry {
  id: string;
  timestamp: string;
  plateNumber: string;
  direction: 'Entry' | 'Exit';
  status: 'Authorized' | 'Unknown';
  driver?: string;
}

const mockLedgerData: LedgerEntry[] = [
  {
    id: '1',
    timestamp: '2024-03-07 08:15:23',
    plateNumber: 'TN 48 AB 1234',
    direction: 'Entry',
    status: 'Authorized',
    driver: 'Rajesh Kumar',
  },
  {
    id: '2',
    timestamp: '2024-03-07 08:20:45',
    plateNumber: 'TN 48 CD 5678',
    direction: 'Entry',
    status: 'Authorized',
    driver: 'Suresh Babu',
  },
  {
    id: '3',
    timestamp: '2024-03-07 09:05:12',
    plateNumber: 'TN 49 XY 9999',
    direction: 'Entry',
    status: 'Unknown',
  },
  {
    id: '4',
    timestamp: '2024-03-07 10:30:56',
    plateNumber: 'TN 48 AB 1234',
    direction: 'Exit',
    status: 'Authorized',
    driver: 'Rajesh Kumar',
  },
  {
    id: '5',
    timestamp: '2024-03-07 11:15:33',
    plateNumber: 'TN 48 EF 2468',
    direction: 'Entry',
    status: 'Authorized',
    driver: 'Kumar Swamy',
  },
  {
    id: '6',
    timestamp: '2024-03-07 12:45:18',
    plateNumber: 'TN 50 AB 1111',
    direction: 'Entry',
    status: 'Unknown',
  },
  {
    id: '7',
    timestamp: '2024-03-07 13:20:05',
    plateNumber: 'TN 48 CD 5678',
    direction: 'Exit',
    status: 'Authorized',
    driver: 'Suresh Babu',
  },
  {
    id: '8',
    timestamp: '2024-03-07 14:10:42',
    plateNumber: 'TN 48 GH 7890',
    direction: 'Entry',
    status: 'Authorized',
    driver: 'Mohan Das',
  },
];

export default function AdminLedger() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Authorized' | 'Unknown'>('All');
  const [filterDirection, setFilterDirection] = useState<'All' | 'Entry' | 'Exit'>('All');

  const filteredData = mockLedgerData.filter((entry) => {
    const matchesSearch =
      entry.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.driver?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || entry.status === filterStatus;
    const matchesDirection = filterDirection === 'All' || entry.direction === filterDirection;

    return matchesSearch && matchesStatus && matchesDirection;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Admin Security Ledger
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Vehicle entry and exit monitoring system
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by plate number or driver name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-deep-navy dark:focus:border-safety-orange bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-deep-navy dark:focus:border-safety-orange bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="All">All Status</option>
            <option value="Authorized">Authorized</option>
            <option value="Unknown">Unknown</option>
          </select>
          <select
            value={filterDirection}
            onChange={(e) => setFilterDirection(e.target.value as any)}
            className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-deep-navy dark:focus:border-safety-orange bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="All">All Directions</option>
            <option value="Entry">Entry</option>
            <option value="Exit">Exit</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">
                  Plate Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">
                  Driver
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">
                  Direction
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.length > 0 ? (
                filteredData.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                      {entry.timestamp}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900 dark:text-white">
                      {entry.plateNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {entry.driver || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {entry.direction === 'Entry' ? (
                          <>
                            <ArrowDownCircle size={18} className="text-green-500" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-400">
                              Entry
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowUpCircle size={18} className="text-blue-500" />
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                              Exit
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {entry.status === 'Authorized' ? (
                          <>
                            <CheckCircle size={18} className="text-green-500" />
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                              Authorized
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={18} className="text-safety-orange" />
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-safety-orange">
                              Unknown
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No entries found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            Showing {filteredData.length} of {mockLedgerData.length} entries
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Authorized: {mockLedgerData.filter((e) => e.status === 'Authorized').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-safety-orange rounded-full"></div>
              <span>Unknown: {mockLedgerData.filter((e) => e.status === 'Unknown').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Download, Eye, Edit } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const ImportInspections: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const inspections = [
    {
      id: '1',
      reference: 'IMP-2025-001',
      date: '2025-04-15',
      commodity: 'Mangoes',
      origin: 'Jamaica',
      importer: 'Super Value Ltd.',
      quantity: '500 lb',
      status: 'approved',
      inspector: 'Vinesa Sawyer',
    },
    {
      id: '2',
      reference: 'IMP-2025-002',
      date: '2025-04-16',
      commodity: 'Citrus Fruits',
      origin: 'Texas, USA',
      importer: 'Fresh Imports Inc.',
      quantity: '1000 lb',
      status: 'detained',
      inspector: 'Ezra Bartholomew',
    },
        {
      id: '2',
      reference: 'IMP-2025-003',
      date: '2025-04-16',
      commodity: 'Orange Trees',
      origin: 'Florida, USA',
      importer: 'Island Landcape Inc.',
      quantity: '100 each',
      status: 'rejected',
      inspector: 'Ezra Bartholomew',
    },
    {
      id: '3',
      reference: 'IMP-2025-004',
      date: '2025-05-19',
      commodity: 'Avocado',
      origin: 'Dominican Republic',
      importer: 'AML Co.',
      quantity: '750 lb',
      status: 'pending',
      inspector: 'Yasmin Johnson',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'detained':
        return <Badge variant="danger">Detained</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.importer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Import Inspections</h1>
          <p className="text-gray-600 mt-1">Manage and track import inspection records</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button icon={Plus}>
            <Link to="/import-inspections/new">New Inspection</Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by reference, commodity, or importer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="quarantine">Quarantine</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button variant="secondary" icon={Filter}>Filter</Button>
            <Button variant="secondary" icon={Download}>Export</Button>
          </div>
        </div>
      </Card>

      {/* Inspections Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commodity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {inspection.reference}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.commodity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.origin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.importer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(inspection.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.inspector}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Empty State */}
      {filteredInspections.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inspections found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or create a new inspection.
            </p>
            <Button icon={Plus}>
              <Link to="/import-inspections/new">Create New Inspection</Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImportInspections;
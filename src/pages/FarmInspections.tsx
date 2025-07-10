import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Download, Eye, Edit, MapPin, Calendar, User, AlertTriangle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const FarmInspections: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const inspections = [
    {
      id: '1',
      reference: 'FARM-2025-001',
      date: '2025-01-15',
      farmName: 'Jamrock Harvest Co.',
      farmOwner: 'Kimberley Trowers',
      location: 'Nassau, New Providence',
      cropTypes: ['Tomatoes', 'Peppers'],
      status: 'completed',
      inspector: 'Vinesa Sawyer',
      followUpRequired: false,
      complianceScore: 95,
      lastInspection: '2025-05-15'
    },
    {
      id: '2',
      reference: 'FARM-2025-002',
      date: '2025-05-20',
      farmName: 'Green Valley Agriculture',
      farmOwner: 'Kellie Rolle',
      location: 'North Andros',
      cropTypes: ['Citrus', 'Mangoes'],
      status: 'follow_up_required',
      inspector: 'Ezra Bartholomew',
      followUpRequired: true,
      complianceScore: 78,
      lastInspection: '2025-05-20'
    },
    {
      id: '3',
      reference: 'FARM-2025-003',
      date: '2025-05-25',
      farmName: 'Paradise Organic Farm',
      farmOwner: 'Leslie Meadows',
      location: 'Eleuthera',
      cropTypes: ['Pineapples', 'Avocados'],
      status: 'non_compliant',
      inspector: 'Yasmin Johnson',
      followUpRequired: true,
      complianceScore: 62,
      lastInspection: '2025-05-25'
    },
    {
      id: '4',
      reference: 'FARM-2025-004',
      date: '2025-05-29',
      farmName: 'Miller Farms.',
      farmOwner: 'Stephen Miller',
      location: 'Exuma',
      cropTypes: ['Bananas', 'Plantains'],
      status: 'pending',
      inspector: 'Tamico Nelson',
      followUpRequired: false,
      complianceScore: null,
      lastInspection: '2025-05-29'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'follow_up_required':
        return <Badge variant="warning">Follow-up Required</Badge>;
      case 'non_compliant':
        return <Badge variant="danger">Non-Compliant</Badge>;
      default:
        return <Badge variant="default">Pending</Badge>;
    }
  };

  const getComplianceColor = (score: number | null) => {
    if (score === null) return 'text-gray-400';
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.farmOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: 'Total Farms',
      value: '89',
      change: '+5 this month',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Inspections This Month',
      value: '24',
      change: '+12% from last month',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Follow-ups Required',
      value: '7',
      change: '3 overdue',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Compliance Rate',
      value: '87%',
      change: '+2% improvement',
      icon: User,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Inspections</h1>
          <p className="text-gray-600 mt-1">Monitor and manage farm inspection records</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button icon={Plus}>
            <Link to="/farm-inspections/new">New Farm Inspection</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <div className="flex items-center">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by reference, farm name, owner, or location..."
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
              <option value="completed">Completed</option>
              <option value="follow_up_required">Follow-up Required</option>
              <option value="non_compliant">Non-Compliant</option>
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
                  Farm Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crop Types
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance
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
                    <div className="text-xs text-gray-500">{inspection.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{inspection.farmName}</div>
                    <div className="text-sm text-gray-500">{inspection.farmOwner}</div>
                    <div className="text-xs text-gray-400">Last: {inspection.lastInspection}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      {inspection.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {inspection.cropTypes.map((crop, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inspection.complianceScore !== null ? (
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getComplianceColor(inspection.complianceScore)}`}>
                          {inspection.complianceScore}%
                        </span>
                        {inspection.followUpRequired && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 ml-2" />
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(inspection.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inspection.inspector}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Edit">
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No farm inspections found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or create a new farm inspection.
            </p>
            <Button icon={Plus}>
              <Link to="/farm-inspections/new">Create New Farm Inspection</Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Inspection</h3>
            <p className="text-gray-600 text-sm">Plan a new farm inspection visit</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow-up Actions</h3>
            <p className="text-gray-600 text-sm">Review farms requiring follow-up</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Farm Registry</h3>
            <p className="text-gray-600 text-sm">Manage registered farm database</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FarmInspections;
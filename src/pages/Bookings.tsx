import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserCheck,
  Building,
  Truck
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import { useAuth } from '../contexts/AuthContext';

const Bookings: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const bookings = [
    {
      id: '1',
      reference: 'BOOK-2025-001',
      submittedDate: '2025-01-15',
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(242) 555-0123',
      company: 'Fresh Imports Ltd.',
      inspectionType: 'import',
      preferredDate: '2025-01-20',
      preferredTime: '09:00',
      alternativeDate: '2025-01-21',
      alternativeTime: '10:00',
      urgency: 'routine',
      status: 'pending',
      assignedInspector: null,
      // Import specific
      commodity: 'Mangoes',
      originCountry: 'Jamaica',
      quantity: 500,
      unit: 'lbs',
      portOfEntry: 'Nassau',
      // Additional info
      specialRequirements: 'Need early morning inspection due to perishable nature',
      additionalNotes: 'First time importer, may need additional guidance'
    },
    {
      id: '2',
      reference: 'BOOK-2025-002',
      submittedDate: '2025-01-16',
      fullName: 'Maria Rodriguez',
      email: 'maria@greenfarms.bs',
      phone: '(242) 555-0456',
      company: 'Green Valley Farms',
      inspectionType: 'farm',
      preferredDate: '2025-01-22',
      preferredTime: '08:00',
      urgency: 'urgent',
      status: 'confirmed',
      assignedInspector: 'Vinesa Sawyer',
      // Farm specific
      farmName: 'Green Valley Organic Farm',
      farmLocation: 'North Andros, Red Bay Road',
      cropTypes: ['Tomatoes', 'Peppers', 'Herbs'],
      farmSize: 15.5,
      // Additional info
      specialRequirements: 'Organic certification inspection required',
      additionalNotes: 'Preparing for export certification'
    },
    {
      id: '3',
      reference: 'BOOK-2025-003',
      submittedDate: '2025-01-17',
      fullName: 'David Thompson',
      email: 'dthompson@citrusco.bs',
      phone: '(242) 555-0789',
      company: 'Bahamas Citrus Co.',
      inspectionType: 'import',
      preferredDate: '2025-01-19',
      preferredTime: '13:00',
      urgency: 'emergency',
      status: 'rejected',
      assignedInspector: null,
      rejectionReason: 'Incomplete documentation - missing phytosanitary certificate',
      // Import specific
      commodity: 'Citrus Trees',
      originCountry: 'Florida, USA',
      quantity: 100,
      unit: 'each',
      portOfEntry: 'Freeport',
      // Additional info
      additionalNotes: 'Replacement trees for hurricane damage'
    },
    {
      id: '4',
      reference: 'BOOK-2025-004',
      submittedDate: '2025-01-18',
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@pineapplefarms.bs',
      phone: '(242) 555-0321',
      company: 'Eleuthera Pineapple Farms',
      inspectionType: 'farm',
      preferredDate: '2025-01-25',
      preferredTime: '10:00',
      urgency: 'routine',
      status: 'assigned',
      assignedInspector: 'Ezra Bartholomew',
      // Farm specific
      farmName: 'Eleuthera Pineapple Plantation',
      farmLocation: 'Eleuthera, Governor\'s Harbour',
      cropTypes: ['Pineapples'],
      farmSize: 45.0,
      // Additional info
      specialRequirements: 'Need pest monitoring assessment',
      additionalNotes: 'Annual compliance inspection'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending Review</Badge>;
      case 'confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'assigned':
        return <Badge variant="info">Assigned</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'routine':
        return <Badge variant="default">Routine</Badge>;
      case 'urgent':
        return <Badge variant="warning">Urgent</Badge>;
      case 'emergency':
        return <Badge variant="danger">Emergency</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'import' ? (
      <Truck className="w-4 h-4 text-blue-600" />
    ) : (
      <Building className="w-4 h-4 text-green-600" />
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesType = typeFilter === 'all' || booking.inspectionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = [
    {
      title: 'Total Bookings',
      value: '47',
      change: '+8 this week',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Review',
      value: '12',
      change: '3 urgent',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Confirmed Today',
      value: '6',
      change: '2 import, 4 farm',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Assigned Inspectors',
      value: '8',
      change: '2 available',
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const handleStatusChange = (bookingId: string, newStatus: string, inspectorId?: string) => {
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`, { inspectorId });
    // Here you would update the booking in Supabase
  };

  const handleAssignInspector = (bookingId: string, inspectorId: string) => {
    console.log(`Assigning inspector ${inspectorId} to booking ${bookingId}`);
    // Here you would assign the inspector in Supabase
  };

  // Only show this page to admins
  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <Card>
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">You don't have permission to access the bookings management page.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inspection Bookings</h1>
          <p className="text-gray-600 mt-1">Manage and assign inspection booking requests</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="secondary">
            <a href="/book-inspection" target="_blank" rel="noopener noreferrer">
              View Public Booking Page
            </a>
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
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by reference, name, company, or email..."
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
              <option value="confirmed">Confirmed</option>
              <option value="assigned">Assigned</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="import">Import</option>
              <option value="farm">Farm</option>
            </select>
            <Button variant="secondary" icon={Filter}>Filter</Button>
            <Button variant="secondary" icon={Download}>Export</Button>
          </div>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspection Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Inspector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.reference}
                    </div>
                    <div className="text-xs text-gray-500">
                      Submitted: {booking.submittedDate}
                    </div>
                    <div className="flex items-center mt-1">
                      {getTypeIcon(booking.inspectionType)}
                      <span className="ml-1 text-xs text-gray-600 capitalize">
                        {booking.inspectionType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.fullName}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Mail className="w-3 h-3 mr-1" />
                      {booking.email}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" />
                      {booking.phone}
                    </div>
                    {booking.company && (
                      <div className="text-xs text-gray-500 mt-1">{booking.company}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {booking.inspectionType === 'import' ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.commodity}</div>
                        <div className="text-xs text-gray-500">
                          {booking.quantity} {booking.unit} from {booking.originCountry}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {booking.portOfEntry}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.farmName}</div>
                        <div className="text-xs text-gray-500">{booking.farmLocation}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {booking.cropTypes?.join(', ')}
                        </div>
                        {booking.farmSize && (
                          <div className="text-xs text-gray-500">{booking.farmSize} acres</div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {booking.preferredDate}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {booking.preferredTime}
                    </div>
                    {booking.alternativeDate && (
                      <div className="text-xs text-gray-400 mt-1">
                        Alt: {booking.alternativeDate} at {booking.alternativeTime}
                      </div>
                    )}
                    <div className="mt-2">
                      {getUrgencyBadge(booking.urgency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                    {booking.status === 'rejected' && booking.rejectionReason && (
                      <div className="text-xs text-red-600 mt-1">
                        {booking.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.assignedInspector ? (
                      <div className="text-sm text-gray-900 flex items-center">
                        <UserCheck className="w-4 h-4 mr-1 text-green-600" />
                        {booking.assignedInspector}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            className="text-green-600 hover:text-green-900" 
                            title="Confirm Booking"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900" 
                            title="Reject Booking"
                            onClick={() => handleStatusChange(booking.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {(booking.status === 'confirmed' || booking.status === 'assigned') && (
                        <button 
                          className="text-purple-600 hover:text-purple-900" 
                          title="Assign Inspector"
                          onClick={() => handleAssignInspector(booking.id, 'inspector-id')}
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new booking requests.
            </p>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Reviews</h3>
            <p className="text-gray-600 text-sm">Review and process pending booking requests</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Assign Inspectors</h3>
            <p className="text-gray-600 text-sm">Manage inspector assignments and schedules</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Management</h3>
            <p className="text-gray-600 text-sm">View and manage inspection schedules</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Bookings;
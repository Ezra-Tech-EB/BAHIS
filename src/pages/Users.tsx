import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone,
  Calendar,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import { useAuth } from '../contexts/AuthContext';

const Users: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: '1',
      name: 'Vinesa Sawyer',
      email: 'vinesasawyer@bahfsabahamas.com',
      phone: '(242) 555-0123',
      role: 'inspector',
      status: 'active',
      lastLogin: '2025-01-20',
      inspectionsCount: 45,
      joinDate: '2023-03-15',
      department: 'Plant Protection',
      location: 'Nassau'
    },
    {
      id: '2',
      name: 'Ezra Bartholomew',
      email: 'ezrabartholomew@ahfsabahamas.com',
      phone: '(242) 555-0456',
      role: 'coordinator',
      status: 'active',
      lastLogin: '2025-01-19',
      inspectionsCount: 42,
      joinDate: '2023-05-20',
      department: 'Plant Protection',
      location: 'Freeport'
    },
    {
      id: '3',
      name: 'Yasmin Johnson',
      email: 'yasminjohnson@ahfsabahamas.com',
      phone: '(242) 555-0789',
      role: 'director',
      status: 'active',
      lastLogin: '2025-01-20',
      inspectionsCount: 38,
      joinDate: '2022-11-10',
      department: 'Plant Protection',
      location: 'Nassau'
    },
    {
      id: '4',
      name: 'Tamico Nelson',
      email: 'tamiconelson@ahfsabahamas.com',
      phone: '(242) 555-0321',
      role: 'coordinator',
      status: 'inactive',
      lastLogin: '2025-01-15',
      inspectionsCount: 35,
      joinDate: '2023-08-05',
      department: 'Plant Protection',
      location: 'Andros'
    },
    {
      id: '5',
      name: 'Sarah Johnson',
      email: 'sarahmitchell@bahfsabahamas.com',
      phone: '(242) 555-0654',
      role: 'lab_technician',
      status: 'active',
      lastLogin: '2025-01-18',
      inspectionsCount: 0,
      joinDate: '2022-01-12',
      department: 'Laboratory Services',
      location: 'Nassau'
    },
    {
      id: '6',
      name: 'Admin User',
      email: 'admin@ahfsabahamas.com',
      phone: '(242) 555-0001',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-01-20',
      inspectionsCount: 0,
      joinDate: '2022-01-01',
      department: 'Administration',
      location: 'Nassau'
    }
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="danger">Admin</Badge>;
      case 'supervisor':
        return <Badge variant="warning">Supervisor</Badge>;
      case 'inspector':
        return <Badge variant="info">Inspector</Badge>;
      case 'lab_technician':
        return <Badge variant="success">Lab Technician</Badge>;
      default:
        return <Badge variant="default">User</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="warning">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="danger">Suspended</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    {
      title: 'Total Users',
      value: '23',
      change: '+2 this month',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Users',
      value: '19',
      change: '82% active rate',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Inspectors',
      value: '15',
      change: '3 new this quarter',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Approvals',
      value: '3',
      change: '2 require review',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  // Only show this page to admins
  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <Card>
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">You don't have permission to access the user management page.</p>
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
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users, roles, and permissions</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button icon={Plus}>
            Add New User
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
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="inspector">Inspector</option>
              <option value="lab_technician">Lab Technician</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button variant="secondary" icon={Filter}>Filter</Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-1" />
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Phone className="w-4 h-4 text-gray-400 mr-1" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="mb-2">
                      {getRoleBadge(user.role)}
                    </div>
                    <div className="text-sm text-gray-500">{user.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.inspectionsCount} inspections</div>
                    <div className="text-xs text-gray-500">Since {user.joinDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="Edit User">
                        <Edit className="w-4 h-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button className="text-yellow-600 hover:text-yellow-900" title="Deactivate User">
                          <UserX className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900" title="Activate User">
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900" title="Delete User">
                        <Trash2 className="w-4 h-4" />
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
      {filteredUsers.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or add a new user.
            </p>
            <Button icon={Plus}>
              Add New User
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New User</h3>
            <p className="text-gray-600 text-sm">Create new user accounts and assign roles</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Permissions</h3>
            <p className="text-gray-600 text-sm">Configure user roles and access permissions</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Activity</h3>
            <p className="text-gray-600 text-sm">Monitor user activity and login history</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent User Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-900">New user registered</p>
                <p className="text-xs text-green-700">John Smith joined as Inspector</p>
              </div>
            </div>
            <span className="text-xs text-green-600">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-900">User role updated</p>
                <p className="text-xs text-blue-700">Yasmin Johnson promoted to Supervisor</p>
              </div>
            </div>
            <span className="text-xs text-blue-600">1 day ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-900">User account deactivated</p>
                <p className="text-xs text-yellow-700">Tamico Nelson - Temporary leave</p>
              </div>
            </div>
            <span className="text-xs text-yellow-600">3 days ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Users;
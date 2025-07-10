import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Bug, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  BarChart3
} from 'lucide-react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Import Inspections',
      value: '24',
      change: '+12%',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: 'up'
    },
    {
      title: 'Farm Inspections',
      value: '18',
      change: '+8%',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: 'up'
    },
    {
      title: 'Pest Alerts',
      value: '7',
      change: '+3',
      icon: Bug,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: 'up'
    },
    {
      title: 'Reports Generated',
      value: '156',
      change: '+23%',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: 'up'
    },
  ];

  const recentInspections = [
    {
      id: '1',
      type: 'Import',
      reference: 'IMP-2025-001',
      commodity: 'Mangoes',
      status: 'approved',
      date: '2025-01-15',
      location: 'Arawak Port'
    },
    {
      id: '2',
      type: 'Farm',
      reference: 'FARM-2025-012',
      commodity: 'Tomatoes',
      status: 'follow_up_required',
      date: '2025-01-14',
      location: 'Andros - Reds Bay'
    },
    {
      id: '3',
      type: 'Import',
      reference: 'IMP-2025-002',
      commodity: 'Citrus',
      status: 'quarantine',
      date: '2025-01-13',
      location: 'Freeport Port'
    },
    {
      id: '4',
      type: 'Pest',
      reference: 'PEST-2025-005',
      commodity: 'Pineapples',
      status: 'monitoring',
      date: '2025-01-12',
      location: 'Eleuthera'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'follow_up_required':
        return <Badge variant="warning">Follow-up Required</Badge>;
      case 'quarantine':
        return <Badge variant="danger">Quarantine</Badge>;
      case 'monitoring':
        return <Badge variant="info">Monitoring</Badge>;
      default:
        return <Badge variant="default">Pending</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your inspections today.
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src="/BAHFSA APP.png" 
              alt="BAHFSA Logo" 
              className="w-20 h-20 opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-green-600 flex items-center font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <Link to="/import-inspections/new" className="block">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  New Import Inspection
                </h3>
                <p className="text-gray-600 text-sm">
                  Start a new import inspection for incoming shipments
                </p>
              </div>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <Link to="/farm-inspections/new" className="block">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  New Farm Inspection
                </h3>
                <p className="text-gray-600 text-sm">
                  Conduct an inspection at a registered farm
                </p>
              </div>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <Link to="/pest-surveillance" className="block">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bug className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Record Pest Surveillance
                </h3>
                <p className="text-gray-600 text-sm">
                  Log pest observations and trap monitoring data
                </p>
              </div>
            </Link>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Inspections</h3>
              <Link to="/reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View all
                <BarChart3 className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentInspections.map((inspection) => (
                <div key={inspection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {inspection.type === 'Import' ? (
                        <Truck className="w-5 h-5 text-blue-600" />
                      ) : inspection.type === 'Farm' ? (
                        <MapPin className="w-5 h-5 text-green-600" />
                      ) : (
                        <Bug className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{inspection.reference}</p>
                      <p className="text-sm text-gray-600">{inspection.commodity} • {inspection.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(inspection.status)}
                    <p className="text-xs text-gray-500 mt-1">{inspection.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Alerts</h3>
              <Badge variant="danger">3 New</Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-900 text-sm">High Pest Activity</p>
                  <p className="text-xs text-red-700 mt-1">Fruit fly population spike in Nassau farms</p>
                  <p className="text-xs text-red-600 mt-2">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-yellow-900 text-sm">Follow-up Due</p>
                  <p className="text-xs text-yellow-700 mt-1">Farm inspection FARM-2024-008 requires follow-up</p>
                  <p className="text-xs text-yellow-600 mt-2">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900 text-sm">Quarantine Released</p>
                  <p className="text-xs text-green-700 mt-1">Citrus shipment cleared for release</p>
                  <p className="text-xs text-green-600 mt-2">3 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Inspections Completed</span>
              <span className="font-semibold">42/50</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Compliance Rate</span>
              <span className="font-semibold">96%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-xs text-blue-700">Ports Monitored</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">89</p>
              <p className="text-xs text-green-700">Farms Registered</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">5</p>
              <p className="text-xs text-yellow-700">Active Quarantines</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">23</p>
              <p className="text-xs text-purple-700">Pest Species Tracked</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
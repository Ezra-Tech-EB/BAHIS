import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MapPin, 
  Calendar, 
  Bug, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Target,
  Camera,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const PestSurveillance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pestTypeFilter, setPestTypeFilter] = useState('all');

  const surveillanceRecords = [
    {
      id: '1',
      reference: 'PEST-2025-001',
      date: '2025-01-15',
      location: 'Cowpen Road',
      gpsCoordinates: '25.0443, -77.3504',
      pestType: 'Fruit Fly',
      scientificName: 'Ceratitis capitata',
      populationDensity: 'high',
      affectedCrops: ['Mangoes', 'Citrus'],
      trapType: 'McPhail Trap',
      trapCount: 45,
      inspector: 'Vinesa Sawyer',
      status: 'active_monitoring',
      weatherConditions: {
        temperature: 28,
        humidity: 75,
        windSpeed: 12
      }
    },
    {
      id: '2',
      reference: 'PEST-2025-002',
      date: '2025-01-16',
      location: 'North Andros Farm District',
      gpsCoordinates: '24.7000, -77.7667',
      pestType: 'Aphids',
      scientificName: 'Aphis gossypii',
      populationDensity: 'medium',
      affectedCrops: ['Tomatoes', 'Peppers'],
      trapType: 'Yellow Sticky Trap',
      trapCount: 23,
      inspector: 'Ezra Bartholomew',
      status: 'under_control',
      weatherConditions: {
        temperature: 26,
        humidity: 68,
        windSpeed: 8
      }
    },
    {
      id: '3',
      reference: 'PEST-2025-003',
      date: '2025-01-18',
      location: 'Eleuthera Pineapple Farms',
      gpsCoordinates: '25.1500, -76.1167',
      pestType: 'Scale Insects',
      scientificName: 'Diaspis bromeliae',
      populationDensity: 'low',
      affectedCrops: ['Pineapples'],
      trapType: 'Pheromone Trap',
      trapCount: 8,
      inspector: 'Yasmin Johnson',
      status: 'monitoring',
      weatherConditions: {
        temperature: 29,
        humidity: 82,
        windSpeed: 15
      }
    },
    {
      id: '4',
      reference: 'PEST-2025-004',
      date: '2025-01-20',
      location: 'Gladstone Road',
      gpsCoordinates: '23.5000, -75.8333',
      pestType: 'Whitefly',
      scientificName: 'Bemisia tabaci',
      populationDensity: 'high',
      affectedCrops: ['Bananas', 'Plantains'],
      trapType: 'Blue Sticky Trap',
      trapCount: 67,
      inspector: 'Tamico Nelson',
      status: 'outbreak_alert',
      weatherConditions: {
        temperature: 31,
        humidity: 78,
        windSpeed: 10
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under_control':
        return <Badge variant="success">Under Control</Badge>;
      case 'monitoring':
        return <Badge variant="info">Monitoring</Badge>;
      case 'active_monitoring':
        return <Badge variant="warning">Active Monitoring</Badge>;
      case 'outbreak_alert':
        return <Badge variant="danger">Outbreak Alert</Badge>;
      default:
        return <Badge variant="default">Pending</Badge>;
    }
  };

  const getDensityBadge = (density: string) => {
    switch (density) {
      case 'low':
        return <Badge variant="success">Low</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'high':
        return <Badge variant="danger">High</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const filteredRecords = surveillanceRecords.filter(record => {
    const matchesSearch = record.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.pestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesPestType = pestTypeFilter === 'all' || record.pestType.toLowerCase().includes(pestTypeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPestType;
  });

  const stats = [
    {
      title: 'Active Surveillance Sites',
      value: '47',
      change: '+3 this week',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pest Species Monitored',
      value: '23',
      change: '2 new species',
      icon: Bug,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Alerts',
      value: '4',
      change: '1 outbreak',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Trap Monitoring',
      value: '156',
      change: '89% active',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pest Surveillance</h1>
          <p className="text-gray-600 mt-1">Monitor and track pest populations across agricultural areas</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button icon={Plus}>
            <Link to="/pest-surveillance/new">New Surveillance Record</Link>
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
                placeholder="Search by reference, location, pest type, or scientific name..."
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
              <option value="monitoring">Monitoring</option>
              <option value="active_monitoring">Active Monitoring</option>
              <option value="under_control">Under Control</option>
              <option value="outbreak_alert">Outbreak Alert</option>
            </select>
            <select
              value={pestTypeFilter}
              onChange={(e) => setPestTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Pest Types</option>
              <option value="fruit fly">Fruit Fly</option>
              <option value="aphids">Aphids</option>
              <option value="scale">Scale Insects</option>
              <option value="whitefly">Whitefly</option>
            </select>
            <Button variant="secondary" icon={Filter}>Filter</Button>
            <Button variant="secondary" icon={Download}>Export</Button>
          </div>
        </div>
      </Card>

      {/* Surveillance Records Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pest Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Population Density
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trap Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weather
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {record.reference}
                    </div>
                    <div className="text-xs text-gray-500">{record.date}</div>
                    <div className="text-xs text-gray-400">{record.inspector}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      {record.location}
                    </div>
                    <div className="text-xs text-gray-500">{record.gpsCoordinates}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{record.pestType}</div>
                    <div className="text-xs text-gray-500 italic">{record.scientificName}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {record.affectedCrops.map((crop, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getDensityBadge(record.populationDensity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.trapType}</div>
                    <div className="text-xs text-gray-500">Count: {record.trapCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Thermometer className="w-3 h-3 mr-1" />
                        {record.weatherConditions.temperature}°C
                      </div>
                      <div className="flex items-center">
                        <Droplets className="w-3 h-3 mr-1" />
                        {record.weatherConditions.humidity}%
                      </div>
                      <div className="flex items-center">
                        <Wind className="w-3 h-3 mr-1" />
                        {record.weatherConditions.windSpeed}km/h
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
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
      {filteredRecords.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No surveillance records found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or create a new surveillance record.
            </p>
            <Button icon={Plus}>
              <Link to="/pest-surveillance/new">Create New Surveillance Record</Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bug className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pest Identification</h3>
            <p className="text-gray-600 text-sm">Access pest identification guide and database</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trap Management</h3>
            <p className="text-gray-600 text-sm">Monitor and manage surveillance traps</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Population Trends</h3>
            <p className="text-gray-600 text-sm">Analyze pest population trends and patterns</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Pest Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-red-900">Whitefly Outbreak</p>
                  <p className="text-xs text-red-700">Exuma Agricultural Zone</p>
                </div>
              </div>
              <Badge variant="danger">High</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <Bug className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Fruit Fly Increase</p>
                  <p className="text-xs text-yellow-700">Nassau Agricultural Area</p>
                </div>
              </div>
              <Badge variant="warning">Medium</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-900">Scale Insects Controlled</p>
                  <p className="text-xs text-green-700">Eleuthera Pineapple Farms</p>
                </div>
              </div>
              <Badge variant="success">Low</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Surveillance Coverage</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nassau Region</span>
              <span className="font-semibold">15/18 sites</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Andros Region</span>
              <span className="font-semibold">12/15 sites</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Eleuthera Region</span>
              <span className="font-semibold">8/10 sites</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PestSurveillance;
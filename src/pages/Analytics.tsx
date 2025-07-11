import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Activity, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Users,
  MapPin,
  Truck,
  Bug
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const kpiMetrics = [
    {
      title: 'Total Inspections',
      value: '342',
      change: '+18%',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Compliance Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Average Response Time',
      value: '2.4 days',
      change: '-0.3 days',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Alerts',
      value: '7',
      change: '+2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const inspectionBreakdown = [
    { type: 'Import Inspections', count: 156, percentage: 45.6, color: 'bg-blue-500' },
    { type: 'Farm Inspections', count: 124, percentage: 36.3, color: 'bg-green-500' },
    { type: 'Pest Surveillance', count: 62, percentage: 18.1, color: 'bg-red-500' }
  ];

  const complianceData = [
    { category: 'Import Compliance', rate: 96.8, trend: 'up' },
    { category: 'Farm Compliance', rate: 91.5, trend: 'up' },
    { category: 'Documentation', rate: 94.2, trend: 'stable' },
    { category: 'Safety Standards', rate: 98.1, trend: 'up' }
  ];

  const topPerformers = [
    { name: 'Vinesa Sawyer', inspections: 45, compliance: 98.2, efficiency: 'Excellent' },
    { name: 'Ezra Bartholomew', inspections: 42, compliance: 96.8, efficiency: 'Excellent' },
    { name: 'Yasmin Johnson', inspections: 38, compliance: 94.5, efficiency: 'Good' },
    { name: 'Tamico Nelson', inspections: 35, compliance: 92.1, efficiency: 'Good' }
  ];

  const regionalData = [
    { region: 'Nassau', inspections: 145, compliance: 95.2, alerts: 3 },
    { region: 'Freeport', inspections: 89, compliance: 93.8, alerts: 2 },
    { region: 'Andros', inspections: 67, compliance: 91.4, alerts: 1 },
    { region: 'Eleuthera', inspections: 41, compliance: 96.1, alerts: 1 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEfficiencyBadge = (efficiency: string) => {
    switch (efficiency) {
      case 'Excellent':
        return <Badge variant="success">Excellent</Badge>;
      case 'Good':
        return <Badge variant="info">Good</Badge>;
      case 'Average':
        return <Badge variant="warning">Average</Badge>;
      default:
        return <Badge variant="default">Fair</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into inspection performance and trends</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="secondary" icon={RefreshCw}>
            Refresh
          </Button>
          <Button variant="secondary" icon={Download}>
            Export
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ml-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inspection Trends */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Inspection Trends</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive chart visualization</p>
              <p className="text-sm text-gray-500">Showing inspection volume trends over time</p>
            </div>
          </div>
        </Card>

        {/* Inspection Type Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Inspection Distribution</h3>
            <PieChart className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-4">
            {inspectionBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${item.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-8 h-8 text-gray-400 mx-auto mb-1" />
              <p className="text-sm text-gray-500">Pie chart visualization</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Compliance Analysis */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Analysis</h3>
          <Button variant="secondary" size="sm">
            View Details
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {complianceData.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                {getTrendIcon(item.trend)}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{item.rate}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${item.rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Inspector</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Inspections</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Compliance</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topPerformers.map((performer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{performer.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{performer.inspections}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{performer.compliance}%</td>
                    <td className="px-4 py-3">{getEfficiencyBadge(performer.efficiency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Regional Performance */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Regional Performance</h3>
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Inspections</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Compliance</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Alerts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {regionalData.map((region, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{region.region}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{region.inspections}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{region.compliance}%</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        region.alerts === 0 ? 'bg-green-100 text-green-800' :
                        region.alerts <= 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {region.alerts}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <Activity className="w-5 h-5 text-green-600" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-900">Import inspection completed</p>
              <p className="text-xs text-blue-700">Mango shipment from Jamaica - Approved</p>
              <p className="text-xs text-blue-600">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div className="flex-shrink-0">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-900">Farm inspection scheduled</p>
              <p className="text-xs text-green-700">Green Valley Farms - Follow-up required</p>
              <p className="text-xs text-green-600">4 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-red-50 rounded-lg">
            <div className="flex-shrink-0">
              <Bug className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-red-900">Pest alert issued</p>
              <p className="text-xs text-red-700">Fruit fly population spike detected in Nassau</p>
              <p className="text-xs text-red-600">6 hours ago</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Premium Features Notice */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center">
          <Target className="w-8 h-8 text-purple-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Advanced Analytics Available</h3>
            <p className="text-gray-700 text-sm mb-3">
              Unlock advanced analytics features including predictive modeling, custom dashboards, 
              real-time alerts, and detailed performance insights with our premium subscription.
            </p>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
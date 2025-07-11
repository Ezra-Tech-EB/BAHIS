import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Truck,
  MapPin,
  Bug,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedType, setSelectedType] = useState('all');

  const reportTypes = [
    {
      id: 'inspection-summary',
      title: 'Inspection Summary Report',
      description: 'Comprehensive overview of all inspection activities',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      lastGenerated: '2025-01-20',
      frequency: 'Weekly'
    },
    {
      id: 'import-analysis',
      title: 'Import Inspection Analysis',
      description: 'Detailed analysis of import inspection trends and compliance',
      icon: Truck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      lastGenerated: '2025-01-19',
      frequency: 'Monthly'
    },
    {
      id: 'farm-compliance',
      title: 'Farm Compliance Report',
      description: 'Farm inspection compliance rates and follow-up status',
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      lastGenerated: '2025-01-18',
      frequency: 'Monthly'
    },
    {
      id: 'pest-surveillance',
      title: 'Pest Surveillance Report',
      description: 'Pest population trends and outbreak analysis',
      icon: Bug,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      lastGenerated: '2025-01-17',
      frequency: 'Bi-weekly'
    },
    {
      id: 'performance-metrics',
      title: 'Performance Metrics Report',
      description: 'Inspector performance and productivity metrics',
      icon: BarChart3,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      lastGenerated: '2025-01-16',
      frequency: 'Monthly'
    },
    {
      id: 'regulatory-compliance',
      title: 'Regulatory Compliance Report',
      description: 'Compliance with national and international standards',
      icon: CheckCircle,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      lastGenerated: '2025-01-15',
      frequency: 'Quarterly'
    }
  ];

  const quickStats = [
    {
      title: 'Reports Generated',
      value: '47',
      change: '+12 this month',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Scheduled Reports',
      value: '8',
      change: '3 due today',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Data Sources',
      value: '12',
      change: 'All active',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Report Recipients',
      value: '23',
      change: '5 new subscribers',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentReports = [
    {
      id: '1',
      title: 'Weekly Inspection Summary',
      type: 'Inspection Summary',
      generatedDate: '2025-01-20',
      generatedBy: 'System',
      status: 'completed',
      recipients: 8,
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Import Compliance Analysis - January',
      type: 'Import Analysis',
      generatedDate: '2025-01-19',
      generatedBy: 'Vinesa Sawyer',
      status: 'completed',
      recipients: 12,
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Pest Outbreak Alert - Fruit Flies',
      type: 'Pest Surveillance',
      generatedDate: '2025-01-18',
      generatedBy: 'System',
      status: 'completed',
      recipients: 15,
      size: '956 KB'
    },
    {
      id: '4',
      title: 'Farm Inspection Follow-ups',
      type: 'Farm Compliance',
      generatedDate: '2025-01-17',
      generatedBy: 'Ezra Bartholomew',
      status: 'processing',
      recipients: 6,
      size: 'Processing...'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'processing':
        return <Badge variant="warning">Processing</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      default:
        return <Badge variant="default">Pending</Badge>;
    }
  };

  const generateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`);
    // Here you would trigger report generation
  };

  const downloadReport = (reportId: string) => {
    console.log(`Downloading report: ${reportId}`);
    // Here you would trigger report download
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and manage inspection reports and analytics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <Button variant="secondary" icon={Filter}>
            Filter Reports
          </Button>
          <Button icon={FileText}>
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
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

      {/* Report Types */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Reports</h2>
          <div className="flex gap-2">
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${report.bgColor}`}>
                  <report.icon className={`w-6 h-6 ${report.color}`} />
                </div>
                <Badge variant="info">{report.frequency}</Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{report.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Last generated: {report.lastGenerated}</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => generateReport(report.id)}
                >
                  Generate
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  icon={Download}
                  onClick={() => downloadReport(report.id)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Reports */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
          <Button variant="secondary" icon={Calendar}>
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.generatedDate}</div>
                    <div className="text-xs text-gray-500">by {report.generatedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(report.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.recipients} users</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{report.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {report.status === 'completed' && (
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => downloadReport(report.id)}
                        >
                          <Download className="w-4 h-4" />
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

      {/* Analytics Dashboard Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Inspection Trends</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would appear here</p>
              <p className="text-sm text-gray-500">Showing inspection trends over time</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Compliance Distribution</h3>
            <PieChart className="w-5 h-5 text-blue-600" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Pie chart would appear here</p>
              <p className="text-sm text-gray-500">Showing compliance rate distribution</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Report Builder</h3>
            <p className="text-gray-600 text-sm">Create custom reports with specific criteria and filters</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Reports</h3>
            <p className="text-gray-600 text-sm">Set up automated report generation and distribution</p>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">Access detailed analytics and data visualization tools</p>
          </div>
        </Card>
      </div>

      {/* Premium Features Notice */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <div className="flex items-center">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Premium Features Available</h3>
            <p className="text-gray-700 text-sm mb-3">
              Unlock advanced reporting features including custom report builder, automated scheduling, 
              and detailed analytics dashboards with our premium subscription.
            </p>
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
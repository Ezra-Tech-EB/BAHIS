import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, Camera, MapPin, Upload, Plus, Trash2, AlertTriangle, CheckCircle, X } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface FarmInspectionForm {
  // Basic Information
  inspectionDate: string;
  inspectionTime: string;
  farmId: string;
  farmName: string;
  farmOwner: string;
  location: string;
  cropTypes: string[];
  
  // Sanitation Checklist
  sanitation: {
    equipmentClean: boolean;
    storageProper: boolean;
    wasteManagement: boolean;
    waterQuality: boolean;
    facilityHygiene: boolean;
  };
  
  // Pest Presence Assessment
  pestPresence: {
    visualInspection: boolean;
    trapMonitoring: boolean;
    pestIdentified: string[];
    populationLevel: 'none' | 'low' | 'medium' | 'high';
    affectedAreas: string[];
  };
  
  // Compliance Checks
  compliance: {
    pesticideRecords: boolean;
    workerSafety: boolean;
    organicStandards: boolean;
    certificationValid: boolean;
    recordKeeping: boolean;
    equipmentMaintenance: boolean;
  };
  
  // Soil and Plant Health
  soilHealth: {
    soilCondition: 'excellent' | 'good' | 'fair' | 'poor';
    drainageAdequate: boolean;
    erosionControl: boolean;
    organicMatter: boolean;
  };
  
  // Infrastructure Assessment
  infrastructure: {
    irrigationSystem: 'excellent' | 'good' | 'fair' | 'poor';
    storageConditions: 'excellent' | 'good' | 'fair' | 'poor';
    equipmentCondition: 'excellent' | 'good' | 'fair' | 'poor';
    accessRoads: 'excellent' | 'good' | 'fair' | 'poor';
  };
  
  // Additional Information
  recommendations: string;
  followUpRequired: boolean;
  followUpDate?: string;
  notes: string;
}

const NewFarmInspection: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FarmInspectionForm>();
  const [photos, setPhotos] = useState<File[]>([]);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [identifiedPests, setIdentifiedPests] = useState<string[]>([]);
  const [affectedAreas, setAffectedAreas] = useState<string[]>([]);

  const watchFollowUpRequired = watch('followUpRequired');

  const cropOptions = [
    'Tomatoes', 'Peppers', 'Citrus', 'Mangoes', 'Pineapples', 'Avocados', 
    'Bananas', 'Plantains', 'Onions', 'Carrots', 'Lettuce', 'Cabbage',
    'Sweet Potatoes', 'Cassava', 'Corn', 'Peas', 'Herbs', 'Others'
  ];

  const pestOptions = [
    'Fruit Fly', 'Aphids', 'Scale Insects', 'Mealybugs', 'Whitefly', 'Thrips', 'Spider Mites', 'Caterpillars', 'Beetles', 'Nematodes', 'Fungal Diseases', 'Bacterial Diseases',
    'Viral Diseases', 'Weeds', 'Others'
  ];

  const areaOptions = [
    'Greenhouse 1', 'Greenhouse 2', 'Field A', 'Field B', 'Field C',
    'Storage Area', 'Processing Area', 'Nursery', 'Equipment Shed',
    'Compost Area', 'Perimeter', 'Others'
  ];

  const onSubmit = (data: FarmInspectionForm) => {
    // Generate reference number
    const referenceNumber = `FARM-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
    
    // Calculate compliance score
    const complianceChecks = Object.values(data.compliance);
    const sanitationChecks = Object.values(data.sanitation);
    const allChecks = [...complianceChecks, ...sanitationChecks];
    const passedChecks = allChecks.filter(check => check === true).length;
    const complianceScore = Math.round((passedChecks / allChecks.length) * 100);
    
    console.log('Submitting farm inspection:', { 
      ...data, 
      referenceNumber,
      complianceScore,
      cropTypes: selectedCrops,
      pestPresence: {
        ...data.pestPresence,
        pestIdentified: identifiedPests,
        affectedAreas: affectedAreas
      },
      photos, 
      gpsLocation 
    });
    
    // Here you would typically save to Supabase
    // For now, we'll just navigate back
    navigate('/farm-inspections');
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotos(prev => [...prev, ...files]);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const toggleCrop = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) 
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    );
  };

  const togglePest = (pest: string) => {
    setIdentifiedPests(prev => 
      prev.includes(pest) 
        ? prev.filter(p => p !== pest)
        : [...prev, pest]
    );
  };

  const toggleArea = (area: string) => {
    setAffectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Farm Inspection</h1>
        <p className="text-gray-600 mt-1">Complete the comprehensive farm inspection checklist</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Date *
              </label>
              <input
                type="date"
                {...register('inspectionDate', { required: 'Inspection date is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.inspectionDate && (
                <p className="text-red-600 text-sm mt-1">{errors.inspectionDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inspection Time *
              </label>
              <input
                type="time"
                {...register('inspectionTime', { required: 'Inspection time is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.inspectionTime && (
                <p className="text-red-600 text-sm mt-1">{errors.inspectionTime.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm ID/Registration Number *
              </label>
              <input
                type="text"
                {...register('farmId', { required: 'Farm ID is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., FARM-2025-001"
              />
              {errors.farmId && (
                <p className="text-red-600 text-sm mt-1">{errors.farmId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Name *
              </label>
              <input
                type="text"
                {...register('farmName', { required: 'Farm name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Farm name"
              />
              {errors.farmName && (
                <p className="text-red-600 text-sm mt-1">{errors.farmName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Owner *
              </label>
              <input
                type="text"
                {...register('farmOwner', { required: 'Farm owner is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Owner name"
              />
              {errors.farmOwner && (
                <p className="text-red-600 text-sm mt-1">{errors.farmOwner.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Farm location"
                />
                <Button type="button" variant="secondary" icon={MapPin} onClick={getCurrentLocation}>
                  GPS
                </Button>
              </div>
              {gpsLocation && (
                <p className="text-sm text-green-600 mt-1">
                  GPS: {gpsLocation.lat.toFixed(6)}, {gpsLocation.lng.toFixed(6)}
                </p>
              )}
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Crop Types Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Crop Types Grown *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {cropOptions.map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => toggleCrop(crop)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    selectedCrops.includes(crop)
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
            {selectedCrops.length === 0 && (
              <p className="text-red-600 text-sm mt-1">Please select at least one crop type</p>
            )}
          </div>
        </Card>

        {/* Sanitation Checklist */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sanitation Assessment</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('sanitation.equipmentClean')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Equipment and Tools Clean and Sanitized
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('sanitation.storageProper')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Proper Storage Conditions Maintained
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('sanitation.wasteManagement')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Adequate Waste Management System
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('sanitation.waterQuality')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Water Quality Meets Standards
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('sanitation.facilityHygiene')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Overall Facility Hygiene Acceptable
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Pest Presence Assessment */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pest Presence Assessment</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('pestPresence.visualInspection')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Visual Inspection Completed
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('pestPresence.trapMonitoring')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Trap Monitoring Conducted
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Population Level
              </label>
              <select
                {...register('pestPresence.populationLevel')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">No Pests Detected</option>
                <option value="low">Low Population</option>
                <option value="medium">Medium Population</option>
                <option value="high">High Population</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Identified Pests (if any)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {pestOptions.map((pest) => (
                  <button
                    key={pest}
                    type="button"
                    onClick={() => togglePest(pest)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      identifiedPests.includes(pest)
                        ? 'bg-red-100 border-red-300 text-red-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Affected Areas (if any)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {areaOptions.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      affectedAreas.includes(area)
                        ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Compliance Checks */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('compliance.pesticideRecords')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Pesticide Application Records Complete
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('compliance.workerSafety')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Worker Safety Protocols Followed
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('compliance.organicStandards')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Organic Standards Compliance (if applicable)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('compliance.certificationValid')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Certifications Valid and Current
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('compliance.recordKeeping')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Adequate Record Keeping System
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('compliance.equipmentMaintenance')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Equipment Properly Maintained
              </label>
            </div>
          </div>
        </Card>

        {/* Soil Health */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Soil Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soil Condition
              </label>
              <select
                {...register('soilHealth.soilCondition')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('soilHealth.drainageAdequate')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Adequate Drainage System
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('soilHealth.erosionControl')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Erosion Control Measures in Place
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('soilHealth.organicMatter')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Adequate Organic Matter Content
              </label>
            </div>
          </div>
        </Card>

        {/* Infrastructure Assessment */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Irrigation System
              </label>
              <select
                {...register('infrastructure.irrigationSystem')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Storage Conditions
              </label>
              <select
                {...register('infrastructure.storageConditions')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Condition
              </label>
              <select
                {...register('infrastructure.equipmentCondition')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Roads
              </label>
              <select
                {...register('infrastructure.accessRoads')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Photos and Documentation */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos and Documentation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload photos or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
              {photos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">{photos.length} photo(s) selected</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative bg-gray-100 rounded-lg p-2">
                        <span className="text-xs text-gray-700 block truncate">{photo.name}</span>
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Recommendations and Follow-up */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations and Follow-up</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recommendations
              </label>
              <textarea
                {...register('recommendations')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide specific recommendations for improvement..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('followUpRequired')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Follow-up Inspection Required
              </label>
            </div>

            {watchFollowUpRequired && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  {...register('followUpDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional observations or notes..."
              />
            </div>
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/farm-inspections')}
          >
            Cancel
          </Button>
          <Button type="submit" icon={Save}>
            Save Farm Inspection
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewFarmInspection;
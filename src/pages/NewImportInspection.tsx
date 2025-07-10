import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, Camera, MapPin, Upload, Plus, Trash2 } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface Commodity {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface ImportInspectionForm {
  // Inspection Info & Basic Details
  inspectionDate: string;
  inspectionTime: string;
  location: string;
  importer: string;
  portOfEntry: string;
  
  // Consignment Details (now handled separately for commodities)
  originCountry: string;
  
  // Compliance Checks
  importPermit: boolean;
  phytosanitaryCertificate: boolean;
  pestInspection: boolean;
  documentationComplete: boolean;
  quarantineRequired: boolean;
  
  // Phytosanitary Actions
  phytosanitaryActions: {
    detention: boolean;
    reconfiguration: boolean;
    treatment: boolean;
    destroy: boolean;
    reExport: boolean;
    others: boolean;
    othersText: string;
  };
  
  // Additional Info
  notes: string;
}

const NewImportInspection: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ImportInspectionForm>();
  const [photos, setPhotos] = useState<File[]>([]);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [commodities, setCommodities] = useState<Commodity[]>([
    { id: '1', name: '', quantity: 0, unit: '' }
  ]);

  const watchOthers = watch('phytosanitaryActions.others');

  const onSubmit = (data: ImportInspectionForm) => {
    // Generate reference number
    const referenceNumber = `IMP-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
    
    console.log('Submitting inspection:', { 
      ...data, 
      referenceNumber, 
      commodities, 
      photos, 
      gpsLocation 
    });
    
    // Here you would typically save to Supabase
    // For now, we'll just navigate back
    navigate('/import-inspections');
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

  const addCommodity = () => {
    const newCommodity: Commodity = {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unit: ''
    };
    setCommodities([...commodities, newCommodity]);
  };

  const removeCommodity = (id: string) => {
    if (commodities.length > 1) {
      setCommodities(commodities.filter(c => c.id !== id));
    }
  };

  const updateCommodity = (id: string, field: keyof Commodity, value: string | number) => {
    setCommodities(commodities.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Import Inspection</h1>
        <p className="text-gray-600 mt-1">Complete the inspection form for incoming shipments</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Inspection Information & Basic Details */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inspection Information</h2>
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
                Importer *
              </label>
              <input
                type="text"
                {...register('importer', { required: 'Importer is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company name"
              />
              {errors.importer && (
                <p className="text-red-600 text-sm mt-1">{errors.importer.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Port of Entry *
              </label>
              <select
                {...register('portOfEntry', { required: 'Port of entry is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select port</option>
                <option value="Nassau">Nassau</option>
                <option value="Freeport">Freeport</option>
                <option value="Freeport">Abaco</option>
                <option value="Marsh Harbour">Marsh Harbour</option>
                <option value="Exuma">Exuma</option>
              </select>
              {errors.portOfEntry && (
                <p className="text-red-600 text-sm mt-1">{errors.portOfEntry.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Inspection location"
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
        </Card>

        {/* Consignment Details */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Consignment Details</h2>
            <Button type="button" variant="secondary" icon={Plus} onClick={addCommodity}>
              Add Commodity
            </Button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origin Country *
            </label>
            <input
              type="text"
              {...register('originCountry', { required: 'Origin country is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Jamaica"
            />
            {errors.originCountry && (
              <p className="text-red-600 text-sm mt-1">{errors.originCountry.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-800">Commodities</h3>
            {commodities.map((commodity, index) => (
              <div key={commodity.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Commodity {index + 1}</span>
                  {commodities.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => removeCommodity(commodity.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Commodity Name *
                    </label>
                    <input
                      type="text"
                      value={commodity.name}
                      onChange={(e) => updateCommodity(commodity.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Mangoes"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={commodity.quantity}
                      onChange={(e) => updateCommodity(commodity.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit *
                    </label>
                    <select
                      value={commodity.unit}
                      onChange={(e) => updateCommodity(commodity.id, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select unit</option>
                      <option value="kg">Kilograms (kg)</option>
                      <option value="lbs">Pounds (lbs)</option>
                      <option value="tons">Tons</option>
                      <option value="boxes">Boxes</option>
                      <option value="tons">Bags</option>
                      <option value="boxes">Pallets</option>
                      <option value="containers">Containers</option>
                      <option value="containers">Each</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Checks */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Checks</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('importPermit')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Import Permit Present and Valid
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('phytosanitaryCertificate')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Phytosanitary Certificate Present and Valid
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('pestInspection')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Pest Inspection Completed
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('documentationComplete')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                All Documentation Complete
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('quarantineRequired')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Quarantine Required
              </label>
            </div>
          </div>
        </Card>

        {/* Phytosanitary Actions */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Phytosanitary Actions Taken</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('phytosanitaryActions.detention')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Detention
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('phytosanitaryActions.reconfiguration')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Reconfiguration
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('phytosanitaryActions.treatment')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Treatment
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('phytosanitaryActions.destroy')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Destroy
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('phytosanitaryActions.reExport')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Re-export
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('phytosanitaryActions.others')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Others
                </label>
              </div>
            </div>

            {watchOthers && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specify Other Actions
                </label>
                <textarea
                  {...register('phytosanitaryActions.othersText')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please specify other phytosanitary actions taken..."
                />
              </div>
            )}
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
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{photos.length} photo(s) selected</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {photos.map((photo, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {photo.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                {...register('notes')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional observations, findings, or notes about the inspection..."
              />
            </div>
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/import-inspections')}
          >
            Cancel
          </Button>
          <Button type="submit" icon={Save}>
            Save Inspection
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewImportInspection;
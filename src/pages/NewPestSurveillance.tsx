import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, Camera, MapPin, Plus, X, Thermometer, Droplets, Wind } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface PestSurveillanceForm {
  // Basic Information
  observationDate: string;
  observationTime: string;
  location: string;
  
  // Pest Information
  pestType: string;
  scientificName: string;
  populationDensity: 'none' | 'low' | 'medium' | 'high';
  affectedCrops: string[];
  
  // Trap Information
  trapType: string;
  trapCount: number;
  trapLocation: string;
  
  // Environmental Conditions
  weatherConditions: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: boolean;
    cloudCover: 'clear' | 'partly_cloudy' | 'overcast';
  };
  
  // Observations
  visualSigns: string[];
  damageAssessment: 'none' | 'minimal' | 'moderate' | 'severe';
  distributionPattern: 'isolated' | 'scattered' | 'widespread';
  
  // Additional Information
  notes: string;
  controlMeasuresRecommended: string[];
  followUpRequired: boolean;
  followUpDate?: string;
}

const NewPestSurveillance: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<PestSurveillanceForm>();
  const [photos, setPhotos] = useState<File[]>([]);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedSigns, setSelectedSigns] = useState<string[]>([]);
  const [selectedControls, setSelectedControls] = useState<string[]>([]);

  const watchFollowUpRequired = watch('followUpRequired');

  const cropOptions = [
    'Tomatoes', 'Peppers', 'Citrus', 'Mangoes', 'Pineapples', 'Avocados', 
    'Bananas', 'Plantains', 'Onions', 'Carrots', 'Lettuce', 'Cabbage',
    'Sweet Potatoes', 'Cassava', 'Corn', 'Peas', 'Herbs', 'Others'
  ];

  const visualSignsOptions = [
    'Leaf damage', 'Fruit damage', 'Stem damage', 'Root damage',
    'Wilting', 'Yellowing', 'Stunted growth', 'Holes in leaves',
    'Webbing', 'Honeydew', 'Sooty mold', 'Galls', 'Others'
  ];

  const controlMeasuresOptions = [
    'Chemical treatment', 'Biological control', 'Cultural practices',
    'Quarantine measures', 'Removal of infected plants', 'Trap deployment',
    'Monitoring increase', 'Farmer education', 'Others'
  ];

  const onSubmit = (data: PestSurveillanceForm) => {
    const referenceNumber = `PEST-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
    
    console.log('Submitting pest surveillance:', { 
      ...data, 
      referenceNumber,
      affectedCrops: selectedCrops,
      visualSigns: selectedSigns,
      controlMeasuresRecommended: selectedControls,
      photos, 
      gpsLocation 
    });
    
    navigate('/pest-surveillance');
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

  const toggleSign = (sign: string) => {
    setSelectedSigns(prev => 
      prev.includes(sign) 
        ? prev.filter(s => s !== sign)
        : [...prev, sign]
    );
  };

  const toggleControl = (control: string) => {
    setSelectedControls(prev => 
      prev.includes(control) 
        ? prev.filter(c => c !== control)
        : [...prev, control]
    );
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Pest Surveillance Record</h1>
        <p className="text-gray-600 mt-1">Document pest observations and monitoring data</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observation Date *
              </label>
              <input
                type="date"
                {...register('observationDate', { required: 'Observation date is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.observationDate && (
                <p className="text-red-600 text-sm mt-1">{errors.observationDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observation Time *
              </label>
              <input
                type="time"
                {...register('observationTime', { required: 'Observation time is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.observationTime && (
                <p className="text-red-600 text-sm mt-1">{errors.observationTime.message}</p>
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
                  placeholder="Surveillance location"
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

        {/* Pest Information */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pest Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pest Type *
              </label>
              <input
                type="text"
                {...register('pestType', { required: 'Pest type is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Fruit Fly"
              />
              {errors.pestType && (
                <p className="text-red-600 text-sm mt-1">{errors.pestType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scientific Name
              </label>
              <input
                type="text"
                {...register('scientificName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Ceratitis capitata"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Population Density *
              </label>
              <select
                {...register('populationDensity', { required: 'Population density is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select density</option>
                <option value="none">No Pests Detected</option>
                <option value="low">Low Population</option>
                <option value="medium">Medium Population</option>
                <option value="high">High Population</option>
              </select>
              {errors.populationDensity && (
                <p className="text-red-600 text-sm mt-1">{errors.populationDensity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Damage Assessment
              </label>
              <select
                {...register('damageAssessment')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">No Damage</option>
                <option value="minimal">Minimal Damage</option>
                <option value="moderate">Moderate Damage</option>
                <option value="severe">Severe Damage</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distribution Pattern
              </label>
              <select
                {...register('distributionPattern')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="isolated">Isolated Occurrence</option>
                <option value="scattered">Scattered Distribution</option>
                <option value="widespread">Widespread Distribution</option>
              </select>
            </div>
          </div>

          {/* Affected Crops */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Affected Crops
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {cropOptions.map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => toggleCrop(crop)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    selectedCrops.includes(crop)
                      ? 'bg-red-100 border-red-300 text-red-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Signs */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Visual Signs Observed
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {visualSignsOptions.map((sign) => (
                <button
                  key={sign}
                  type="button"
                  onClick={() => toggleSign(sign)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    selectedSigns.includes(sign)
                      ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {sign}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Trap Information */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trap Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trap Type
              </label>
              <select
                {...register('trapType')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select trap type</option>
                <option value="McPhail Trap">McPhail Trap</option>
                <option value="Yellow Sticky Trap">Yellow Sticky Trap</option>
                <option value="Blue Sticky Trap">Blue Sticky Trap</option>
                <option value="Pheromone Trap">Pheromone Trap</option>
                <option value="Light Trap">Light Trap</option>
                <option value="Pitfall Trap">Pitfall Trap</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trap Count
              </label>
              <input
                type="number"
                {...register('trapCount')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trap Location
              </label>
              <input
                type="text"
                {...register('trapLocation')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Specific trap location"
              />
            </div>
          </div>
        </Card>

        {/* Environmental Conditions */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Environmental Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Thermometer className="inline w-4 h-4 mr-1" />
                Temperature (°C)
              </label>
              <input
                type="number"
                {...register('weatherConditions.temperature')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Droplets className="inline w-4 h-4 mr-1" />
                Humidity (%)
              </label>
              <input
                type="number"
                {...register('weatherConditions.humidity')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="70"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Wind className="inline w-4 h-4 mr-1" />
                Wind Speed (km/h)
              </label>
              <input
                type="number"
                {...register('weatherConditions.windSpeed')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cloud Cover
              </label>
              <select
                {...register('weatherConditions.cloudCover')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="clear">Clear</option>
                <option value="partly_cloudy">Partly Cloudy</option>
                <option value="overcast">Overcast</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('weatherConditions.precipitation')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Precipitation Present
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Control Measures */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Control Measures</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {controlMeasuresOptions.map((control) => (
              <button
                key={control}
                type="button"
                onClick={() => toggleControl(control)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  selectedControls.includes(control)
                    ? 'bg-green-100 border-green-300 text-green-800'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {control}
              </button>
            ))}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                {...register('notes')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Additional observations, environmental factors, or other relevant information..."
              />
            </div>
          </div>
        </Card>

        {/* Follow-up */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Follow-up</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('followUpRequired')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                Follow-up Surveillance Required
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
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/pest-surveillance')}
          >
            Cancel
          </Button>
          <Button type="submit" icon={Save}>
            Save Surveillance Record
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPestSurveillance;
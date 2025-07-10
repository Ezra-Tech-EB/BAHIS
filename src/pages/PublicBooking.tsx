import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, MapPin, User, Phone, Mail, FileText, Truck, Building, Send, CheckCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface BookingForm {
  // Contact Information
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  
  // Inspection Details
  inspectionType: 'import' | 'farm';
  preferredDate: string;
  preferredTime: string;
  alternativeDate?: string;
  alternativeTime?: string;
  
  // Import Inspection Specific
  commodity?: string;
  originCountry?: string;
  quantity?: number;
  unit?: string;
  portOfEntry?: string;
  
  // Farm Inspection Specific
  farmName?: string;
  farmLocation?: string;
  cropTypes?: string[];
  farmSize?: number;
  
  // Additional Information
  urgency: 'routine' | 'urgent' | 'emergency';
  specialRequirements?: string;
  additionalNotes?: string;
}

const PublicBooking: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<BookingForm>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const inspectionType = watch('inspectionType');

  const cropOptions = [
    'Tomatoes', 'Peppers', 'Citrus', 'Mangoes', 'Pineapples', 'Avocados', 
    'Bananas', 'Plantains', 'Onions', 'Carrots', 'Lettuce', 'Cabbage',
    'Sweet Potatoes', 'Cassava', 'Corn', 'Peas', 'Herbs', 'Others'
  ];

  const onSubmit = (data: BookingForm) => {
    // Generate booking reference
    const bookingRef = `BOOK-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
    
    const bookingData = {
      ...data,
      cropTypes: selectedCrops,
      bookingReference: bookingRef,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    console.log('Booking submitted:', bookingData);
    
    // Here you would typically save to Supabase
    // For now, we'll just show success message
    setIsSubmitted(true);
  };

  const toggleCrop = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop) 
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your inspection booking has been submitted successfully. You will receive a confirmation email shortly with your booking reference number.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>What's next?</strong><br />
              Our team will review your booking and assign an inspector. You'll be contacted within 24-48 hours to confirm the appointment details.
            </p>
          </div>
          <Button onClick={() => setIsSubmitted(false)} className="w-full">
            Submit Another Booking
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/BAHFSA APP.png" 
            alt="BAHFSA Logo" 
            className="mx-auto h-24 w-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book an Inspection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your import or farm inspection with the Bahamas Agricultural Health & Food Safety Authority. 
            Our certified inspectors will ensure compliance with all regulations.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Information */}
          <Card>
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(242) 000-0000"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  {...register('company')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name (optional)"
                />
              </div>
            </div>
          </Card>

          {/* Inspection Type */}
          <Card>
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Inspection Type</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="relative">
                <input
                  type="radio"
                  value="import"
                  {...register('inspectionType', { required: 'Please select inspection type' })}
                  className="sr-only"
                />
                <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  inspectionType === 'import' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center mb-3">
                    <Truck className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Import Inspection</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    For incoming shipments of agricultural products, plants, or plant materials requiring phytosanitary inspection.
                  </p>
                </div>
              </label>

              <label className="relative">
                <input
                  type="radio"
                  value="farm"
                  {...register('inspectionType', { required: 'Please select inspection type' })}
                  className="sr-only"
                />
                <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  inspectionType === 'farm' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center mb-3">
                    <Building className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Farm Inspection</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    For agricultural facilities, farms, or production sites requiring compliance verification and pest monitoring.
                  </p>
                </div>
              </label>
            </div>
            {errors.inspectionType && (
              <p className="text-red-600 text-sm mt-2">{errors.inspectionType.message}</p>
            )}
          </Card>

          {/* Scheduling */}
          <Card>
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Preferred Schedule</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  {...register('preferredDate', { required: 'Preferred date is required' })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.preferredDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.preferredDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  {...register('preferredTime', { required: 'Preferred time is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
                {errors.preferredTime && (
                  <p className="text-red-600 text-sm mt-1">{errors.preferredTime.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternative Date
                </label>
                <input
                  type="date"
                  {...register('alternativeDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternative Time
                </label>
                <select
                  {...register('alternativeTime')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level *
              </label>
              <select
                {...register('urgency', { required: 'Please select urgency level' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select urgency</option>
                <option value="routine">Routine (5-7 business days)</option>
                <option value="urgent">Urgent (2-3 business days)</option>
                <option value="emergency">Emergency (Within 24 hours)</option>
              </select>
              {errors.urgency && (
                <p className="text-red-600 text-sm mt-1">{errors.urgency.message}</p>
              )}
            </div>
          </Card>

          {/* Import Inspection Details */}
          {inspectionType === 'import' && (
            <Card>
              <div className="flex items-center mb-6">
                <Truck className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Import Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commodity *
                  </label>
                  <input
                    type="text"
                    {...register('commodity', { required: 'Commodity is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Mangoes, Citrus fruits"
                  />
                  {errors.commodity && (
                    <p className="text-red-600 text-sm mt-1">{errors.commodity.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin Country *
                  </label>
                  <input
                    type="text"
                    {...register('originCountry', { required: 'Origin country is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Jamaica, USA"
                  />
                  {errors.originCountry && (
                    <p className="text-red-600 text-sm mt-1">{errors.originCountry.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    {...register('quantity', { required: 'Quantity is required', min: 1 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="1"
                  />
                  {errors.quantity && (
                    <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit *
                  </label>
                  <select
                    {...register('unit', { required: 'Unit is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select unit</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="tons">Tons</option>
                    <option value="boxes">Boxes</option>
                    <option value="bags">Bags</option>
                    <option value="pallets">Pallets</option>
                    <option value="containers">Containers</option>
                    <option value="each">Each</option>
                  </select>
                  {errors.unit && (
                    <p className="text-red-600 text-sm mt-1">{errors.unit.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Port of Entry *
                  </label>
                  <select
                    {...register('portOfEntry', { required: 'Port of entry is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select port</option>
                    <option value="Nassau">Nassau</option>
                    <option value="Freeport">Freeport</option>
                    <option value="Abaco">Abaco</option>
                    <option value="Marsh Harbour">Marsh Harbour</option>
                    <option value="Exuma">Exuma</option>
                  </select>
                  {errors.portOfEntry && (
                    <p className="text-red-600 text-sm mt-1">{errors.portOfEntry.message}</p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Farm Inspection Details */}
          {inspectionType === 'farm' && (
            <Card>
              <div className="flex items-center mb-6">
                <Building className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Farm Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Name *
                  </label>
                  <input
                    type="text"
                    {...register('farmName', { required: 'Farm name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter farm name"
                  />
                  {errors.farmName && (
                    <p className="text-red-600 text-sm mt-1">{errors.farmName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Size (acres)
                  </label>
                  <input
                    type="number"
                    {...register('farmSize', { min: 0.1 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.0"
                    step="0.1"
                    min="0.1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Location *
                  </label>
                  <input
                    type="text"
                    {...register('farmLocation', { required: 'Farm location is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter complete farm address"
                  />
                  {errors.farmLocation && (
                    <p className="text-red-600 text-sm mt-1">{errors.farmLocation.message}</p>
                  )}
                </div>
              </div>

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
          )}

          {/* Additional Information */}
          <Card>
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  {...register('specialRequirements')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special requirements or accommodations needed for the inspection..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  {...register('additionalNotes')}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional information that would help us prepare for your inspection..."
                />
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" icon={Send} size="lg" className="px-12">
              Submit Booking Request
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              By submitting this form, you agree to our terms and conditions. 
              You will receive a confirmation email with your booking reference number.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicBooking;
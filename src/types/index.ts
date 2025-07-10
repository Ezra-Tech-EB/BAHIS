export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'inspector' | 'supervisor' | 'lab_technician';
  created_at: string;
}

export interface Farm {
  id: string;
  name: string;
  owner: string;
  location: string;
  gps_coordinates: {
    latitude: number;
    longitude: number;
  };
  registration_number: string;
  crop_types: string[];
  created_at: string;
}

export interface ImportInspection {
  id: string;
  reference_number: string;
  inspector_id: string;
  consignment_details: {
    origin_country: string;
    commodity: string;
    quantity: number;
    unit: string;
    importer: string;
    port_of_entry: string;
  };
  inspection_info: {
    date: string;
    time: string;
    location: string;
    gps_coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  compliance_checks: {
    phytosanitary_certificate: boolean;
    pest_inspection: boolean;
    documentation_complete: boolean;
    quarantine_required: boolean;
  };
  phytosanitary_actions: string[];
  photos: string[];
  digital_signature: string;
  status: 'pending' | 'approved' | 'rejected' | 'quarantine';
  created_at: string;
}

export interface FarmInspection {
  id: string;
  reference_number: string;
  farm_id: string;
  inspector_id: string;
  inspection_date: string;
  checklist: {
    sanitation: {
      equipment_clean: boolean;
      storage_proper: boolean;
      waste_management: boolean;
    };
    pest_presence: {
      visual_inspection: boolean;
      trap_monitoring: boolean;
      pest_identified: string[];
    };
    compliance: {
      pesticide_records: boolean;
      worker_safety: boolean;
      organic_standards: boolean;
    };
  };
  photos: string[];
  gps_coordinates: {
    latitude: number;
    longitude: number;
  };
  recommendations: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  status: 'completed' | 'follow_up_required' | 'non_compliant';
  created_at: string;
}

export interface PestSurveillance {
  id: string;
  reference_number: string;
  inspector_id: string;
  observation_date: string;
  location: string;
  gps_coordinates: {
    latitude: number;
    longitude: number;
  };
  pest_type: string;
  affected_crops: string[];
  population_density: 'low' | 'medium' | 'high';
  trap_results?: {
    trap_type: string;
    count: number;
  };
  photos: string[];
  notes: string;
  created_at: string;
}

export interface PestProfile {
  id: string;
  name: string;
  scientific_name: string;
  description: string;
  host_plants: string[];
  symptoms: string[];
  control_measures: string[];
  photos: string[];
  created_at: string;
}
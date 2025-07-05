export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'doctor' | 'admin';
  avatar?: string;
}

export interface Doctor extends User {
  specialty: string;
  experience: number;
  rating: number;
  location: string;
  bio: string;
  fees: number;
  availability: string[];
  approved: boolean;
  qualifications: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  documents?: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'doctor';
  specialty?: string;
  experience?: number;
  location?: string;
  bio?: string;
  qualifications?: string[];
}
import { User, Doctor, Appointment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'admin@docspot.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doc1',
    email: 'dr.smith@example.com',
    name: 'Dr. Sarah Smith',
    role: 'doctor',
    specialty: 'Cardiology',
    experience: 12,
    rating: 4.8,
    location: 'Downtown Medical Center',
    bio: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
    fees: 200,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    approved: true,
    qualifications: ['MBBS', 'MD Cardiology', 'FACC'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'doc2',
    email: 'dr.johnson@example.com',
    name: 'Dr. Michael Johnson',
    role: 'doctor',
    specialty: 'Dermatology',
    experience: 8,
    rating: 4.6,
    location: 'Skin Care Clinic',
    bio: 'Board-certified dermatologist with expertise in skin disorders and cosmetic procedures.',
    fees: 180,
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    approved: true,
    qualifications: ['MBBS', 'MD Dermatology'],
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'doc3',
    email: 'dr.wilson@example.com',
    name: 'Dr. Emily Wilson',
    role: 'doctor',
    specialty: 'Pediatrics',
    experience: 15,
    rating: 4.9,
    location: 'Children\'s Hospital',
    bio: 'Pediatric specialist with over 15 years of experience caring for children and adolescents.',
    fees: 160,
    availability: ['Tue', 'Thu', 'Fri', 'Sat'],
    approved: true,
    qualifications: ['MBBS', 'MD Pediatrics', 'DCH'],
    avatar: 'https://images.unsplash.com/photo-1594824388262-82bb6b63f33e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'doc4',
    email: 'dr.brown@example.com',
    name: 'Dr. David Brown',
    role: 'doctor',
    specialty: 'Orthopedics',
    experience: 5,
    rating: 4.3,
    location: 'Bone & Joint Center',
    bio: 'Orthopedic surgeon specializing in sports injuries and joint replacement.',
    fees: 220,
    availability: ['Mon', 'Wed', 'Thu'],
    approved: false,
    qualifications: ['MBBS', 'MS Orthopedics'],
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'app1',
    patientId: '1',
    doctorId: 'doc1',
    patientName: 'John Smith',
    doctorName: 'Dr. Sarah Smith',
    doctorSpecialty: 'Cardiology',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    notes: 'Regular check-up for heart condition'
  },
  {
    id: 'app2',
    patientId: '1',
    doctorId: 'doc2',
    patientName: 'John Smith',
    doctorName: 'Dr. Michael Johnson',
    doctorSpecialty: 'Dermatology',
    date: '2024-01-20',
    time: '2:30 PM',
    status: 'pending',
    notes: 'Skin consultation'
  }
];
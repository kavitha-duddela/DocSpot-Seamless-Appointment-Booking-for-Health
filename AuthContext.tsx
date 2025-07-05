import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, RegisterData } from '../types';
import { mockUsers, mockDoctors } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('docspot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check in regular users first
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      const userWithRole = { ...foundUser, role: foundUser.role as 'customer' | 'doctor' | 'admin' };
      setUser(userWithRole);
      localStorage.setItem('docspot_user', JSON.stringify(userWithRole));
      setLoading(false);
      return true;
    }
    
    // Check in doctors
    const foundDoctor = mockDoctors.find(d => d.email === email);
    if (foundDoctor) {
      setUser(foundDoctor);
      localStorage.setItem('docspot_user', JSON.stringify(foundDoctor));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email) || 
                        mockDoctors.find(d => d.email === userData.email);
    
    if (existingUser) {
      setLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      avatar: `https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face`
    };
    
    if (userData.role === 'doctor') {
      const newDoctor = {
        ...newUser,
        specialty: userData.specialty || 'General Medicine',
        experience: userData.experience || 1,
        rating: 4.5,
        location: userData.location || 'City Center',
        bio: userData.bio || 'Experienced healthcare professional',
        fees: 150,
        availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        approved: false,
        qualifications: userData.qualifications || ['MBBS']
      };
      
      mockDoctors.push(newDoctor);
      setUser(newDoctor);
      localStorage.setItem('docspot_user', JSON.stringify(newDoctor));
    } else {
      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem('docspot_user', JSON.stringify(newUser));
    }
    
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('docspot_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
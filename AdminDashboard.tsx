import React, { useState } from 'react';
import { Users, UserCheck, UserX, Calendar, Stethoscope, CheckCircle, XCircle, Eye } from 'lucide-react';
import { mockDoctors, mockAppointments, mockUsers } from '../../data/mockData';
import { Doctor } from '../../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'appointments'>('overview');

  const pendingDoctors = mockDoctors.filter(doctor => !doctor.approved);
  const approvedDoctors = mockDoctors.filter(doctor => doctor.approved);
  const totalUsers = mockUsers.length + mockDoctors.length;

  const approveDoctor = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    if (doctor) {
      doctor.approved = true;
    }
  };

  const rejectDoctor = (doctorId: string) => {
    const doctorIndex = mockDoctors.findIndex(d => d.id === doctorId);
    if (doctorIndex > -1) {
      mockDoctors.splice(doctorIndex, 1);
    }
  };

  const DoctorApprovalCard = ({ doctor }: { doctor: Doctor }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              <p className="text-gray-600 text-sm">{doctor.experience} years experience</p>
              <p className="text-gray-600 text-sm">{doctor.location}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => approveDoctor(doctor.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-1"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => rejectDoctor(doctor.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-1"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-700 text-sm leading-relaxed">{doctor.bio}</p>
            
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-1">Qualifications:</p>
              <div className="flex flex-wrap gap-1">
                {doctor.qualifications.map((qual, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {qual}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: React.ComponentType<any>;
    color: string;
  }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage doctors, users, and platform operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'doctors', label: 'Doctor Approvals', icon: Stethoscope },
              { id: 'appointments', label: 'Appointments', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={totalUsers}
                icon={Users}
                color="bg-blue-600"
              />
              <StatCard
                title="Approved Doctors"
                value={approvedDoctors.length}
                icon={UserCheck}
                color="bg-green-600"
              />
              <StatCard
                title="Pending Approvals"
                value={pendingDoctors.length}
                icon={UserX}
                color="bg-yellow-600"
              />
              <StatCard
                title="Total Appointments"
                value={mockAppointments.length}
                icon={Calendar}
                color="bg-purple-600"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New doctor registered</p>
                    <p className="text-xs text-gray-600">Dr. David Brown applied for approval</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Appointment booked</p>
                    <p className="text-xs text-gray-600">John Smith booked with Dr. Sarah Smith</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                    <p className="text-xs text-gray-600">Patient account created</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Approvals Tab */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Doctor Approvals ({pendingDoctors.length})
              </h2>
            </div>

            {pendingDoctors.length > 0 ? (
              <div className="space-y-6">
                {pendingDoctors.map(doctor => (
                  <DoctorApprovalCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
                <p className="text-gray-600">All doctor applications have been processed.</p>
              </div>
            )}

            {/* Approved Doctors Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Approved Doctors ({approvedDoctors.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvedDoctors.map(doctor => (
                  <div key={doctor.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <StatCard
                title="Total"
                value={mockAppointments.length}
                icon={Calendar}
                color="bg-blue-600"
              />
              <StatCard
                title="Pending"
                value={mockAppointments.filter(app => app.status === 'pending').length}
                icon={Eye}
                color="bg-yellow-600"
              />
              <StatCard
                title="Confirmed"
                value={mockAppointments.filter(app => app.status === 'confirmed').length}
                icon={CheckCircle}
                color="bg-green-600"
              />
              <StatCard
                title="Completed"
                value={mockAppointments.filter(app => app.status === 'completed').length}
                icon={UserCheck}
                color="bg-purple-600"
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">All Appointments</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockAppointments.map(appointment => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                          <div className="text-sm text-gray-500">{appointment.doctorSpecialty}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
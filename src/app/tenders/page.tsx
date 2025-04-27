'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample tenders data
const allTenders = [
  {
    id: 'TEN-2023-001',
    title: 'Construction of Municipal Office Building',
    publishDate: '2023-06-15',
    closingDate: '2023-07-15',
    category: 'Construction',
    status: 'Open',
    estimatedValue: '₹ 2,50,00,000',
    description: 'Tender for the construction of a new municipal office building in the central district. The project includes architectural design, construction, electrical work, plumbing, and interior finishing.'
  },
  {
    id: 'TEN-2023-002',
    title: 'Supply of Garbage Collection Vehicles',
    publishDate: '2023-06-10',
    closingDate: '2023-07-10',
    category: 'Procurement',
    status: 'Open',
    estimatedValue: '₹ 75,00,000',
    description: 'Tender for the supply of 10 garbage collection vehicles for the Municipal Corporation. The vehicles should meet the specified technical requirements and environmental standards.'
  },
  {
    id: 'TEN-2023-003',
    title: 'Street Lighting Maintenance',
    publishDate: '2023-06-05',
    closingDate: '2023-07-05',
    category: 'Maintenance',
    status: 'Open',
    estimatedValue: '₹ 35,00,000',
    description: 'Tender for the maintenance of street lighting across the city for a period of two years. The scope includes regular maintenance, replacement of faulty lights, and emergency repairs.'
  },
  {
    id: 'TEN-2023-004',
    title: 'Development of Municipal Website',
    publishDate: '2023-05-28',
    closingDate: '2023-06-28',
    category: 'IT Services',
    status: 'Closed',
    estimatedValue: '₹ 15,00,000',
    description: 'Tender for the development of a new municipal website with improved features, user interface, and backend management system. The project includes design, development, testing, and deployment.'
  },
  {
    id: 'TEN-2023-005',
    title: 'Park Renovation Project',
    publishDate: '2023-05-20',
    closingDate: '2023-06-20',
    category: 'Construction',
    status: 'Closed',
    estimatedValue: '₹ 45,00,000',
    description: 'Tender for the renovation of three public parks in the city. The project includes landscaping, installation of play equipment, seating areas, pathways, and lighting.'
  },
  {
    id: 'TEN-2023-006',
    title: 'Supply of Office Furniture',
    publishDate: '2023-05-15',
    closingDate: '2023-06-15',
    category: 'Procurement',
    status: 'Closed',
    estimatedValue: '₹ 20,00,000',
    description: 'Tender for the supply of office furniture for the municipal offices. The furniture should meet the specified quality standards and design requirements.'
  }
];

export default function TendersPage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const categories = ['All', 'Construction', 'Procurement', 'Maintenance', 'IT Services'];
  const statuses = ['All', 'Open', 'Closed'];
  
  const filteredTenders = allTenders.filter(tender => {
    const matchesStatus = statusFilter === 'All' || tender.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || tender.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tenders</h1>
            <p className="mt-2 text-gray-600">Browse and apply for current tenders from the Municipal Corporation.</p>
          </div>
          
          {/* Filters */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Filter Tenders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Tenders List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tender ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Closing Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTenders.map((tender) => (
                  <tr key={tender.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tender.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {tender.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tender.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tender.closingDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        tender.status === 'Open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tender.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          // In a real app, this would navigate to a detail page
                          alert(`Tender Details:\n\nID: ${tender.id}\nTitle: ${tender.title}\nEstimated Value: ${tender.estimatedValue}\nDescription: ${tender.description}`);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                
                {filteredTenders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No tenders found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Additional Information */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-3">How to Apply for Tenders</h2>
            <p className="text-gray-700">
              Interested parties can apply for tenders by submitting their proposals as per the requirements specified in the tender document. The tender document can be downloaded from our website or collected from the Municipal Corporation office during working hours.
            </p>
            <p className="mt-2 text-gray-700">
              For any queries regarding the tender process, please contact the Tender Department at tender@municipalcorp.gov or call 1800-123-4567.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

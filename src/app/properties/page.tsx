'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    address: '123 Main Street, City Center',
    propertyType: 'Residential',
    area: '1200 sq ft',
    taxDue: 12500,
    dueDate: '2023-12-31',
    status: 'Pending',
    constructionYear: '2010',
    floors: 2
  },
  {
    id: 2,
    address: '45 Park Avenue, Green Hills',
    propertyType: 'Commercial',
    area: '2500 sq ft',
    taxDue: 35000,
    dueDate: '2023-12-31',
    status: 'Paid',
    constructionYear: '2015',
    floors: 1
  }
];

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  
  // Filter properties based on search term and property type
  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? property.propertyType === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Your Properties
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/properties/add"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add New Property
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Filter Properties</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Use these filters to find specific properties.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                      Search by Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter address or keywords"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Property Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Types</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Agricultural">Agricultural</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {filteredProperties.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <li key={property.id}>
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-blue-600 truncate">
                          {property.address}
                        </h3>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            property.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Property Type</div>
                          <div className="mt-1 text-sm text-gray-900">{property.propertyType}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Area</div>
                          <div className="mt-1 text-sm text-gray-900">{property.area}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Construction Year</div>
                          <div className="mt-1 text-sm text-gray-900">{property.constructionYear}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Number of Floors</div>
                          <div className="mt-1 text-sm text-gray-900">{property.floors}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Tax Due</div>
                          <div className="mt-1 text-sm text-gray-900">₹{property.taxDue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Due Date</div>
                          <div className="mt-1 text-sm text-gray-900">{new Date(property.dueDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-3">
                        <Link
                          href={`/properties/${property.id}`}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Details
                        </Link>
                        {property.status === 'Pending' && (
                          <Link
                            href={`/pay-tax?propertyId=${property.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Pay Tax
                          </Link>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 sm:px-6 text-center">
                <p className="text-gray-500">No properties found matching your filters.</p>
                <Link
                  href="/properties/add"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add New Property
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

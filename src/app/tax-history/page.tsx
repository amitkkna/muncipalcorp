'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for properties and tax history
const mockProperties = [
  {
    id: 1,
    address: '123 Main Street, City Center',
    propertyType: 'Residential',
    area: '1200 sq ft',
    taxDue: 12500,
    dueDate: '2023-12-31',
    status: 'Pending'
  },
  {
    id: 2,
    address: '45 Park Avenue, Green Hills',
    propertyType: 'Commercial',
    area: '2500 sq ft',
    taxDue: 35000,
    dueDate: '2023-12-31',
    status: 'Paid'
  }
];

const mockTaxHistory = [
  {
    id: 1,
    propertyId: 1,
    amount: 12000,
    paymentDate: '2022-12-15',
    receiptNo: 'TX-2022-001',
    year: '2022',
    status: 'Paid'
  },
  {
    id: 2,
    propertyId: 2,
    amount: 32000,
    paymentDate: '2022-11-20',
    receiptNo: 'TX-2022-002',
    year: '2022',
    status: 'Paid'
  },
  {
    id: 3,
    propertyId: 2,
    amount: 35000,
    paymentDate: '2023-11-25',
    receiptNo: 'TX-2023-001',
    year: '2023',
    status: 'Paid'
  },
  {
    id: 4,
    propertyId: 1,
    amount: 12500,
    paymentDate: '',
    receiptNo: '',
    year: '2023',
    status: 'Pending'
  }
];

export default function TaxHistory() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('');
  
  // Get unique years from tax history
  const years = Array.from(new Set(mockTaxHistory.map(item => item.year)));
  
  // Filter tax history based on selected property and year
  const filteredHistory = mockTaxHistory.filter(item => {
    if (selectedPropertyId && item.propertyId !== selectedPropertyId) {
      return false;
    }
    if (selectedYear && item.year !== selectedYear) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Tax Payment History
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Filter Tax Records</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Use these filters to find specific tax payment records.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="property" className="block text-sm font-medium text-gray-700">
                      Property
                    </label>
                    <select
                      id="property"
                      name="property"
                      value={selectedPropertyId || ''}
                      onChange={(e) => setSelectedPropertyId(e.target.value ? parseInt(e.target.value) : null)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Properties</option>
                      {mockProperties.map(property => (
                        <option key={property.id} value={property.id}>
                          {property.address}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Years</option>
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax History Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receipt No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.receiptNo || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {mockProperties.find(p => p.id === payment.propertyId)?.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.paymentDate || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {payment.status === 'Paid' ? (
                            <a href="#" className="text-blue-600 hover:text-blue-900">
                              Download Receipt
                            </a>
                          ) : (
                            <Link href={`/pay-tax?propertyId=${payment.propertyId}`} className="text-blue-600 hover:text-blue-900">
                              Pay Now
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        No tax records found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

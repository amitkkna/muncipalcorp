'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data for Home IDs
const initialHomeIds = [
  {
    id: 'HM001',
    address: '123 Main Street, City Center',
    ownerName: 'John Doe',
    propertyType: 'Residential',
    area: '1200 sq ft',
    taxAmount: 12500,
    createdAt: '2023-01-15'
  },
  {
    id: 'HM002',
    address: '45 Park Avenue, Green Hills',
    ownerName: 'Jane Smith',
    propertyType: 'Commercial',
    area: '2500 sq ft',
    taxAmount: 35000,
    createdAt: '2023-02-20'
  },
  {
    id: 'HM003',
    address: '78 Lake View, Sunset Point',
    ownerName: 'Robert Johnson',
    propertyType: 'Residential',
    area: '1800 sq ft',
    taxAmount: 18000,
    createdAt: '2023-03-10'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [homeIds, setHomeIds] = useState(initialHomeIds);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHomeId, setNewHomeId] = useState({
    id: '',
    address: '',
    ownerName: '',
    propertyType: 'Residential',
    area: '',
    taxAmount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  });

  // Check if admin is authenticated
  useEffect(() => {
    try {
      const isAdmin = localStorage.getItem('adminAuthenticated');
      if (!isAdmin) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }, [router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('adminAuthenticated');
      router.push('/admin/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const filteredHomeIds = homeIds.filter(home =>
    home.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    home.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    home.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHomeId = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Generate a new ID if not provided
      const homeIdToAdd = {
        ...newHomeId,
        id: newHomeId.id || `HM${String(homeIds.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Add the new home ID to the list
      setHomeIds(prevHomeIds => [...prevHomeIds, homeIdToAdd]);

      // Hide the form and reset it
      setShowAddForm(false);

      // Reset the form data
      setNewHomeId({
        id: '',
        address: '',
        ownerName: '',
        propertyType: 'Residential',
        area: '',
        taxAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      });

      console.log('New Home ID added successfully:', homeIdToAdd);
    } catch (error) {
      console.error('Error adding new Home ID:', error);
    }
  };

  const handleDeleteHomeId = (id: string) => {
    setHomeIds(homeIds.filter(home => home.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle different input types appropriately
    let processedValue: string | number = value;

    if (name === 'taxAmount') {
      // Convert to number, default to 0 if empty or NaN
      processedValue = value === '' ? 0 : parseFloat(value) || 0;
    }

    setNewHomeId(prevState => ({
      ...prevState,
      [name]: processedValue
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold">Municipal Corporation - Admin</span>
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Home ID Management</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {showAddForm ? 'Cancel' : 'Add New Home ID'}
            </button>
          </div>

          {/* Add Home ID Form */}
          {showAddForm && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Home ID</h2>
              <form onSubmit={handleAddHomeId}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                      Home ID (optional)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="id"
                        id="id"
                        value={newHomeId.id}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Auto-generated if empty"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                      Owner Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="ownerName"
                        id="ownerName"
                        required
                        value={newHomeId.ownerName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Property Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        value={newHomeId.address}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                      Property Type
                    </label>
                    <div className="mt-1">
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={newHomeId.propertyType}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Agricultural">Agricultural</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                      Area (in sq ft)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="area"
                        id="area"
                        required
                        value={newHomeId.area}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="taxAmount" className="block text-sm font-medium text-gray-700">
                      Tax Amount (₹)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="taxAmount"
                        id="taxAmount"
                        required
                        value={newHomeId.taxAmount}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Home ID
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search */}
          <div className="mb-6">
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by ID, address, or owner name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Home IDs Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Home ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner & Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHomeIds.map((home) => (
                  <tr key={home.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {home.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{home.ownerName}</div>
                      <div className="text-sm text-gray-500">{home.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{home.propertyType}</div>
                      <div className="text-sm text-gray-500">{home.area}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{home.taxAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {home.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteHomeId(home.id)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredHomeIds.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No Home IDs found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Municipal Corporation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

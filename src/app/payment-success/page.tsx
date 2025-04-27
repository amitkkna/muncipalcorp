'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for Home IDs - in a real app, this would come from a database
const mockHomeIds = [
  {
    id: 'HM001',
    address: '123 Main Street, City Center',
    ownerName: 'John Doe',
    propertyType: 'Residential',
    area: '1200 sq ft',
    taxDue: 12500,
    dueDate: '2023-12-31',
    status: 'Pending'
  },
  {
    id: 'HM002',
    address: '45 Park Avenue, Green Hills',
    ownerName: 'Jane Smith',
    propertyType: 'Commercial',
    area: '2500 sq ft',
    taxDue: 35000,
    dueDate: '2023-12-31',
    status: 'Paid'
  },
  {
    id: 'HM003',
    address: '78 Lake View, Sunset Point',
    ownerName: 'Robert Johnson',
    propertyType: 'Residential',
    area: '1800 sq ft',
    taxDue: 18000,
    dueDate: '2023-12-31',
    status: 'Pending'
  }
];

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const homeId = searchParams.get('homeId');
  const [homeDetails, setHomeDetails] = useState<any>(null);

  useEffect(() => {
    // In a real app, we would fetch payment details from the server
    // For now, we'll use our mock data
    if (homeId) {
      const home = mockHomeIds.find(h => h.id === homeId);
      if (home) {
        setHomeDetails(home);
      }
    }
  }, [homeId]);

  // Generate payment details
  const paymentDetails = {
    transactionId: 'TXN' + Math.floor(Math.random() * 1000000),
    amount: homeDetails ? `₹${homeDetails.taxDue.toLocaleString()}` : '₹0',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    homeId: homeDetails?.id || 'Unknown',
    property: homeDetails?.address || 'Unknown',
    ownerName: homeDetails?.ownerName || 'Unknown',
    paymentMethod: 'Credit Card'
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg leading-6 font-medium text-gray-900">Payment Successful!</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Your property tax payment has been successfully processed.</p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.transactionId}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Amount Paid</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.amount}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.date}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Time</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.time}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Home ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.homeId}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Owner</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.ownerName}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Property</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.property}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                  <dd className="mt-1 text-sm text-gray-900">{paymentDetails.paymentMethod}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </Link>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => window.print()}
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

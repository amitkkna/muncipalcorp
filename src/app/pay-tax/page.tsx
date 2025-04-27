'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for Home IDs
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

function PayTaxContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for both possible parameter names
  const homeIdParam = searchParams.get('homeId') || searchParams.get('homeIdInput');

  console.log("URL parameters:", {
    homeId: searchParams.get('homeId'),
    homeIdInput: searchParams.get('homeIdInput')
  });

  const [selectedHomeId, setSelectedHomeId] = useState<string | null>(homeIdParam || null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [homeIdInput, setHomeIdInput] = useState(homeIdParam || '');
  const [homeIdError, setHomeIdError] = useState('');

  // Payment form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Get pending home IDs
  const pendingHomeIds = mockHomeIds.filter(h => h.status === 'Pending');

  // Get selected home details
  const selectedHome = selectedHomeId
    ? mockHomeIds.find(h => h.id === selectedHomeId)
    : null;

  useEffect(() => {
    // If homeId is provided in URL, validate it
    if (homeIdParam) {
      const home = mockHomeIds.find(h => h.id === homeIdParam);
      if (home && home.status === 'Pending') {
        setSelectedHomeId(homeIdParam);
      } else {
        setHomeIdError('Invalid Home ID or tax already paid');
      }
    }
  }, [homeIdParam]);

  const handleHomeIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHomeIdError('');

    // Validate Home ID
    const home = mockHomeIds.find(h => h.id === homeIdInput);
    if (!home) {
      setHomeIdError('Home ID not found');
      return;
    }

    if (home.status !== 'Pending') {
      setHomeIdError('No pending tax for this Home ID');
      return;
    }

    setSelectedHomeId(homeIdInput);
  };

  const handleHomeIdSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHomeId(e.target.value);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would process the payment
      // For POC, we're just simulating the payment process
      console.log('Processing payment for Home ID:', selectedHome);
      console.log('Payment method:', paymentMethod);
      console.log('Card details:', cardDetails);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Redirect to success page with the home ID
      router.push(`/payment-success?homeId=${selectedHomeId}`);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with decorative elements */}
          <div className="relative mb-10">
            <div className="absolute top-0 left-0 w-20 h-20 bg-blue-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-indigo-100 rounded-full opacity-50 translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-bold sm:text-4xl mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Pay Property Tax
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Make secure online payments for your property tax using your Home ID
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-lg shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Step indicator - Enhanced with animation and better visuals */}
          <div className="mb-10">
            <nav className="flex items-center justify-center" aria-label="Progress">
              <ol className="flex items-center w-full max-w-md mx-auto">
                <li className="flex items-center w-1/2">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all duration-300 ${
                    step === 1
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <span className="text-base font-semibold">1</span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-900">Enter Home ID</span>
                  <div className="w-full h-1 ml-3 bg-gray-200 rounded">
                    <div className={`h-full rounded ${step >= 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : ''}`} style={{ width: step >= 2 ? '100%' : '0%', transition: 'width 0.5s ease-in-out' }}></div>
                  </div>
                </li>
                <li className="flex items-center w-1/2">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all duration-300 ${
                    step === 2
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <span className="text-base font-semibold">2</span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-900">Payment</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            {step === 1 ? (
              <form onSubmit={handleProceedToPayment} className="p-8">
                <div className="space-y-8">
                  {!selectedHomeId ? (
                    <div className="max-w-lg mx-auto">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">Enter your Home ID</h3>
                        <p className="text-gray-600 text-sm">Please enter your Home ID to proceed with tax payment</p>
                      </div>

                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="homeId"
                            name="homeId"
                            required
                            value={homeIdInput}
                            onChange={(e) => {
                              setHomeIdInput(e.target.value);
                              setHomeIdError('');
                            }}
                            className="pl-10 shadow-md focus:ring-blue-500 focus:border-blue-500 block w-full text-black border-gray-300 rounded-lg py-3 transition-all duration-300"
                            placeholder="e.g. HM001"
                            style={{ color: 'black' }}
                          />
                        </div>
                        {homeIdError && (
                          <div className="mt-2 flex items-center text-red-600">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-sm">{homeIdError}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={handleHomeIdSubmit}
                          className="w-full inline-flex justify-center items-center py-3 px-4 border border-transparent shadow-md text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          Verify Home ID
                        </button>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center mb-4">
                          <div className="h-px bg-gray-200 flex-grow"></div>
                          <span className="px-3 text-sm text-gray-500 bg-white">OR</span>
                          <div className="h-px bg-gray-200 flex-grow"></div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3 font-medium">Select from available Home IDs:</p>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                          </div>
                          <select
                            id="homeIdSelect"
                            name="homeIdSelect"
                            value={selectedHomeId || ''}
                            onChange={handleHomeIdSelect}
                            className="pl-10 shadow-md focus:ring-blue-500 focus:border-blue-500 block w-full text-black border-gray-300 rounded-lg py-3 transition-all duration-300"
                            style={{ color: 'black' }}
                          >
                            <option value="">-- Select a Home ID --</option>
                            {pendingHomeIds.map(home => (
                              <option key={home.id} value={home.id}>
                                {home.id} - {home.address} - ₹{home.taxDue.toLocaleString()}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-inner border border-blue-100">
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900">Property Details</h3>
                      </div>

                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div className="border-l-2 border-blue-200 pl-4">
                          <p className="text-sm font-medium text-blue-600 mb-1">Home ID</p>
                          <p className="text-base font-semibold text-gray-900">{selectedHome?.id}</p>
                        </div>
                        <div className="border-l-2 border-blue-200 pl-4">
                          <p className="text-sm font-medium text-blue-600 mb-1">Owner Name</p>
                          <p className="text-base font-semibold text-gray-900">{selectedHome?.ownerName}</p>
                        </div>
                        <div className="border-l-2 border-blue-200 pl-4">
                          <p className="text-sm font-medium text-blue-600 mb-1">Address</p>
                          <p className="text-base font-semibold text-gray-900">{selectedHome?.address}</p>
                        </div>
                        <div className="border-l-2 border-blue-200 pl-4">
                          <p className="text-sm font-medium text-blue-600 mb-1">Property Type</p>
                          <p className="text-base font-semibold text-gray-900">{selectedHome?.propertyType}</p>
                        </div>
                        <div className="border-l-2 border-blue-200 pl-4">
                          <p className="text-sm font-medium text-blue-600 mb-1">Area</p>
                          <p className="text-base font-semibold text-gray-900">{selectedHome?.area}</p>
                        </div>
                        <div className="border-l-2 border-blue-200 pl-4">
                          <p className="text-sm font-medium text-blue-600 mb-1">Due Date</p>
                          <p className="text-base font-semibold text-gray-900">
                            {selectedHome?.dueDate ? new Date(selectedHome.dueDate).toLocaleDateString() : ''}
                          </p>
                        </div>
                        <div className="sm:col-span-2 mt-4 bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                          <p className="text-sm font-medium text-blue-600 mb-1">Tax Amount Due</p>
                          <p className="text-2xl font-bold text-gray-900">₹{selectedHome?.taxDue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <div className="flex justify-end space-x-4">
                      <Link
                        href="/"
                        className="inline-flex items-center py-3 px-5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={!selectedHomeId}
                        className={`inline-flex items-center py-3 px-5 border border-transparent shadow-md text-sm font-medium rounded-lg text-white transition-all duration-300 ${
                          !selectedHomeId
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                      >
                        Proceed to Payment
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitPayment} className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Summary</h3>
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Home ID</span>
                        <span className="text-sm font-medium text-gray-900">{selectedHome?.id}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Property</span>
                        <span className="text-sm font-medium text-gray-900">{selectedHome?.address}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Owner</span>
                        <span className="text-sm font-medium text-gray-900">{selectedHome?.ownerName}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Tax Amount</span>
                        <span className="text-sm font-medium text-gray-900">₹{selectedHome?.taxDue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">Convenience Fee</span>
                        <span className="text-sm font-medium text-gray-900">₹0</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-gray-900">Total Amount</span>
                          <span className="text-base font-bold text-gray-900">₹{selectedHome?.taxDue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Method</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="card"
                          name="paymentMethod"
                          type="radio"
                          checked={paymentMethod === 'card'}
                          onChange={handlePaymentMethodChange}
                          value="card"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                          Credit/Debit Card
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="upi"
                          name="paymentMethod"
                          type="radio"
                          checked={paymentMethod === 'upi'}
                          onChange={handlePaymentMethodChange}
                          value="upi"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                          UPI
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="netbanking"
                          name="paymentMethod"
                          type="radio"
                          checked={paymentMethod === 'netbanking'}
                          onChange={handlePaymentMethodChange}
                          value="netbanking"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor="netbanking" className="ml-3 block text-sm font-medium text-gray-700">
                          Net Banking
                        </label>
                      </div>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            required
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            placeholder="1234 5678 9012 3456"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                          Name on Card
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="cardName"
                            id="cardName"
                            required
                            value={cardDetails.cardName}
                            onChange={handleCardDetailsChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                            Expiry Date
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="expiryDate"
                              id="expiryDate"
                              required
                              value={cardDetails.expiryDate}
                              onChange={handleCardDetailsChange}
                              placeholder="MM/YY"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="cvv"
                              id="cvv"
                              required
                              value={cardDetails.cvv}
                              onChange={handleCardDetailsChange}
                              placeholder="123"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div>
                      <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
                        UPI ID
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="upiId"
                          id="upiId"
                          required
                          placeholder="username@upi"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div>
                      <label htmlFor="bank" className="block text-sm font-medium text-gray-700">
                        Select Bank
                      </label>
                      <div className="mt-1">
                        <select
                          id="bank"
                          name="bank"
                          required
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">-- Select a bank --</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="pt-5">
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {loading ? 'Processing...' : 'Pay Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function PayTax() {
  return (
    <Suspense fallback={<div>Loading payment page...</div>}>
      <PayTaxContent />
    </Suspense>
  );
}

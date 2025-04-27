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
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Pay Property Tax
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Step indicator */}
          <div className="mb-8">
            <nav className="flex items-center justify-center" aria-label="Progress">
              <ol className="flex items-center space-x-5">
                <li className="flex items-center">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    1
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-900">Enter Home ID</span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-5 h-0.5 bg-gray-300"></span>
                  <span className={`ml-5 flex items-center justify-center w-8 h-8 rounded-full ${
                    step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    2
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-900">Payment</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {step === 1 ? (
              <form onSubmit={handleProceedToPayment} className="p-6">
                <div className="space-y-6">
                  {!selectedHomeId ? (
                    <div>
                      <label htmlFor="homeId" className="block text-sm font-medium text-gray-700">
                        Enter your Home ID
                      </label>
                      <div className="mt-1">
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
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. HM001"
                        />
                        {homeIdError && (
                          <p className="mt-2 text-sm text-red-600">{homeIdError}</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={handleHomeIdSubmit}
                          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Verify Home ID
                        </button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-2">Or select from available Home IDs:</p>
                        <select
                          id="homeIdSelect"
                          name="homeIdSelect"
                          value={selectedHomeId || ''}
                          onChange={handleHomeIdSelect}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Property Details</h3>
                      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                        <div>
                          <p className="text-sm text-gray-500">Home ID</p>
                          <p className="text-sm font-medium text-gray-900">{selectedHome?.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Owner Name</p>
                          <p className="text-sm font-medium text-gray-900">{selectedHome?.ownerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-sm font-medium text-gray-900">{selectedHome?.address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Property Type</p>
                          <p className="text-sm font-medium text-gray-900">{selectedHome?.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Area</p>
                          <p className="text-sm font-medium text-gray-900">{selectedHome?.area}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedHome?.dueDate ? new Date(selectedHome.dueDate).toLocaleDateString() : ''}
                          </p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-sm text-gray-500">Tax Amount Due</p>
                          <p className="text-lg font-bold text-gray-900">₹{selectedHome?.taxDue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <Link
                        href="/"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={!selectedHomeId}
                        className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                          !selectedHomeId ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                      >
                        Proceed to Payment
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

'use client';

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Carousel";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  // Add console log to check if component is loading properly
  console.log("Home component loaded");

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Welcome Section - Enhanced with gradient and animation */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-lg p-8 mb-8 border-l-4 border-blue-500 transform transition duration-500 hover:scale-[1.01] hover:shadow-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 relative">
                      Welcome to Municipal Corporation
                      <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></span>
                    </h1>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The Municipal Corporation is dedicated to providing efficient and transparent services to all citizens.
                      Our online tax portal allows you to conveniently pay your property taxes, access important information,
                      and stay updated with the latest announcements.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Use your Home ID to access your property details and make tax payments securely through our online system.
                    </p>
                  </div>
                </div>
              </div>

              {/* Services Section - Enhanced with animations and gradients */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 relative">
                    Our Services
                    <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></span>
                  </h2>
                  <div className="ml-4 h-px flex-grow bg-gradient-to-r from-blue-200 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Online Payment */}
                  <div className="bg-gradient-to-br from-white to-blue-50 overflow-hidden shadow-md rounded-lg border border-blue-100 transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] hover:border-blue-200">
                    <div className="px-6 py-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-3 shadow-md">
                          <svg className="h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div className="ml-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Payment</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Pay your property tax online using various payment methods including credit cards, net banking, and UPI.
                          </p>
                          <div className="mt-3">
                            <a href="/pay-tax" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                              Pay Now
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax History */}
                  <div className="bg-gradient-to-br from-white to-indigo-50 overflow-hidden shadow-md rounded-lg border border-indigo-100 transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] hover:border-indigo-200">
                    <div className="px-6 py-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-3 shadow-md">
                          <svg className="h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div className="ml-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tax History</h3>
                          <p className="text-gray-600 leading-relaxed">
                            View your complete tax payment history, download receipts, and access previous tax statements.
                          </p>
                          <div className="mt-3">
                            <a href="/tax-history" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                              View History
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Due Date Reminders */}
                  <div className="bg-gradient-to-br from-white to-green-50 overflow-hidden shadow-md rounded-lg border border-green-100 transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] hover:border-green-200">
                    <div className="px-6 py-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-teal-600 rounded-full p-3 shadow-md">
                          <svg className="h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Due Date Reminders</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Get timely reminders for upcoming tax payment due dates via email, SMS, and app notifications.
                          </p>
                          <div className="mt-3">
                            <a href="/reminders" className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800">
                              Set Reminders
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Verification */}
                  <div className="bg-gradient-to-br from-white to-purple-50 overflow-hidden shadow-md rounded-lg border border-purple-100 transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] hover:border-purple-200">
                    <div className="px-6 py-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full p-3 shadow-md">
                          <svg className="h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Verification</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Verify your property details, tax assessment, and get digital property verification certificates.
                          </p>
                          <div className="mt-3">
                            <a href="/verification" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800">
                              Verify Property
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section - Enhanced with gradient and animation */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-xl">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full translate-x-1/4 translate-y-1/4"></div>

                  <div className="py-10 px-8 lg:flex lg:items-center lg:justify-between relative z-10">
                    <div className="max-w-xl">
                      <h2 className="text-3xl font-extrabold tracking-tight text-white">
                        <span className="block mb-1">Ready to get started?</span>
                        <span className="block text-blue-200">Pay your property tax today.</span>
                      </h2>
                      <p className="mt-3 text-blue-100 max-w-md">
                        Quick, secure, and convenient online payment options available. No queues, no waiting.
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0 lg:ml-8">
                      <Link
                        href="/pay-tax"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white shadow-md hover:bg-blue-50 transform transition duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Pay Now
                      </Link>
                      <Link
                        href="/contact"
                        className="mt-3 sm:mt-0 sm:ml-3 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 bg-opacity-60 hover:bg-opacity-80 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

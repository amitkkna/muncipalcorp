'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample notifications
const sampleNotifications = [
  {
    id: 1,
    title: 'Property Tax Due Date Extended',
    date: '2023-06-15',
    summary: 'The due date for property tax payments has been extended to July 31, 2023.'
  },
  {
    id: 2,
    title: 'New Online Payment System',
    date: '2023-06-10',
    summary: 'We have launched a new online payment system for easier tax payments.'
  },
  {
    id: 3,
    title: 'Municipal Office Holiday',
    date: '2023-06-05',
    summary: 'Municipal offices will be closed on June 20, 2023 for a public holiday.'
  }
];

export default function Sidebar() {
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  // Display only 2 notifications by default, or all if showAllNotifications is true
  const displayedNotifications = showAllNotifications
    ? sampleNotifications
    : sampleNotifications.slice(0, 2);

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg shadow-lg p-5 space-y-7">
      {/* Home ID Search Box */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-l-4 border-blue-500 shadow-md transform transition duration-300 hover:shadow-lg">
        <h3 className="text-blue-800 text-lg font-semibold mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          Pay Your House Tax
        </h3>
        <form method="get" action="/pay-tax">
          <div className="mb-4">
            <label htmlFor="homeId" className="block text-gray-700 text-sm font-medium mb-2">
              Enter your Home ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="homeId"
                name="homeId"
                autoComplete="off"
                className="w-full px-4 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500 transition-all duration-300"
                placeholder="e.g. HM001"
                style={{
                  color: 'black',
                  fontWeight: '500'
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 text-sm font-medium rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md transform hover:translate-y-[-2px]"
          >
            Proceed to Payment
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-600">
            Don't have a Home ID?{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact us
            </Link>
          </p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="pt-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-800 text-lg font-semibold relative">
            Latest Notifications
            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded"></span>
          </h3>
          <Link href="/notifications" className="text-blue-600 text-sm hover:text-blue-800 font-medium flex items-center group">
            View All
            <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        <div className="space-y-3">
          {displayedNotifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg border-l-2 border-blue-400 shadow-sm transform transition-all duration-300 hover:shadow-md hover:border-l-blue-500 hover:translate-x-1"
            >
              <h4 className="text-gray-900 font-medium text-sm">{notification.title}</h4>
              <p className="text-gray-500 text-xs mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {notification.date}
              </p>
              <p className="text-gray-700 text-sm mt-2">{notification.summary}</p>
              <Link
                href={`/notifications/${notification.id}`}
                className="text-blue-600 text-xs mt-2 inline-flex items-center hover:text-blue-800 group"
              >
                Read More
                <svg className="w-3 h-3 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {sampleNotifications.length > 2 && !showAllNotifications && (
          <button
            onClick={() => setShowAllNotifications(true)}
            className="text-blue-600 text-sm mt-4 hover:text-blue-800 flex items-center mx-auto"
          >
            Show More Notifications
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        )}
      </div>

      {/* Quick Links */}
      <div className="pt-2">
        <h3 className="text-gray-800 text-lg font-semibold mb-4 relative">
          Quick Links
          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded"></span>
        </h3>
        <ul className="space-y-3">
          <li>
            <Link href="/announcements" className="text-gray-700 hover:text-blue-700 text-sm flex items-center group transition-all duration-300 transform hover:translate-x-1">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
              </svg>
              Announcements
            </Link>
          </li>
          <li>
            <Link href="/tenders" className="text-gray-700 hover:text-blue-700 text-sm flex items-center group transition-all duration-300 transform hover:translate-x-1">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Tenders
            </Link>
          </li>
          <li>
            <Link href="/tax-rates" className="text-gray-700 hover:text-blue-700 text-sm flex items-center group transition-all duration-300 transform hover:translate-x-1">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              Tax Rates
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 hover:text-blue-700 text-sm flex items-center group transition-all duration-300 transform hover:translate-x-1">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

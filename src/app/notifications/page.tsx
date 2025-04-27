'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample notifications data
const allNotifications = [
  {
    id: 1,
    title: 'Property Tax Due Date Extended',
    date: '2023-06-15',
    category: 'Tax',
    summary: 'The due date for property tax payments has been extended to July 31, 2023.',
    content: 'Due to the ongoing system upgrades, the Municipal Corporation has decided to extend the property tax payment deadline. All property owners now have until July 31, 2023 to make their payments without any late fees or penalties. We apologize for any inconvenience and thank you for your understanding.'
  },
  {
    id: 2,
    title: 'New Online Payment System',
    date: '2023-06-10',
    category: 'Service',
    summary: 'We have launched a new online payment system for easier tax payments.',
    content: 'We are pleased to announce the launch of our new online payment system, designed to make tax payments more convenient and secure. The new system offers multiple payment options including credit/debit cards, UPI, and net banking. It also provides instant payment confirmation and downloadable receipts.'
  },
  {
    id: 3,
    title: 'Municipal Office Holiday',
    date: '2023-06-05',
    category: 'Announcement',
    summary: 'Municipal offices will be closed on June 20, 2023 for a public holiday.',
    content: 'Please note that all municipal offices will remain closed on June 20, 2023 in observance of the public holiday. Online services will continue to be available during this time. For any emergencies, please contact our 24/7 helpline at 1800-123-4567.'
  },
  {
    id: 4,
    title: 'Water Supply Interruption',
    date: '2023-06-01',
    category: 'Service',
    summary: 'Scheduled water supply interruption in North District on June 25, 2023.',
    content: 'Due to essential maintenance work on the main water pipeline, there will be a scheduled interruption in water supply in the North District on June 25, 2023, from 10:00 AM to 4:00 PM. Residents are advised to store sufficient water for use during this period. We apologize for the inconvenience caused.'
  },
  {
    id: 5,
    title: 'New Waste Collection Schedule',
    date: '2023-05-28',
    category: 'Service',
    summary: 'Updated waste collection schedule effective from July 1, 2023.',
    content: 'The Municipal Corporation is implementing a new waste collection schedule starting July 1, 2023. The new schedule aims to improve efficiency and service quality. Residents are requested to check the detailed schedule on our website or contact the helpline for information specific to their area.'
  },
  {
    id: 6,
    title: 'Public Meeting on City Development Plan',
    date: '2023-05-20',
    category: 'Event',
    summary: 'Public meeting to discuss the city development plan on June 15, 2023.',
    content: 'The Municipal Corporation invites all residents to attend a public meeting on the proposed city development plan. The meeting will be held on June 15, 2023, at the Town Hall from 5:00 PM to 7:00 PM. Your participation and feedback are valuable for shaping the future of our city.'
  },
  {
    id: 7,
    title: 'Property Tax Rebate for Senior Citizens',
    date: '2023-05-15',
    category: 'Tax',
    summary: 'Special property tax rebate announced for senior citizens.',
    content: 'The Municipal Corporation has announced a special 10% rebate on property tax for senior citizens aged 65 and above. Eligible citizens can apply for the rebate by submitting the required documents at the municipal office or through the online portal by July 31, 2023.'
  }
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Tax', 'Service', 'Announcement', 'Event'];
  
  const filteredNotifications = filter === 'All' 
    ? allNotifications 
    : allNotifications.filter(notification => notification.category === filter);

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="mt-2 text-gray-600">Stay updated with the latest announcements and information from the Municipal Corporation.</p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Notifications List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <li key={notification.id}>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{notification.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {notification.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{notification.date}</p>
                    <p className="mt-2 text-sm text-gray-700">{notification.summary}</p>
                    <div className="mt-3">
                      <Link
                        href={`/notifications/${notification.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Read more <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
              
              {filteredNotifications.length === 0 && (
                <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                  No notifications found in this category.
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

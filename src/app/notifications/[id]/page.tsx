'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function NotificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const id = parseInt(params.id as string);
      const found = allNotifications.find(n => n.id === id);
      
      if (found) {
        setNotification(found);
      } else {
        // Notification not found, redirect to notifications page
        router.push('/notifications');
      }
      
      setLoading(false);
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow sm:rounded-lg p-6">
              <p className="text-center text-gray-500">Loading notification...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!notification) {
    return (
      <>
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow sm:rounded-lg p-6">
              <p className="text-center text-gray-500">Notification not found.</p>
              <div className="mt-4 text-center">
                <Link
                  href="/notifications"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Back to Notifications
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/notifications"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
            >
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Notifications
            </Link>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{notification.title}</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {notification.category}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{notification.date}</p>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{notification.content}</p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Additional Information</h2>
                <p className="mt-2 text-sm text-gray-500">
                  For more information, please contact the Municipal Corporation helpline at 1800-123-4567 or visit our office during working hours.
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Link
                  href="/notifications"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Notifications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample announcements data
const allAnnouncements = [
  {
    id: 1,
    title: 'Annual Budget Approval',
    date: '2023-06-20',
    category: 'Budget',
    summary: 'The annual budget for the fiscal year 2023-2024 has been approved by the Municipal Council.',
    content: 'We are pleased to announce that the Municipal Council has approved the annual budget for the fiscal year 2023-2024. The budget focuses on infrastructure development, public services improvement, and environmental sustainability. A detailed breakdown of the budget allocation is available on our website.'
  },
  {
    id: 2,
    title: 'New Mayor Elected',
    date: '2023-06-15',
    category: 'Administration',
    summary: 'Mr. John Smith has been elected as the new Mayor of the Municipal Corporation.',
    content: 'The Municipal Corporation is pleased to announce that Mr. John Smith has been elected as the new Mayor. Mr. Smith brings with him 15 years of experience in public administration and has outlined his vision for the city\'s development in the coming years. The Mayor will be officially sworn in on July 1, 2023.'
  },
  {
    id: 3,
    title: 'Road Repair Project',
    date: '2023-06-10',
    category: 'Infrastructure',
    summary: 'Major road repair project to begin in the downtown area starting July 5, 2023.',
    content: 'The Municipal Corporation will be undertaking a major road repair project in the downtown area starting July 5, 2023. The project aims to improve road conditions, enhance safety, and reduce traffic congestion. The work is expected to be completed within three months. We apologize for any inconvenience caused during this period.'
  },
  {
    id: 4,
    title: 'New Public Park Opening',
    date: '2023-06-05',
    category: 'Recreation',
    summary: 'New public park to be inaugurated in the East District on June 30, 2023.',
    content: 'We are excited to announce the opening of a new public park in the East District. The park features walking trails, children\'s play areas, sports facilities, and green spaces. The inauguration ceremony will be held on June 30, 2023, at 10:00 AM. All residents are invited to attend the event and enjoy the new recreational space.'
  },
  {
    id: 5,
    title: 'Public Health Campaign',
    date: '2023-05-28',
    category: 'Health',
    summary: 'Launch of a public health awareness campaign on dengue prevention.',
    content: 'The Municipal Corporation, in collaboration with the Health Department, is launching a comprehensive public health awareness campaign on dengue prevention. The campaign will include community workshops, distribution of information materials, and preventive measures implementation. Residents are encouraged to participate and contribute to making our city healthier.'
  }
];

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Budget', 'Administration', 'Infrastructure', 'Recreation', 'Health'];
  
  const filteredAnnouncements = filter === 'All' 
    ? allAnnouncements 
    : allAnnouncements.filter(announcement => announcement.category === filter);

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="mt-2 text-gray-600">Official announcements from the Municipal Corporation.</p>
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
          
          {/* Announcements List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredAnnouncements.map((announcement) => (
                <li key={announcement.id}>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {announcement.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{announcement.date}</p>
                    <p className="mt-2 text-sm text-gray-700">{announcement.summary}</p>
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          // In a real app, this would navigate to a detail page
                          alert(announcement.content);
                        }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Read more <span aria-hidden="true">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              
              {filteredAnnouncements.length === 0 && (
                <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
                  No announcements found in this category.
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

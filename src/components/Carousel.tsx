'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Key features for the hero section
const keyFeatures = [
  {
    id: 1,
    title: 'Pay Taxes',
    description: 'Quick & secure payments',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
      </svg>
    ),
    link: '/pay-tax',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    title: 'View History',
    description: 'Access payment records',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
    ),
    link: '/tax-history',
    color: 'from-indigo-500 to-indigo-800'
  },
  {
    id: 3,
    title: 'Notifications',
    description: 'Stay updated',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
      </svg>
    ),
    link: '/notifications',
    color: 'from-purple-500 to-purple-800'
  },
  {
    id: 4,
    title: 'Contact Us',
    description: 'Get support',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    link: '/contact',
    color: 'from-green-500 to-green-700'
  }
];

export default function HeroSection() {
  // Animation for the text typing effect
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Serving citizens with pride and dedication';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(prev => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-indigo-900">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500 opacity-10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-blue-300 opacity-10 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Hero text */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Welcome to <span className="text-blue-300">Municipal Corporation</span>
            </h1>
            <div className="h-12">
              <p className="text-xl text-blue-100 mb-6 relative after:content-['|'] after:ml-1 after:animate-pulse">
                {displayText}
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/pay-tax"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]"
              >
                Pay Your Tax
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-5 py-3 border border-blue-300 text-base font-medium rounded-md text-blue-100 hover:bg-blue-800 hover:bg-opacity-30 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Feature cards */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {keyFeatures.map((feature) => (
              <Link
                key={feature.id}
                href={feature.link}
                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl p-5 shadow-lg border border-white border-opacity-30 hover:bg-opacity-25 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group relative overflow-hidden"
              >
                {/* Decorative gradient circle in background */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${feature.color} opacity-20 blur-sm`}></div>

                {/* Icon with gradient background */}
                <div className={`relative z-10 inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white shadow-lg mb-3 transform transition-transform duration-300 group-hover:rotate-3`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-blue-100 font-medium">{feature.description}</p>

                  {/* Animated arrow on hover */}
                  <div className="mt-3 text-blue-200 text-sm flex items-center group-hover:text-blue-100 transition-all duration-300">
                    <span className="font-medium">Learn more</span>
                    <svg className="ml-1 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-10 sm:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-blue-200">
              &copy; {new Date().getFullYear()} Municipal Corporation. All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:order-2 md:mt-0">
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-blue-200 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

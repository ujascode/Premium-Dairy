import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <Image
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt="Dairy Sales Management"
                  width={40}
                  height={40}
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/products"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Products
                  </a>
                  <a
                    href="/sales"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Sales
                  </a>
                  <a
                    href="/reports"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Reports
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <a
                href="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Welcome to Dairy Sales Management System
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Streamline your dairy farm operations with our comprehensive sales
              and inventory management solution.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="/login"
                className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Get Started
              </a>
              <a
                href="/demo"
                className="rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                View Demo
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Dairy Sales Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
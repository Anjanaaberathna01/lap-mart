import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminCustomers = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/orders', label: 'Orders', icon: '📦' },
    { path: '/admin/products', label: 'Products', icon: '💻' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
  ];

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'JD',
      joined: 'Jan 15, 2024',
      orders: 12,
      spent: '$23,988',
      status: 'Active',
      location: 'New York, USA',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'JS',
      joined: 'Feb 2, 2024',
      orders: 8,
      spent: '$12,792',
      status: 'Active',
      location: 'Los Angeles, USA',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'MJ',
      joined: 'Dec 20, 2023',
      orders: 25,
      spent: '$47,475',
      status: 'VIP',
      location: 'Chicago, USA',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      avatar: 'SW',
      joined: 'Jan 5, 2024',
      orders: 3,
      spent: '$4,197',
      status: 'Active',
      location: 'Houston, USA',
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@example.com',
      avatar: 'RB',
      joined: 'Nov 10, 2023',
      orders: 0,
      spent: '$0',
      status: 'Inactive',
      location: 'Phoenix, USA',
    },
  ];

  const stats = [
    { label: 'Total Customers', value: '3,842', icon: '👥', color: 'from-blue-500 to-cyan-600' },
    { label: 'Active Users', value: '2,156', icon: '✅', color: 'from-green-500 to-emerald-600' },
    { label: 'VIP Members', value: '287', icon: '⭐', color: 'from-yellow-500 to-orange-600' },
    { label: 'New This Month', value: '142', icon: '🎉', color: 'from-purple-500 to-pink-600' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      Active: 'bg-green-100 text-green-700',
      VIP: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      Inactive: 'bg-gray-100 text-gray-700',
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  const handleSendEmail = (customerName) => {
    toast.success(`Email sent to ${customerName}!`);
  };

  const handleViewDetails = (customerName) => {
    toast(`Opening ${customerName}'s profile...`, { icon: '👤' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LapMart
            </Link>
            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full">
              ADMIN
            </span>
          </div>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span>🏠</span>
            <span className="font-medium text-gray-700">Back to Store</span>
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6 py-2 flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Search customers by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Customers</option>
            <option>Active</option>
            <option>VIP</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {customer.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(customer.status)}`}>
                    {customer.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 my-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{customer.orders}</p>
                    <p className="text-xs text-gray-600">Orders</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{customer.spent}</p>
                    <p className="text-xs text-gray-600">Spent</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-xs font-semibold text-purple-600 mt-1">{customer.joined}</p>
                    <p className="text-xs text-gray-600">Joined</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{customer.location}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(customer.name)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleSendEmail(customer.name)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Send Email"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1 to 5 of 3,842 customers</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCustomers;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const location = useLocation();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: '#ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'JD',
      },
      product: 'MacBook Pro 14" M3 Pro',
      quantity: 1,
      amount: '$1,999',
      status: 'Completed',
      date: '2024-02-05',
      time: '2 hours ago',
      payment: 'Credit Card',
      shipping: 'Express',
    },
    {
      id: '#ORD-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'JS',
      },
      product: 'Dell XPS 15 (2024)',
      quantity: 2,
      amount: '$3,198',
      status: 'Processing',
      date: '2024-02-05',
      time: '5 hours ago',
      payment: 'PayPal',
      shipping: 'Standard',
    },
    {
      id: '#ORD-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'MJ',
      },
      product: 'ASUS ROG Strix G16',
      quantity: 1,
      amount: '$1,899',
      status: 'Shipped',
      date: '2024-02-04',
      time: '1 day ago',
      payment: 'Credit Card',
      shipping: 'Express',
    },
    {
      id: '#ORD-004',
      customer: {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        avatar: 'SW',
      },
      product: 'HP Spectre x360 14',
      quantity: 1,
      amount: '$1,399',
      status: 'Pending',
      date: '2024-02-03',
      time: '2 days ago',
      payment: 'Bank Transfer',
      shipping: 'Standard',
    },
    {
      id: '#ORD-005',
      customer: {
        name: 'Robert Brown',
        email: 'robert@example.com',
        avatar: 'RB',
      },
      product: 'Lenovo ThinkPad X1',
      quantity: 3,
      amount: '$4,497',
      status: 'Cancelled',
      date: '2024-02-02',
      time: '3 days ago',
      payment: 'Credit Card',
      shipping: 'Express',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-700 border-green-200',
      Processing: 'bg-blue-100 text-blue-700 border-blue-200',
      Shipped: 'bg-purple-100 text-purple-700 border-purple-200',
      Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Cancelled: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const handleStatusChange = (orderId, newStatus) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}!`);
  };

  const handleViewDetails = (orderId) => {
    toast('Opening order details...', { icon: '📦' });
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/orders', label: 'Orders', icon: '📦' },
    { path: '/admin/products', label: 'Products', icon: '💻' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
  ];

  const stats = [
    { label: 'Total Orders', value: '1,245', icon: '📦', color: 'from-blue-500 to-cyan-600' },
    { label: 'Pending', value: '156', icon: '⏳', color: 'from-yellow-500 to-orange-600' },
    { label: 'Processing', value: '89', icon: '⚙️', color: 'from-purple-500 to-pink-600' },
    { label: 'Completed', value: '985', icon: '✅', color: 'from-green-500 to-emerald-600' },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Search orders, customers..."
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

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">All Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{order.payment}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{order.shipping}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {order.customer.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer.name}</p>
                        <p className="text-xs text-gray-500">{order.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.product}</p>
                      <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-gray-900">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      defaultValue={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1 to 5 of 1,245 orders</p>
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

export default AdminOrders;

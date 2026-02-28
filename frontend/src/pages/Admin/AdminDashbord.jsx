import { Link, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/orders', label: 'Orders', icon: '📦' },
    { path: '/admin/products', label: 'Products', icon: '💻' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
  ];

  const stats = [
    {
      label: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      icon: '💰',
      bgColor: 'from-green-500 to-emerald-600',
      trend: 'up',
    },
    {
      label: 'Total Orders',
      value: '1,245',
      change: '+15.3%',
      icon: '📦',
      bgColor: 'from-blue-500 to-cyan-600',
      trend: 'up',
    },
    {
      label: 'Total Products',
      value: '342',
      change: '+8.2%',
      icon: '💻',
      bgColor: 'from-purple-500 to-pink-600',
      trend: 'up',
    },
    {
      label: 'Total Customers',
      value: '3,842',
      change: '+12.5%',
      icon: '👥',
      bgColor: 'from-orange-500 to-red-600',
      trend: 'up',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      product: 'MacBook Pro 14"',
      amount: '$1,999',
      status: 'Completed',
      date: '2 hours ago',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      product: 'Dell XPS 15',
      amount: '$1,599',
      status: 'Processing',
      date: '5 hours ago',
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      product: 'ASUS ROG Strix',
      amount: '$1,899',
      status: 'Shipped',
      date: '1 day ago',
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Williams',
      product: 'HP Spectre x360',
      amount: '$1,399',
      status: 'Pending',
      date: '2 days ago',
    },
  ];

  const topProducts = [
    { name: 'MacBook Pro 14"', sales: 156, revenue: '$311,844' },
    { name: 'Dell XPS 15', sales: 142, revenue: '$226,958' },
    { name: 'ASUS ROG Strix G16', sales: 128, revenue: '$243,072' },
    { name: 'HP Spectre x360', sales: 98, revenue: '$137,102' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-[slideUp_0.5s_ease-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.bgColor} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All →
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{order.product}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">{order.amount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Top Products</h3>
          </div>
          <div className="p-6 space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between group hover:bg-gray-50 p-3 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/products" className="group bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 block">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
              ➕
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">Add New Product</p>
              <p className="text-sm text-blue-100">Create a new listing</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/orders" className="group bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 block">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
              📊
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">View Orders</p>
              <p className="text-sm text-green-100">Manage all orders</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/customers" className="group bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 block">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
              👥
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">View Customers</p>
              <p className="text-sm text-orange-100">Manage customer list</p>
            </div>
          </div>
        </Link>
      </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

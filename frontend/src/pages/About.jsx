const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About LapMart</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted destination for premium laptops since 2020
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                At LapMart, we believe everyone deserves access to high-quality technology. 
                We're committed to providing premium laptops at competitive prices, backed by 
                exceptional customer service.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Since our founding in 2020, we've helped thousands of customers find the 
                perfect laptop for their needs - whether it's for work, gaming, or creative projects.
              </p>
              <p className="text-lg text-gray-700">
                We carefully curate our product selection to ensure every laptop meets our 
                high standards for quality, performance, and value.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" 
                alt="Team working together"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                Every product we sell is thoroughly tested and verified to ensure it meets 
                our strict quality standards.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focused</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're here to help you find the perfect 
                laptop and provide ongoing support.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                We understand you're excited about your new laptop. That's why we offer 
                fast, reliable shipping nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
              { name: 'Michael Chen', role: 'Head of Sales', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
              { name: 'Emily Rodriguez', role: 'Customer Support Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
              { name: 'David Kim', role: 'Tech Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Laptop?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust LapMart
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;

function HomePage() {
  const softwareServices = [
    {
      id: 1,
      title: "Web Development",
      expertise: "Full Stack Solutions",
      technologies: "React, Node.js, Python",
      deliverables: "Responsive websites, Web applications",
      timeframe: "2-6 months",
      description: "Custom web solutions tailored to your business needs with modern technologies and best practices."
    },
    {
      id: 2,
      title: "ERP Systems",
      expertise: "Enterprise Solutions",
      technologies: "SAP, Oracle, Custom Solutions",
      deliverables: "Integrated business management systems",
      timeframe: "6-12 months",
      description: "Comprehensive ERP solutions to streamline your business operations and improve efficiency."
    },
    {
      id: 3,
      title: "Mobile Applications",
      expertise: "Cross-platform Development",
      technologies: "React Native, Flutter, iOS/Android",
      deliverables: "Native and hybrid mobile apps",
      timeframe: "3-8 months",
      description: "Innovative mobile applications that provide seamless user experience across all platforms."
    },
    
  ];

  return (
    <div className="min-h-screen  bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-center pt-6 mb-12 text-orange-500 drop-shadow-lg">Our Software Development Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {softwareServices?.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-orange-100 backdrop-blur-sm"
            >
              <div className="border-b border-orange-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-orange-500 mb-3">{service.title}</h2>
                <p className="text-lg text-gray-700 font-medium">{service.expertise}</p>
              </div>
              <div className="space-y-5">
                <div className="bg-orange-50/70 p-4 rounded-xl">
                  <p className="text-gray-700">
                    <span className="font-semibold text-orange-500">Technologies:</span><br/>
                    {service.technologies}
                  </p>
                </div>
                <div className="bg-orange-50/70 p-4 rounded-xl">
                  <p className="text-gray-700">
                    <span className="font-semibold text-orange-500">Deliverables:</span><br/>
                    {service.deliverables}
                  </p>
                </div>
                <div className="bg-orange-50/70 p-4 rounded-xl">
                  <p className="text-gray-700">
                    <span className="font-semibold text-orange-500">Timeframe:</span><br/>
                    {service.timeframe}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-gray-500 italic leading-relaxed">{service.description}</p>
              <button className="mt-8 bg-gradient-to-r from-orange-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-orange-500 hover:to-orange-700 transition-all duration-300 w-full font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
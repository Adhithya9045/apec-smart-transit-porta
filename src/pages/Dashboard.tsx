import { Award, Shield, Bus, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const features = [
    {
      icon: Award,
      title: 'NAAC A++ Infrastructure',
      description: 'Accredited excellence with state-of-the-art campus facilities and modern amenities.',
      color: 'bg-blue-500 dark:bg-blue-600',
    },
    {
      icon: Shield,
      title: '24/7 Smart Surveillance',
      description: 'AI-powered security monitoring system ensuring complete campus safety.',
      color: 'bg-safety-orange',
    },
    {
      icon: Bus,
      title: 'Real-Time Fleet Tracking',
      description: 'Live GPS tracking of all campus transport with predictive arrival times.',
      color: 'bg-green-500 dark:bg-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Insights',
      description: 'Advanced analytics for optimized route planning and resource allocation.',
      color: 'bg-purple-500 dark:bg-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="relative bg-gradient-to-br from-deep-navy to-blue-900 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-12 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-safety-orange opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">AI-Driven Campus Logistics</h1>
          <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
            Transforming campus transportation with intelligent tracking, automated security,
            and seamless student services. Experience the future of academic mobility.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-safety-orange hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
              Get Started
            </button>
            <button className="border-2 border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
            >
              <div className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                <Icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-deep-navy to-blue-800 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-safety-orange">12</div>
            <div className="text-sm text-gray-300 mt-1">Active Buses</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">98.5%</div>
            <div className="text-sm text-gray-300 mt-1">On-Time Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400">2,847</div>
            <div className="text-sm text-gray-300 mt-1">Students Today</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-gray-300 mt-1">Monitoring</div>
          </div>
        </div>
      </div>
    </div>
  );
}

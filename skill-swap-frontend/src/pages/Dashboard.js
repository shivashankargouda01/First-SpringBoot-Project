import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-8">
      <main className="bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-4xl w-full p-12 text-center text-gray-900 font-sans">
        <h1 className="text-5xl font-extrabold mb-6 text-indigo-700 drop-shadow-lg">
          Welcome to Skill Swap
        </h1>
        <p className="text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          Connect, learn, and grow — one skill at a time. Skill Swap is a vibrant community empowering you to share your expertise and gain new skills through engaging one-on-one exchanges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <FeatureCard
            title="Discover Talents"
            icon="🔍"
            description="Explore diverse community profiles and find the perfect person to learn from or teach."
          />
          <FeatureCard
            title="Schedule Easily"
            icon="📅"
            description="Pick a convenient time for video exchanges and foster meaningful learning connections."
          />
          <FeatureCard
            title="Secure Meetings"
            icon="🔒"
            description="All interactions are conducted via secure video calls to ensure privacy and safety."
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ title, icon, description }) => (
  <div className="bg-indigo-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-default">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
    <p className="text-indigo-900">{description}</p>
  </div>
);

export default Dashboard;

import React from 'react';
import AudienceCreation from '../components/AudienceCreation';
import CampaignList from '../components/CampaignList';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <AudienceCreation />
      <CampaignList />
    </div>
  );
};

export default Dashboard;

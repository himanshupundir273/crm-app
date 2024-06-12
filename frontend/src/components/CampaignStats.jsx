import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';


const CampaignStats = ({ campaignId }) => {
  const [stats, setStats] = useState({ sent: 0, failed: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/campaigns/${campaignId}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching campaign stats:', error);
      }
    };

    fetchStats();
  }, [campaignId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Campaign Stats</h2>
      <p>Sent: {stats.sent}</p>
      <p>Failed: {stats.failed}</p>
    </div>
  );
};

export default CampaignStats;

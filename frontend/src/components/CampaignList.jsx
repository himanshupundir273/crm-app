import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';


const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <ul>
          {campaigns.map((campaign) => (
            <li key={campaign._id} className="mb-2 border p-2 rounded">
              <h3 className="font-bold">{campaign.name}</h3>
              <p>Audience Size: {campaign.audienceSize}</p>
              <p>Sent: {campaign.sent}</p>
              <p>Failed: {campaign.failed}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignList;

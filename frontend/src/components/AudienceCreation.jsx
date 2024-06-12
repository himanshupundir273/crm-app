import React, { useState } from 'react';
import axios from '../api/axiosConfig';


const AudienceCreation = () => {
  const [name, setName] = useState('');
  const [rules, setRules] = useState([]);
  const [audienceSize, setAudienceSize] = useState(0);

  const addRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const handleRuleChange = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);
  };

  const checkAudienceSize = async () => {
    try {
      const response = await axios.post('/api/campaigns/size', { rules });
      setAudienceSize(response.data.size);
    } catch (error) {
      console.error('Error fetching audience size:', error);
    }
  };

  const saveAudience = async () => {
    try {
      await axios.post('/api/campaigns/create', { name, rules });
      alert('Audience saved successfully!');
    } catch (error) {
      console.error('Error saving audience:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Audience</h2>
      <div className="mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Name"
        />
      </div>
      {rules.map((rule, index) => (
        <div key={index} className="mb-2">
          <select
            value={rule.field}
            onChange={(e) => handleRuleChange(index, 'field', e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="">Field</option>
            <option value="totalSpends">Total Spends</option>
            <option value="visits">Visits</option>
            <option value="lastVisit">Last Visit</option>
          </select>
          <select
            value={rule.operator}
            onChange={(e) => handleRuleChange(index, 'operator', e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="">Operator</option>
            <option value=">">Greater than</option>
            <option value="<">Less than</option>
          </select>
          <input
            type="text"
            value={rule.value}
            onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
            className="border p-2 mr-2"
            placeholder="Value"
          />
        </div>
      ))}
      <button onClick={addRule} className="bg-blue-500 text-white p-2 rounded mr-2">
        Add Rule
      </button>
      <button onClick={checkAudienceSize} className="bg-green-500 text-white p-2 rounded mr-2">
        Check Audience Size
      </button>
      <button onClick={saveAudience} className="bg-gray-500 text-white p-2 rounded">
        Save Audience
      </button>
      {audienceSize > 0 && <p className="mt-4">Audience Size: {audienceSize}</p>}
    </div>
  );
};

export default AudienceCreation;

import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { mockData, flattenData } from './mockData';

const App = () => {
  const [view, setView] = useState('orgs');
  const [activeWorkflow, setActiveWorkflow] = useState('all organizations');
  const [selectedItem, setSelectedItem] = useState(null);
  const [flatItems, setFlatItems] = useState({
    orgs: [],
    projects: [],
    repos: [],
    apps: []
  });

  useEffect(() => {
    setFlatItems(flattenData(mockData));
  }, []);

  const handleSelect = ({ type, item }) => {
    if (item) {
      setSelectedItem(item);
      setView(type);
      setActiveWorkflow('overview');
    } else {
      setSelectedItem(null);
      setView(type);
      setActiveWorkflow(`all ${type}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        user={mockData.user}
        items={flatItems}
        view={view}
        setActiveWorkflow={setActiveWorkflow}
        onSelect={handleSelect}
      />
      <MainView
        view={view}
        selectedItem={selectedItem}
        allItems={flatItems}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default App;
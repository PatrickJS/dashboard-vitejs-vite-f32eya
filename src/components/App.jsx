import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { mockFileSystem, flattenFileSystem } from '../utils/mockData';

const App = () => {
  const [currentNode, setCurrentNode] = useState(null);
  const [currentViewType, setCurrentViewType] = useState('organizations');
  const [flatItems, setFlatItems] = useState({
    organizations: [],
    projects: [],
    repositories: [],
    applications: []
  });

  useEffect(() => {
    const flattened = flattenFileSystem(mockFileSystem);
    setFlatItems(flattened);
    // Set the initial currentNode to the first organization
    if (flattened.organizations.length > 0) {
      setCurrentNode(flattened.organizations[0]);
    }
  }, []);

  const handleNavigate = (node) => {
    setCurrentNode(node);
    setCurrentViewType(node.tags[0]); // Assuming the first tag represents the node type
  };

  const handleViewAll = (viewType) => {
    setCurrentViewType(viewType);
    setCurrentNode(null); // Clear the current node when viewing all items of a type
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        items={flatItems}
        currentNode={currentNode}
        onNavigate={handleNavigate}
        onViewAll={handleViewAll}
      />
      <MainView
        currentNode={currentNode}
        currentViewType={currentViewType}
        items={flatItems[currentViewType]}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { mockFileSystem } from '../utils/mockData';

const App = () => {
  const [currentItem, setCurrentItem] = useState(mockFileSystem);

  const handleSelect = (item) => {
    setCurrentItem(item);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar tree={mockFileSystem} onSelect={handleSelect} />
      <MainView currentItem={currentItem} onNavigate={handleSelect} />
    </div>
  );
};

export default App;
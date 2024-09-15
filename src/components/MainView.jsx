import React from 'react';
import { Folder, GitBranch, Box, Building } from 'lucide-react';
import { getChildCounts } from '../utils/mockData';

const icons = {
  Folder,
  GitBranch,
  Box,
  Building
};

const GridItem = ({ item, onClick }) => {
  const Icon = icons[item.icon] || Folder;
  const counts = getChildCounts(item);

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onClick(item)}
    >
      <div className="flex items-center mb-2">
        <Icon className="mr-2 h-5 w-5" />
        <h3 className="text-lg font-semibold">{item.name}</h3>
      </div>
      <div className="text-sm">
        {item.type === 'group' && (
          <>
            <p>Groups: {counts.groups}</p>
            <p>Items: {counts.items}</p>
          </>
        )}
        {item.type === 'item' && item.metadata && (
          <>
            {Object.entries(item.metadata).slice(0, 3).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const GridView = ({ items, onItemClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item) => (
      <GridItem key={item.id} item={item} onClick={onItemClick} />
    ))}
  </div>
);

const ItemDetails = ({ item }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
    {item.metadata && Object.entries(item.metadata).map(([key, value]) => (
      <p key={key} className="mb-2">
        <span className="font-semibold">{key}:</span> {value}
      </p>
    ))}
    {item.children && item.children.length > 0 && (
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Subgroups and Items:</h3>
        <GridView items={item.children} onItemClick={() => {}} />
      </div>
    )}
  </div>
);

export const MainView = ({ currentItem, onNavigate }) => {
  const renderContent = () => {
    if (!currentItem) {
      return <p>Please select an item from the sidebar.</p>;
    }

    if (currentItem.type === 'item') {
      return <ItemDetails item={currentItem} />;
    }

    return <GridView items={currentItem.children || []} onItemClick={onNavigate} />;
  };

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">
        {currentItem ? currentItem.name : 'Dashboard'}
      </h2>
      {renderContent()}
    </div>
  );
};
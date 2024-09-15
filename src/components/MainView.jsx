import React from 'react';
import { Folder, GitBranch, Box } from 'lucide-react';

const GridItem = ({ item, onClick, icon: Icon }) => (
  <div 
    className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
    onClick={() => onClick(item)}
  >
    <div className="flex items-center mb-2">
      <Icon className="mr-2 h-5 w-5" />
      <h3 className="text-lg font-semibold">{item.name}</h3>
    </div>
    <div className="text-sm">
      {item.tags.includes('organization') && (
        <>
          <p>Members: {item.attributes.members}</p>
          <p>Billing Plan: {item.attributes.billingPlan}</p>
        </>
      )}
      {item.tags.includes('project') && (
        <>
          <p>Status: {item.attributes.status}</p>
          <p>Start Date: {item.attributes.startDate}</p>
        </>
      )}
      {item.tags.includes('repository') && (
        <>
          <p>Language: {item.attributes.language}</p>
          <p>Branches: {item.attributes.branches}</p>
        </>
      )}
      {item.tags.includes('application') && (
        <>
          <p>Status: {item.attributes.status}</p>
          <p>Instances: {item.attributes.instances}</p>
        </>
      )}
    </div>
  </div>
);

const GridView = ({ items, onItemClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item) => (
      <GridItem
        key={item.id}
        item={item}
        onClick={onItemClick}
        icon={item.tags.includes('application') ? Box : 
              item.tags.includes('repository') ? GitBranch : 
              Folder}
      />
    ))}
  </div>
);

const NodeDetails = ({ node }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">{node.name}</h2>
    {Object.entries(node.attributes).map(([key, value]) => (
      <p key={key} className="mb-2">
        <span className="font-semibold">{key}:</span> {value}
      </p>
    ))}
  </div>
);

export const MainView = ({ currentNode, currentViewType, items, onNavigate }) => {
  const renderContent = () => {
    if (currentNode) {
      return <NodeDetails node={currentNode} />;
    } else {
      return <GridView items={items} onItemClick={onNavigate} />;
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">
        {currentNode ? currentNode.name : `All ${currentViewType}`}
      </h2>
      {renderContent()}
    </div>
  );
};
import React, { useState } from 'react';
import { ChevronRight, Folder, GitBranch, Box, Settings, Users, DollarSign, Activity } from 'lucide-react';

const DropdownMenu = ({ title, items, onSelect, onViewAll, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <div className="flex items-center">
        <div
          className="flex-grow flex items-center p-2 cursor-pointer hover:bg-gray-700"
          onClick={() => onViewAll(title.toLowerCase())}
        >
          <Icon className="mr-2 h-4 w-4" />
          <span>{title}</span>
        </div>
        <div
          className="p-2 cursor-pointer hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-90' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className="pl-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => onSelect(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ConfigMenu = ({ currentNode }) => {
  const getConfigOptions = () => {
    if (currentNode.tags.includes('organization')) {
      return [
        { name: 'Overview', icon: Activity },
        { name: 'Members', icon: Users },
        { name: 'Billing', icon: DollarSign },
        { name: 'Settings', icon: Settings },
      ];
    } else if (currentNode.tags.includes('project')) {
      return [
        { name: 'Overview', icon: Activity },
        { name: 'Members', icon: Users },
        { name: 'Settings', icon: Settings },
      ];
    } else if (currentNode.tags.includes('repository')) {
      return [
        { name: 'Overview', icon: Activity },
        { name: 'Branches', icon: GitBranch },
        { name: 'Settings', icon: Settings },
      ];
    } else if (currentNode.tags.includes('application')) {
      return [
        { name: 'Overview', icon: Activity },
        { name: 'Metrics', icon: Activity },
        { name: 'Logs', icon: Activity },
        { name: 'Settings', icon: Settings },
      ];
    }
    return [];
  };

  const options = getConfigOptions();

  return (
    <div className="mt-4">
      <h3 className="text-sm uppercase mb-2 px-2">Configuration</h3>
      {options.map((option, index) => (
        <div key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-700">
          <option.icon className="mr-2 h-4 w-4" />
          <span>{option.name}</span>
        </div>
      ))}
    </div>
  );
};

export const Sidebar = ({ items, currentNode, onNavigate, onViewAll }) => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <DropdownMenu
          title="Organizations"
          items={items.organizations}
          onSelect={onNavigate}
          onViewAll={onViewAll}
          icon={Folder}
        />
        <DropdownMenu
          title="Projects"
          items={items.projects}
          onSelect={onNavigate}
          onViewAll={onViewAll}
          icon={Folder}
        />
        <DropdownMenu
          title="Repositories"
          items={items.repositories}
          onSelect={onNavigate}
          onViewAll={onViewAll}
          icon={GitBranch}
        />
        <DropdownMenu
          title="Applications"
          items={items.applications}
          onSelect={onNavigate}
          onViewAll={onViewAll}
          icon={Box}
        />
        {currentNode && <ConfigMenu currentNode={currentNode} />}
      </div>
    </div>
  );
};
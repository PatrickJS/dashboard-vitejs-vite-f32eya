import React, { useState } from 'react';
import { ChevronRight, Folder, GitBranch, Box, Building } from 'lucide-react';

const icons = {
  Folder,
  GitBranch,
  Box,
  Building
};

const SidebarItem = ({ item, onSelect, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = icons[item.icon] || Folder;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(item);
    if (item.children) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center p-2 cursor-pointer hover:bg-gray-700 ${
          level > 0 ? 'pl-' + level * 4 : ''
        }`}
        onClick={handleClick}
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{item.name}</span>
        {item.children && item.children.length > 0 && (
          <ChevronRight
            className={`ml-auto h-4 w-4 transition-transform ${
              isOpen ? 'transform rotate-90' : ''
            }`}
          />
        )}
      </div>
      {isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ tree, onSelect }) => {
  const renderItems = (items) => {
    return items.map((item) => (
      <SidebarItem key={item.id} item={item} onSelect={onSelect} />
    ));
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{tree.name}</h2>
        {renderItems(tree.children)}
      </div>
    </div>
  );
};
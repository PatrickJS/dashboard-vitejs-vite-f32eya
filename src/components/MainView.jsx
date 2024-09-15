import React from 'react';
import { Folder, GitBranch, Box, Users, DollarSign } from 'lucide-react';

const GridItem = ({ title, icon: Icon, onClick, children }) => (
  <div 
    className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
    onClick={onClick}
  >
    <div className="flex items-center mb-2">
      <Icon className="mr-2 h-5 w-5" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div className="text-sm">{children}</div>
  </div>
);

const GridView = ({ items, onItemClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item, index) => (
      <GridItem
        key={index}
        title={item.title}
        icon={item.icon}
        onClick={() => onItemClick(item.type, item)}
      >
        {item.content}
      </GridItem>
    ))}
  </div>
);

export const MainView = ({ view, selectedItem, allItems, onSelect }) => {
  const renderContent = () => {
    switch (view) {
      case 'orgs':
        return (
          <GridView
            items={allItems.orgs.map(org => ({
              title: org.name,
              icon: Folder,
              type: 'org',
              content: (
                <>
                  <p>Members: {org.members}</p>
                  <p>Billing Plan: {org.billingPlan}</p>
                </>
              )
            }))}
            onItemClick={onSelect}
          />
        );
      case 'projects':
        return (
          <GridView
            items={allItems.projects.map(project => ({
              title: project.name,
              icon: Folder,
              type: 'project',
              content: (
                <>
                  <p>Organization: {project.org}</p>
                  <p>Repos: {project.repos}</p>
                  <p>Apps: {project.apps}</p>
                </>
              )
            }))}
            onItemClick={onSelect}
          />
        );
      case 'repos':
        return (
          <GridView
            items={allItems.repos.map(repo => ({
              title: repo.name,
              icon: GitBranch,
              type: 'repo',
              content: (
                <>
                  <p>Project: {repo.project}</p>
                  <p>Branches: {repo.branches}</p>
                  <p>Pull Requests: {repo.pullRequests}</p>
                </>
              )
            }))}
            onItemClick={onSelect}
          />
        );
      case 'apps':
        return (
          <GridView
            items={allItems.apps.map(app => ({
              title: app.name,
              icon: Box,
              type: 'app',
              content: (
                <>
                  <p>Repository: {app.repo}</p>
                  <p>Status: {app.status}</p>
                  <p>Instances: {app.instances}</p>
                </>
              )
            }))}
            onItemClick={onSelect}
          />
        );
      case 'org':
      case 'project':
      case 'repo':
      case 'app':
        if (!selectedItem) {
          return <p>Please select an item to view details.</p>;
        }
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
            {Object.entries(selectedItem).map(([key, value]) => (
              <p key={key} className="mb-2">
                <span className="font-semibold">{key}:</span> {value}
              </p>
            ))}
          </div>
        );
      default:
        return <p>Select a view from the sidebar or choose an item to display.</p>;
    }
  };

  const getTitle = () => {
    if (selectedItem) {
      return selectedItem.name;
    }
    if (view && typeof view === 'string') {
      return view.charAt(0).toUpperCase() + view.slice(1);
    }
    return 'Dashboard';
  };

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">
        {getTitle()} Dashboard
      </h2>
      {renderContent()}
    </div>
  );
};
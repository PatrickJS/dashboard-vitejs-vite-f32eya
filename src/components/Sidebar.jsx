import React from 'react';
import { ChevronDown, User, Settings, Terminal, Database, Users, Globe, DollarSign, FileText, Activity, Folder, GitBranch, Box, Cloud } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';

const ProfileDropdown = ({ user, items, onSelect }) => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center p-4 w-full hover:bg-gray-700 transition-colors duration-200">
        <User className="mr-2 h-5 w-5" />
        <span className="flex-grow text-left">{user.name}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-gray-800 text-black">
        <DropdownMenuItem className="hover:bg-gray-700">
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700">
          <Settings className="mr-2 h-4 w-4" /> Account Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem onSelect={() => onSelect({ type: 'orgs', item: null })} className="hover:bg-gray-700">
          <Folder className="mr-2 h-4 w-4" /> Organizations
        </DropdownMenuItem>
        {items.orgs.map((org, index) => (
          <DropdownMenuItem key={`org-${index}`} onSelect={() => onSelect({ type: 'org', item: org })} className="pl-8 hover:bg-gray-700">
            {org.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem onSelect={() => onSelect({ type: 'projects', item: null })} className="hover:bg-gray-700">
          <Folder className="mr-2 h-4 w-4" /> Projects
        </DropdownMenuItem>
        {items.projects.map((proj, index) => (
          <DropdownMenuItem key={`proj-${index}`} onSelect={() => onSelect({ type: 'project', item: proj })} className="pl-8 hover:bg-gray-700">
            {proj.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem onSelect={() => onSelect({ type: 'repos', item: null })} className="hover:bg-gray-700">
          <GitBranch className="mr-2 h-4 w-4" /> Repositories
        </DropdownMenuItem>
        {items.repos.map((repo, index) => (
          <DropdownMenuItem key={`repo-${index}`} onSelect={() => onSelect({ type: 'repo', item: repo })} className="pl-8 hover:bg-gray-700">
            {repo.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem onSelect={() => onSelect({ type: 'apps', item: null })} className="hover:bg-gray-700">
          <Box className="mr-2 h-4 w-4" /> Apps
        </DropdownMenuItem>
        {items.apps.map((app, index) => (
          <DropdownMenuItem key={`app-${index}`} onSelect={() => onSelect({ type: 'app', item: app })} className="pl-8 hover:bg-gray-700">
            {app.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="hover:bg-gray-700">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
const SidebarContent = ({ view, setActiveWorkflow }) => {
  const workflowItems = {
    orgs: [
      { name: 'All Organizations', icon: Folder },
      { name: 'Add Organization', icon: Folder },
      { name: 'Organization Settings', icon: Settings },
    ],
    org: [
      { name: 'Overview', icon: Activity },
      { name: 'Members', icon: Users },
      { name: 'Billing', icon: DollarSign },
      { name: 'Settings', icon: Settings },
    ],
    projects: [
      { name: 'All Projects', icon: Folder },
      { name: 'Add Project', icon: Folder },
      { name: 'Project Settings', icon: Settings },
    ],
    project: [
      { name: 'Overview', icon: Activity },
      { name: 'Repositories', icon: GitBranch },
      { name: 'Members', icon: Users },
      { name: 'Environment', icon: Cloud },
      { name: 'Settings', icon: Settings },
    ],
    repos: [
      { name: 'All Repositories', icon: GitBranch },
      { name: 'Add Repository', icon: GitBranch },
      { name: 'Repository Settings', icon: Settings },
    ],
    repo: [
      { name: 'Overview', icon: Activity },
      { name: 'Code', icon: Terminal },
      { name: 'Pull Requests', icon: GitBranch },
      { name: 'Actions', icon: Activity },
      { name: 'Settings', icon: Settings },
    ],
    apps: [
      { name: 'All Apps', icon: Box },
      { name: 'Add App', icon: Box },
      { name: 'App Settings', icon: Settings },
    ],
    app: [
      { name: 'Overview', icon: Activity },
      { name: 'Logs', icon: FileText },
      { name: 'Metrics', icon: Activity },
      { name: 'Settings', icon: Settings },
    ],
  };

  const items = workflowItems[view] || [];

  return (
    <div className="mt-4">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center p-3 cursor-pointer hover:bg-gray-700"
          onClick={() => setActiveWorkflow(item.name.toLowerCase())}
        >
          <item.icon className="mr-2" />
          {item.name}
        </div>
      ))}
    </div>
  );
};


export const Sidebar = ({ user, items, view, setActiveWorkflow, onSelect }) => (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="sticky top-0 bg-gray-800 z-10 border-b border-gray-700">
        <ProfileDropdown user={user} items={items} onSelect={onSelect} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarContent view={view} setActiveWorkflow={setActiveWorkflow} />
      </div>
    </div>
  );
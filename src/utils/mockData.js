export const mockFileSystem = [
  {
    id: 'org1',
    name: 'Acme Corp',
    type: 'directory',
    tags: ['organization'],
    attributes: { members: 50, billingPlan: 'Enterprise', industry: 'Technology' },
    children: [
      {
        id: 'proj1',
        name: 'Project Alpha',
        type: 'directory',
        tags: ['project'],
        attributes: { status: 'Active', startDate: '2023-01-15', projectManager: 'Alice Johnson' },
        children: [
          {
            id: 'repo1',
            name: 'Frontend Repo',
            type: 'directory',
            tags: ['repository'],
            attributes: { language: 'JavaScript', branches: 3, pullRequests: 2, lastCommit: '2023-06-10' },
            children: [
              {
                id: 'app1',
                name: 'Web App',
                type: 'file',
                tags: ['application'],
                attributes: { status: 'Running', instances: 3, cpu: '60%', memory: '512MB', framework: 'React' }
              }
            ]
          },
          {
            id: 'repo2',
            name: 'Backend Repo',
            type: 'directory',
            tags: ['repository'],
            attributes: { language: 'Python', branches: 2, pullRequests: 1, lastCommit: '2023-06-09' },
            children: [
              {
                id: 'app2',
                name: 'API Server',
                type: 'file',
                tags: ['application'],
                attributes: { status: 'Running', instances: 2, cpu: '40%', memory: '256MB', framework: 'Flask' }
              }
            ]
          }
        ]
      },
      {
        id: 'proj2',
        name: 'Project Beta',
        type: 'directory',
        tags: ['project'],
        attributes: { status: 'Planning', startDate: '2023-07-01', projectManager: 'Bob Smith' },
        children: [
          {
            id: 'repo3',
            name: 'Mobile App Repo',
            type: 'directory',
            tags: ['repository'],
            attributes: { language: 'Swift', branches: 1, pullRequests: 0, lastCommit: '2023-06-08' },
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'org2',
    name: 'TechCo',
    type: 'directory',
    tags: ['organization'],
    attributes: { members: 25, billingPlan: 'Pro', industry: 'Finance' },
    children: [
      {
        id: 'proj3',
        name: 'Project Gamma',
        type: 'directory',
        tags: ['project'],
        attributes: { status: 'Active', startDate: '2023-03-01', projectManager: 'Charlie Brown' },
        children: [
          {
            id: 'repo4',
            name: 'Data Analytics Repo',
            type: 'directory',
            tags: ['repository'],
            attributes: { language: 'R', branches: 4, pullRequests: 3, lastCommit: '2023-06-11' },
            children: [
              {
                id: 'app3',
                name: 'Analytics Dashboard',
                type: 'file',
                tags: ['application'],
                attributes: { status: 'Running', instances: 1, cpu: '70%', memory: '1GB', framework: 'Shiny' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'org3',
    name: 'StartupX',
    type: 'directory',
    tags: ['organization'],
    attributes: { members: 10, billingPlan: 'Startup', industry: 'E-commerce' },
    children: [
      {
        id: 'proj4',
        name: 'Project Delta',
        type: 'directory',
        tags: ['project'],
        attributes: { status: 'Active', startDate: '2023-05-01', projectManager: 'David Wilson' },
        children: [
          {
            id: 'repo5',
            name: 'E-commerce Platform',
            type: 'directory',
            tags: ['repository'],
            attributes: { language: 'JavaScript', branches: 5, pullRequests: 4, lastCommit: '2023-06-12' },
            children: [
              {
                id: 'app4',
                name: 'Online Store',
                type: 'file',
                tags: ['application'],
                attributes: { status: 'Running', instances: 2, cpu: '55%', memory: '768MB', framework: 'Next.js' }
              },
              {
                id: 'app5',
                name: 'Inventory Management',
                type: 'file',
                tags: ['application'],
                attributes: { status: 'Running', instances: 1, cpu: '30%', memory: '256MB', framework: 'Express.js' }
              }
            ]
          }
        ]
      }
    ]
  }
];

export const getChildrenCount = (node, tag) => {
  if (!node.children) return 0;
  return node.children.filter(child => child.tags.includes(tag)).length;
};

export const flattenFileSystem = (fileSystem) => {
  const flatItems = {
    organizations: [],
    projects: [],
    repositories: [],
    applications: []
  };

  const traverse = (node) => {
    if (node.tags.includes('organization')) flatItems.organizations.push(node);
    if (node.tags.includes('project')) flatItems.projects.push(node);
    if (node.tags.includes('repository')) flatItems.repositories.push(node);
    if (node.tags.includes('application')) flatItems.applications.push(node);

    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  fileSystem.forEach(traverse);
  return flatItems;
};

export const findNodeById = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const getNodePath = (nodes, id, path = []) => {
  for (const node of nodes) {
    if (node.id === id) return [...path, node];
    if (node.children) {
      const newPath = getNodePath(node.children, id, [...path, node]);
      if (newPath) return newPath;
    }
  }
  return null;
};

export const getParentNode = (nodes, id) => {
  for (const node of nodes) {
    if (node.children) {
      if (node.children.some(child => child.id === id)) return node;
      const found = getParentNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
};
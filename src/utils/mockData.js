export const mockFileSystem = {
  id: 'root',
  name: 'Dashboard',
  type: 'root',
  children: [
    {
      id: 'orgs',
      name: 'Organizations',
      type: 'group',
      icon: 'Building',
      children: [
        {
          id: 'org1',
          name: 'Acme Corp',
          type: 'item',
          icon: 'Building',
          metadata: {
            members: 50,
            billingPlan: 'Enterprise',
            industry: 'Technology'
          },
          children: [
            {
              id: 'org1_projects',
              name: 'Projects',
              type: 'group',
              icon: 'Folder',
              children: [
                {
                  id: 'proj1',
                  name: 'Project Alpha',
                  type: 'item',
                  icon: 'Folder',
                  metadata: {
                    status: 'Active',
                    startDate: '2023-01-15',
                    projectManager: 'Alice Johnson'
                  },
                  children: [
                    {
                      id: 'proj1_repos',
                      name: 'Repositories',
                      type: 'group',
                      icon: 'GitBranch',
                      children: [
                        {
                          id: 'repo1',
                          name: 'Frontend Repo',
                          type: 'item',
                          icon: 'GitBranch',
                          metadata: {
                            language: 'JavaScript',
                            branches: 3,
                            pullRequests: 2,
                            lastCommit: '2023-06-10'
                          },
                          children: [
                            {
                              id: 'repo1_apps',
                              name: 'Applications',
                              type: 'group',
                              icon: 'Box',
                              children: [
                                {
                                  id: 'app1',
                                  name: 'Web App',
                                  type: 'item',
                                  icon: 'Box',
                                  metadata: {
                                    status: 'Running',
                                    instances: 3,
                                    cpu: '60%',
                                    memory: '512MB',
                                    framework: 'React'
                                  }
                                },
                                {
                                  id: 'app2',
                                  name: 'Mobile App',
                                  type: 'item',
                                  icon: 'Box',
                                  metadata: {
                                    status: 'Development',
                                    instances: 1,
                                    cpu: '30%',
                                    memory: '256MB',
                                    framework: 'React Native'
                                  }
                                }
                              ]
                            }
                          ]
                        },
                        {
                          id: 'repo2',
                          name: 'Backend Repo',
                          type: 'item',
                          icon: 'GitBranch',
                          metadata: {
                            language: 'Python',
                            branches: 2,
                            pullRequests: 1,
                            lastCommit: '2023-06-09'
                          },
                          children: [
                            {
                              id: 'repo2_apps',
                              name: 'Applications',
                              type: 'group',
                              icon: 'Box',
                              children: [
                                {
                                  id: 'app3',
                                  name: 'API Server',
                                  type: 'item',
                                  icon: 'Box',
                                  metadata: {
                                    status: 'Running',
                                    instances: 2,
                                    cpu: '40%',
                                    memory: '1GB',
                                    framework: 'Flask'
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'proj2',
                  name: 'Project Beta',
                  type: 'item',
                  icon: 'Folder',
                  metadata: {
                    status: 'Planning',
                    startDate: '2023-07-01',
                    projectManager: 'Bob Smith'
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 'org2',
          name: 'TechCo',
          type: 'item',
          icon: 'Building',
          metadata: {
            members: 25,
            billingPlan: 'Pro',
            industry: 'Finance'
          },
          children: [
            {
              id: 'org2_projects',
              name: 'Projects',
              type: 'group',
              icon: 'Folder',
              children: [
                {
                  id: 'proj3',
                  name: 'Project Gamma',
                  type: 'item',
                  icon: 'Folder',
                  metadata: {
                    status: 'Active',
                    startDate: '2023-03-01',
                    projectManager: 'Charlie Brown'
                  },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const flattenFileSystem = (node, path = []) => {
  const result = {
    id: node.id,
    name: node.name,
    type: node.type,
    icon: node.icon,
    path: [...path, node.name],
    metadata: node.metadata || {}
  };

  if (node.children) {
    result.children = node.children.map(child => 
      flattenFileSystem(child, [...path, node.name])
    );
  }

  return result;
};

export const findNodeById = (tree, id) => {
  if (tree.id === id) return tree;
  if (tree.children) {
    for (let child of tree.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
};

export const getChildCounts = (node) => {
  const counts = {
    groups: 0,
    items: 0
  };

  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'group') {
        counts.groups++;
      } else if (child.type === 'item') {
        counts.items++;
      }
    });
  }

  return counts;
};
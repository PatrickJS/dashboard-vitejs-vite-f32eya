export const mockData = {
    user: { name: 'John Doe', email: 'john@example.com' },
    orgs: [
      { name: 'Acme Corp', members: 50, billingPlan: 'Enterprise' },
      { name: 'TechCo', members: 25, billingPlan: 'Pro' }
    ],
    projects: [
      { name: 'Project A', org: 'Acme Corp', repos: 5, apps: 3 },
      { name: 'Project B', org: 'Acme Corp', repos: 3, apps: 2 },
      { name: 'Project X', org: 'TechCo', repos: 2, apps: 1 }
    ],
    repos: [
      { name: 'Frontend Repo', project: 'Project A', branches: 3, pullRequests: 2 },
      { name: 'Backend Repo', project: 'Project A', branches: 2, pullRequests: 1 },
      { name: 'Mobile Repo', project: 'Project B', branches: 4, pullRequests: 3 },
      { name: 'Data Repo', project: 'Project X', branches: 2, pullRequests: 1 }
    ],
    apps: [
      { name: 'Web App', repo: 'Frontend Repo', status: 'Running', instances: 3, cpu: '60%', memory: '512MB' },
      { name: 'API Server', repo: 'Backend Repo', status: 'Running', instances: 2, cpu: '40%', memory: '256MB' },
      { name: 'Mobile Backend', repo: 'Mobile Repo', status: 'Running', instances: 1, cpu: '30%', memory: '128MB' },
      { name: 'ETL Service', repo: 'Data Repo', status: 'Running', instances: 2, cpu: '70%', memory: '1GB' }
    ]
  };
  
  export const flattenData = (data) => {
    return {
      orgs: data.orgs,
      projects: data.projects,
      repos: data.repos,
      apps: data.apps
    };
  };
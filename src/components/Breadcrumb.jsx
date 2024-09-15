import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Breadcrumb = ({ path, onNavigate }) => {
  return null;
  return (
  <div className="flex items-center mb-4">
    {path.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <ChevronRight className="mx-2" />}
        <span
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={() => onNavigate(item.type, item.name)}
        >
          {item.name}
        </span>
      </React.Fragment>
    ))}
  </div>
  );
};
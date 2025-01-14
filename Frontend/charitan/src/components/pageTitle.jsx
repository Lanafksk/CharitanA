import React from 'react';

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-3xl" style={{ color: '#7D7D7D' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
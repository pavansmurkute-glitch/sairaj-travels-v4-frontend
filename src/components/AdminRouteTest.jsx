import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const AdminRouteTest = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Route Test</h1>
        <div className="space-y-2 text-sm">
          <p><strong>Current Path:</strong> {location.pathname}</p>
          <p><strong>Token:</strong> {token || 'No token provided'}</p>
          <p><strong>Search Params:</strong> {location.search}</p>
          <p><strong>Hash:</strong> {location.hash}</p>
        </div>
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          <p className="text-green-800 text-sm">
            ✅ Admin routing is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRouteTest;

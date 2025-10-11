import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminSetup = () => {
  const navigate = useNavigate();
  const [showCredentials, setShowCredentials] = useState(false);

  const handleLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Setup</h1>
          <p className="text-gray-600">Your admin panel is ready to use</p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">🔐 Default Admin Credentials</h3>
            <p className="text-blue-800 text-sm mb-3">
              Use these credentials for your first login. You'll be prompted to change your password immediately.
            </p>
            
            {showCredentials ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white p-2 rounded border">
                  <span className="text-sm font-medium text-gray-700">Username:</span>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">admin</code>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded border">
                  <span className="text-sm font-medium text-gray-700">Password:</span>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">admin123</code>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCredentials(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Show Credentials
              </button>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ Security Notice</h3>
            <p className="text-yellow-800 text-sm">
              After logging in, you must change your password immediately for security reasons. 
              You can also create additional admin users from the User Management section.
            </p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Admin Login
          </button>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSetup;

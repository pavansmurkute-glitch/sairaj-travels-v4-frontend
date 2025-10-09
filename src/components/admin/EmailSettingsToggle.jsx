import React, { useState, useEffect } from 'react';

const EmailSettingsToggle = ({ token }) => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sairaj-travels-v5-backend.onrender.com/api';

  // Fetch current email status
  useEffect(() => {
    fetchEmailStatus();
  }, []);

  const fetchEmailStatus = async () => {
    try {
      setLoadingStatus(true);
      const response = await fetch(`${API_BASE_URL}/admin/email-settings/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmailEnabled(data.emailEnabled);
      } else {
        alert('Failed to fetch email status');
      }
    } catch (error) {
      console.error('Error fetching email status:', error);
      alert('Error fetching email status');
    } finally {
      setLoadingStatus(false);
    }
  };

  const toggleEmailEnabled = async () => {
    try {
      setLoading(true);
      
      // Debug: Check if token exists
      if (!token) {
        alert('No authentication token found. Please login again.');
        return;
      }
      
      console.log('Token being sent:', token);
      console.log('API URL:', `${API_BASE_URL}/admin/email-settings/toggle`);
      
      const response = await fetch(`${API_BASE_URL}/admin/email-settings/toggle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled: !emailEnabled }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        setEmailEnabled(!emailEnabled);
        alert(data.message);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        alert(`Failed to toggle email settings: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error toggling email settings:', error);
      alert(`Error toggling email settings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testEmailConfiguration = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/email-settings/test`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Email test failed');
      }
    } catch (error) {
      console.error('Error testing email configuration:', error);
      alert('Error testing email configuration');
    } finally {
      setLoading(false);
    }
  };

  if (loadingStatus) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📧 Email Settings
      </h3>
      
      <div className="space-y-4">
        {/* Email Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Service
            </label>
            <p className="text-xs text-gray-500">
              {emailEnabled 
                ? 'Emails are being sent to customers and admins' 
                : 'Email service is disabled - no emails will be sent'}
            </p>
          </div>
          
          <button
            onClick={toggleEmailEnabled}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              emailEnabled ? 'bg-indigo-600' : 'bg-gray-200'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                emailEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${emailEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm font-medium ${emailEnabled ? 'text-green-700' : 'text-red-700'}`}>
            {emailEnabled ? 'Email Service Active' : 'Email Service Disabled'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t">
          <button
            onClick={testEmailConfiguration}
            disabled={loading || !emailEnabled}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              loading || !emailEnabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Testing...' : 'Test Email'}
          </button>
          
          <button
            onClick={fetchEmailStatus}
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              loading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
            }`}
          >
            Refresh Status
          </button>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 pt-2 border-t">
          <p>
            <strong>Note:</strong> When disabled, contact form submissions and admin notifications 
            will not be sent via email. The system will continue to log email attempts for debugging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSettingsToggle;

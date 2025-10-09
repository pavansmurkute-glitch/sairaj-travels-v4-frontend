import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const EmailSettingsToggle = ({ token }) => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Fetch current email status
  useEffect(() => {
    fetchEmailStatus();
  }, []);

  const fetchEmailStatus = async () => {
    try {
      setLoadingStatus(true);
      const response = await fetch('/api/admin/email-settings/status', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmailEnabled(data.emailEnabled);
      } else {
        toast.error('Failed to fetch email status');
      }
    } catch (error) {
      console.error('Error fetching email status:', error);
      toast.error('Error fetching email status');
    } finally {
      setLoadingStatus(false);
    }
  };

  const toggleEmailEnabled = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/email-settings/toggle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled: !emailEnabled }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmailEnabled(!emailEnabled);
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to toggle email settings');
      }
    } catch (error) {
      console.error('Error toggling email settings:', error);
      toast.error('Error toggling email settings');
    } finally {
      setLoading(false);
    }
  };

  const testEmailConfiguration = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/email-settings/test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Email test failed');
      }
    } catch (error) {
      console.error('Error testing email configuration:', error);
      toast.error('Error testing email configuration');
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

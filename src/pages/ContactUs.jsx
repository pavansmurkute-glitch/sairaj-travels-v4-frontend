import { useState, useEffect, useCallback } from "react";
import api, { apiMethods } from "../services/api";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  Clock,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "phosphor-react";
import { useOverlay } from "../context/OverlayContext"; // ✅ import overlay

export default function ContactUs() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

    const { processing } = useOverlay();

  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Fetch data from backend (contact info)
   useEffect(() => {
     const fetchData = async () => {
       try {
         console.log('🔍 ContactUs: Fetching contact info...');
         console.log('🌐 API Base URL:', import.meta.env.VITE_API_URL);
         console.log('📡 Full URL will be:', `${import.meta.env.VITE_API_URL}/api/contact`);
         
         const res = await apiMethods.get("/contact");
         const data = res.data;
         console.log('✅ ContactUs: Contact info received:', data);
         setContact(data);
       } catch (err) {
         console.error("❌ ContactUs: Error fetching contact info:", err);
         console.error('📊 ContactUs: Error Details:', {
           message: err.message,
           status: err.response?.status,
           statusText: err.response?.statusText,
           data: err.response?.data,
           config: {
             url: err.config?.url,
             baseURL: err.config?.baseURL,
             method: err.config?.method
           },
           request: err.request ? 'Network request made but no response' : 'No network request made'
         });
       } finally {
         setLoading(false);
       }
     };
     fetchData();
   }, []);

  // ✅ Handle input change
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");

    try {
      const response = await apiMethods.post("/contact-messages", formData, {
        showSuccessMessage: false
      });

      setFeedback("✅ Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setFeedback("⚠️ Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-semibold text-sm">Error Loading Contact Info</p>
            <p className="text-xs">Failed to load contact information. Please try again later.</p>
          </div>
          
          {/* Debug Information */}
          <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg text-left">
            <p className="font-semibold text-sm mb-2">Debug Information:</p>
            <div className="text-xs space-y-1">
              <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}</p>
              <p><strong>Expected URL:</strong> {import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/contact` : 'Not available'}</p>
              <p><strong>Loading State:</strong> {loading ? 'Loading...' : 'Failed to load'}</p>
              <p className="mt-2 text-gray-600">Check browser console (F12) for detailed error logs.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Consistent with App theme */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Ready to plan your next journey? Our travel experts are here to provide personalized service and make your travel dreams come true.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a 
                href={`tel:${contact.phoneMobile}`}
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone size={20} className="mr-2" />
                Call Now
              </a>
              <a 
                href={`https://wa.me/${contact.phoneWhatsapp?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
              <a 
                href={`mailto:${contact.emailPrimary}`}
                className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <EnvelopeSimple size={20} className="mr-2" />
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Information Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're here to help you plan the perfect trip. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Numbers */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Phone size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Phone Numbers</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Office</p>
                  <a href={`tel:${contact.phoneOffice}`} className="text-blue-600 font-semibold text-sm hover:text-blue-800">
                    {contact.phoneOffice}
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Mobile</p>
                  <a href={`tel:${contact.phoneMobile}`} className="text-blue-600 font-semibold text-sm hover:text-blue-800">
                    {contact.phoneMobile}
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">WhatsApp</p>
                  <a 
                    href={`https://wa.me/${contact.phoneWhatsapp?.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 font-semibold text-sm hover:text-green-800"
                  >
                    {contact.phoneWhatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <EnvelopeSimple size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Email Addresses</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">General Inquiries</p>
                  <a href={`mailto:${contact.emailPrimary}`} className="text-red-600 text-sm hover:text-red-800 break-all">
                    {contact.emailPrimary}
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Bookings</p>
                  <a href={`mailto:${contact.emailBookings}`} className="text-red-600 text-sm hover:text-red-800 break-all">
                    {contact.emailBookings}
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Support</p>
                  <a href={`mailto:${contact.emailSupport}`} className="text-red-600 text-sm hover:text-red-800 break-all">
                    {contact.emailSupport}
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <Clock size={24} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Monday - Saturday</p>
                  <p className="text-gray-700 text-sm">{contact.businessHoursWeekdays}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Sunday</p>
                  <p className="text-gray-700 text-sm">{contact.businessHoursSunday}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <MapPin size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Office Address</h3>
              </div>
              <div className="text-gray-700 text-sm">
                <p>{contact.addressLine1}</p>
                <p>{contact.addressLine2}</p>
                <p>{contact.addressCity}, {contact.addressState}</p>
                <p className="font-medium">{contact.addressPincode}</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href={contact.socialFacebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <FacebookLogo size={24} className="text-white" />
                </a>
                <a
                  href={contact.socialInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <InstagramLogo size={24} className="text-white" />
                </a>
                <a
                  href={contact.socialLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <LinkedinLogo size={24} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visit our office or get directions to our location.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="h-96 w-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Our Location</h3>
                <p className="text-gray-600 mb-4">
                  📍 {contact?.addressLine1}, {contact?.addressCity}, {contact?.addressState} {contact?.addressPincode}
                </p>
                <a 
                  href="https://maps.app.goo.gl/YYjhqh5xKXiQ9rhy8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">
                Click the button above to get directions to our location
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form - Full Width */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Have a specific travel request or question? Fill out the form below and our travel experts will get back to you within 24 hours.
            </p>
          </div>
          
          <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base mobile-input"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base mobile-input"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base mobile-input"
                autoComplete="tel"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                name="message"
                placeholder="Tell us about your travel requirements, destinations, dates, and any special requests..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-base mobile-input"
                autoComplete="off"
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white py-4 px-12 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mobile-button min-h-[48px] min-w-[120px]"
              >
                {submitting ? "Sending Message..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Feedback */}
          {feedback && (
            <div className={`mt-6 p-4 rounded-lg text-center font-medium max-w-2xl mx-auto ${
              feedback.includes('✅') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : feedback.includes('❌') || feedback.includes('⚠️')
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-gray-50 text-gray-800 border border-gray-200'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      </div>

      {/* Professional Floating Contact Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <a
          href={`tel:${contact.phoneOffice}`}
          className="bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          title="Call Office"
        >
          <Phone size={20} color="white" />
        </a>
        <a
          href={`mailto:${contact.emailPrimary}`}
          className="bg-red-500 p-4 rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
          title="Send Email"
        >
          <EnvelopeSimple size={20} color="white" />
        </a>
        <a
          href={`https://wa.me/${contact.phoneWhatsapp?.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
          title="WhatsApp"
        >
          <WhatsappLogo size={20} color="white" />
        </a>
      </div>
    </div>
  );
}
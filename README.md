# 🚌 Sairaj Travels - Frontend Application

A modern, responsive travel booking platform built with React and Vite.

## 🌟 Features

- **Modern UI/UX**: Clean, professional design with Tailwind CSS
- **Responsive Design**: Mobile-first approach for all devices
- **Fast Performance**: Optimized with Vite and code splitting
- **Admin Panel**: Complete management system for bookings, vehicles, and users
- **Real-time Updates**: Live data synchronization with backend
- **Interactive Maps**: Trip planning with Leaflet integration
- **Booking System**: Complete reservation workflow
- **Gallery & Testimonials**: Dynamic content management

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 7
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Maps**: Leaflet & React Leaflet
- **Icons**: Lucide React, Heroicons
- **Build Tool**: Vite with Terser optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pavansmurkute-glitch/sairaj-travels-v4-frontend.git

# Navigate to project directory
cd sairaj-travels-v4-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── services/           # API services
├── context/            # React context providers
├── assets/             # Static assets
├── config/             # Configuration files
└── main.jsx           # Application entry point
```

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Deployment Platforms
- **Render.com**: Use `render.yaml` configuration
- **Vercel**: Use `vercel.json` configuration  
- **Netlify**: Use `netlify.toml` configuration
- **Docker**: Use `Dockerfile` for containerized deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔧 Configuration

### Environment Variables
```bash
# Development
VITE_API_URL=http://localhost:8080

# Production  
VITE_API_URL=https://sairaj-travels-backend.onrender.com
```

### API Integration
- Backend API: `https://sairaj-travels-backend.onrender.com`
- Endpoints: `/api/*`
- Authentication: JWT-based
- CORS: Configured for production domains

## 📱 Features Overview

### Public Pages
- **Home**: Hero section, features, testimonials
- **About**: Company information and team
- **Services**: Travel services and packages
- **Fleet**: Vehicle showcase and details
- **Gallery**: Photo gallery and videos
- **Contact**: Contact form and information
- **Booking**: Trip booking system
- **Trip Planner**: Interactive route planning

### Admin Panel
- **Dashboard**: Analytics and overview
- **Bookings**: Manage reservations
- **Vehicles**: Fleet management
- **Drivers**: Driver profiles and schedules
- **Packages**: Travel packages
- **Users**: User management
- **Reports**: Analytics and insights

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Yellow (#facc15)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Inter, system fonts
- **Body**: Inter, system fonts
- **Sizes**: Responsive scale (sm, base, lg, xl, 2xl)

## 📊 Performance

### Optimization Features
- ✅ Code splitting by routes
- ✅ Lazy loading for components
- ✅ Image optimization
- ✅ CSS purging
- ✅ Tree shaking
- ✅ Gzip compression
- ✅ Browser caching

### Bundle Analysis
- **Vendor**: React, React DOM
- **Router**: React Router components
- **UI**: Framer Motion animations
- **Maps**: Leaflet integration
- **Utils**: Axios, PDF generation

## 🔒 Security

### Security Headers
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content Security Policy
- Referrer Policy

### Authentication
- JWT token-based authentication
- Secure API endpoints
- Role-based access control
- Session management

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Responsive design on all devices
- [ ] Form submissions work
- [ ] API integration functional
- [ ] Admin panel accessible
- [ ] Booking flow complete
- [ ] Image loading optimized
- [ ] Performance metrics good

## 📞 Support

### Development Team
- **Repository**: [sairaj-travels-v4-frontend](https://github.com/pavansmurkute-glitch/sairaj-travels-v4-frontend.git)
- **Backend API**: [sairaj-travels-backend](https://sairaj-travels-backend.onrender.com)

### Documentation
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./API.md)
- [Component Library](./COMPONENTS.md)

## 📄 License

This project is proprietary software for Sairaj Travels.

---

**Built with ❤️ for Sairaj Travels** 🚌
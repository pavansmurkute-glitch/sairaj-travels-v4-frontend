# 🚀 Production Deployment Guide

## Overview
This guide covers deploying the Sairaj Travels Frontend to production using multiple platforms.

## 📋 Prerequisites
- Node.js 18+ installed
- Git configured
- GitHub repository access
- Backend API running at `https://sairaj-travels-backend.onrender.com`

## 🛠️ Build Configuration

### Environment Variables
- **Development**: `VITE_API_URL=http://localhost:8080`
- **Production**: `VITE_API_URL=https://sairaj-travels-backend.onrender.com`

### Production Optimizations
- ✅ Console logs removed
- ✅ Code minification with Terser
- ✅ Chunk splitting for better caching
- ✅ Gzip compression enabled
- ✅ Static asset optimization

## 🚀 Deployment Options

### 1. Render.com (Recommended)
```bash
# Connect your GitHub repository
# Repository: https://github.com/pavansmurkute-glitch/sairaj-travels-v4-frontend.git
# Build Command: npm install && npm run build
# Publish Directory: dist
# Environment Variables:
#   - VITE_API_URL: https://sairaj-travels-backend.onrender.com
#   - NODE_ENV: production
```

### 2. Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Or connect GitHub repository in Vercel dashboard
```

### 3. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist

# Or connect GitHub repository in Netlify dashboard
```

### 4. Docker Deployment
```bash
# Build Docker image
docker build -t sairaj-travels-frontend .

# Run container
docker run -p 80:80 sairaj-travels-frontend
```

## 📁 Deployment Files Created

### Core Files
- `render.yaml` - Render.com configuration
- `vercel.json` - Vercel configuration  
- `netlify.toml` - Netlify configuration
- `Dockerfile` - Docker container setup
- `nginx.conf` - Nginx server configuration

### CI/CD
- `.github/workflows/deploy.yml` - GitHub Actions workflow

## 🔧 Local Production Testing

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Test with production API
VITE_API_URL=https://sairaj-travels-backend.onrender.com npm run build
```

## 📊 Performance Metrics

### Build Output
- **Total Size**: ~6.5MB (uncompressed)
- **Gzipped**: ~1.2MB
- **Chunks**: Optimized for caching
- **Assets**: Compressed and optimized

### Optimization Features
- ✅ Code splitting by feature
- ✅ Lazy loading for routes
- ✅ Image optimization
- ✅ CSS purging
- ✅ Tree shaking

## 🌐 Domain Configuration

### Custom Domain Setup
1. Configure DNS records
2. Set up SSL certificate
3. Update CORS settings in backend
4. Test all functionality

### Environment-Specific URLs
- **Development**: `http://localhost:5173`
- **Staging**: `https://sairaj-travels-frontend-staging.onrender.com`
- **Production**: `https://sairaj-travels-frontend.onrender.com`

## 🔍 Monitoring & Analytics

### Health Checks
- API connectivity status
- Asset loading performance
- Error tracking
- User analytics

### Performance Monitoring
- Core Web Vitals
- Loading times
- Bundle size tracking
- Error rates

## 🚨 Troubleshooting

### Common Issues
1. **API Connection Failed**
   - Check backend server status
   - Verify CORS configuration
   - Test API endpoints

2. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies

3. **Routing Issues**
   - Ensure SPA routing is configured
   - Check server configuration
   - Verify redirect rules

## 📞 Support

For deployment issues:
- Check GitHub repository: [sairaj-travels-v4-frontend](https://github.com/pavansmurkute-glitch/sairaj-travels-v4-frontend.git)
- Review deployment logs
- Test locally first
- Verify environment variables

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Production build tested
- [ ] API connectivity verified
- [ ] All routes working
- [ ] Assets loading correctly
- [ ] Mobile responsiveness tested
- [ ] Performance optimized
- [ ] SSL certificate configured
- [ ] Domain DNS configured
- [ ] Monitoring setup complete

---

**Ready for Production! 🎉**

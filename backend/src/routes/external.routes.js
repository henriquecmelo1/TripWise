import express from 'express';
import ExternalAPIsService from '../services/externalAPIs.js';

const router = express.Router();
const externalAPIs = new ExternalAPIsService();

/**
 * POST /api/external/photos
 * Get destination photos from Unsplash
 * 
 * Body:
 * {
 *   "destination": "Paris",
 *   "count": 3,
 *   "query": "paris travel destination" (optional)
 * }
 */
router.post('/photos', async (req, res) => {
  try {
    const { destination, count = 3, query } = req.body;

    // Validate required fields
    if (!destination) {
      return res.status(400).json({
        success: false,
        error: 'Destination is required',
        message: 'Please provide a destination name to search for photos'
      });
    }

    // Validate count parameter
    const photoCount = Math.min(Math.max(parseInt(count) || 3, 1), 10);

    console.log(`📸 Fetching ${photoCount} photos for destination: ${destination}`);

    // Get photos from Unsplash
    const result = await externalAPIs.getDestinationPhotos(destination, photoCount, query);

    if (result.success) {
      console.log(`✅ Successfully fetched ${result.photos.length} photos for ${destination}`);
      
      res.json({
        success: true,
        photos: result.photos,
        total: result.total,
        source: result.source,
        query: result.query,
        destination,
        timestamp: new Date().toISOString()
      });
    } else {
      console.warn(`⚠️  Failed to fetch photos for ${destination}:`, result.error);
      
      // Return error but still provide empty photos array for graceful handling
      res.status(200).json({
        success: false,
        error: result.error,
        details: result.details,
        photos: [],
        destination,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('❌ Error in photos endpoint:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error while fetching photos',
      details: error.message,
      photos: [],
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/external/photos/status
 * Check if Unsplash API is available
 */
router.get('/photos/status', (req, res) => {
  try {
    const isAvailable = externalAPIs.isUnsplashAvailable();
    
    res.json({
      success: true,
      unsplashAvailable: isAvailable,
      message: isAvailable 
        ? 'Unsplash API is configured and ready' 
        : 'Unsplash API key not configured',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error checking Unsplash status:', error);
    
    res.status(500).json({
      success: false,
      error: 'Error checking API status',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/external/health
 * Health check endpoint for external APIs
 */
router.get('/health', (req, res) => {
  try {
    const services = {
      unsplash: externalAPIs.isUnsplashAvailable(),
      weather: !!process.env.OPENWEATHER_API_KEY,
      places: !!process.env.FOURSQUARE_API_KEY,
      exchange: !!process.env.EXCHANGE_RATE_API_KEY,
    };

    const allServicesUp = Object.values(services).every(status => status);

    res.json({
      success: true,
      status: allServicesUp ? 'healthy' : 'partial',
      services,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in external health check:', error);
    
    res.status(500).json({
      success: false,
      error: 'Health check failed',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
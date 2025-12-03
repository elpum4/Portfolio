import { Injectable } from '@angular/core';

interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_PREFIX = 'api_cache_';
  private readonly CACHE_DURATION_DAYS = 30;
  private readonly CACHE_DURATION_MS = this.CACHE_DURATION_DAYS * 24 * 60 * 60 * 1000;

  constructor() {
    // Clean expired cache on service initialization
    this.cleanExpiredCache();
  }

  /**
   * Get cached data for a specific resource
   */
  get(resource: string): any | null {
    const cacheKey = this.getCacheKey(resource);
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) {
      return null;
    }

    try {
      const entry: CacheEntry = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is expired
      if (now > entry.expiresAt) {
        this.remove(resource);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Error parsing cache:', error);
      this.remove(resource);
      return null;
    }
  }

  /**
   * Set cache for a specific resource
   */
  set(resource: string, data: any): void {
    const cacheKey = this.getCacheKey(resource);
    const now = Date.now();
    
    const entry: CacheEntry = {
      data: data,
      timestamp: now,
      expiresAt: now + this.CACHE_DURATION_MS
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch (error) {
      console.error('Error saving to cache:', error);
      // If storage is full, try to clean expired cache and retry
      this.cleanExpiredCache();
      try {
        localStorage.setItem(cacheKey, JSON.stringify(entry));
      } catch (retryError) {
        console.error('Error saving to cache after cleanup:', retryError);
      }
    }
  }

  /**
   * Remove cache for a specific resource
   */
  remove(resource: string): void {
    const cacheKey = this.getCacheKey(resource);
    localStorage.removeItem(cacheKey);
  }

  /**
   * Invalidate cache for a resource and related resources
   */
  invalidate(resource: string): void {
    // Remove the specific resource cache
    this.remove(resource);
    
    // Also invalidate all individual resource caches (e.g., "experiencia_1", "experiencia_2", etc.)
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX + resource + '_')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log(`Cache invalidated for resource: ${resource} and related individual resources`);
  }

  /**
   * Clear all API cache
   */
  clearAll(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Clean expired cache entries
   */
  private cleanExpiredCache(): void {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    let cleaned = 0;

    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const entry: CacheEntry = JSON.parse(cached);
            if (now > entry.expiresAt) {
              localStorage.removeItem(key);
              cleaned++;
            }
          }
        } catch (error) {
          // If parsing fails, remove the corrupted entry
          localStorage.removeItem(key);
          cleaned++;
        }
      }
    });

    if (cleaned > 0) {
      console.log(`Cleaned ${cleaned} expired cache entries`);
    }
  }

  /**
   * Get cache key for a resource
   */
  private getCacheKey(resource: string): string {
    return `${this.CACHE_PREFIX}${resource}`;
  }

  /**
   * Extract resource name from URL
   * Returns resource key including ID if present (e.g., "experiencia_1" or "experiencia")
   */
  extractResourceFromUrl(url: string): string | null {
    // Extract resource from URL like /api/experiencia or /api/experiencia/1
    const match = url.match(/\/api\/([^\/]+)(?:\/(\d+))?/);
    if (match) {
      const resource = match[1];
      const id = match[2];
      // If ID is present, return "resource_id", otherwise just "resource"
      return id ? `${resource}_${id}` : resource;
    }
    return null;
  }
}


/**
 * Geolocation utility functions
 * For parsing and working with Rentman API geolocation data
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Parse geolocation string from Rentman API
 * Format: "latitude, longitude" (e.g., "51.557946, -0.091273")
 */
export function parseGeolocation(geolocation: string | null | undefined): Coordinates | null {
  if (!geolocation || typeof geolocation !== 'string') {
    return null;
  }

  const trimmed = geolocation.trim();
  if (trimmed === '') {
    return null;
  }

  // Split by comma and trim each part
  const parts = trimmed.split(',').map(part => part.trim());
  
  if (parts.length !== 2) {
    return null;
  }

  const latitude = parseFloat(parts[0]);
  const longitude = parseFloat(parts[1]);

  // Validate coordinates
  if (isNaN(latitude) || isNaN(longitude)) {
    return null;
  }

  // Validate ranges
  if (latitude < -90 || latitude > 90) {
    return null;
  }

  if (longitude < -180 || longitude > 180) {
    return null;
  }

  return { latitude, longitude };
}

/**
 * Check if a property has valid geolocation data
 */
export function hasGeolocation(property: { geolocation?: string | null }): boolean {
  return parseGeolocation(property.geolocation) !== null;
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(coords: Coordinates): string {
  return `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
}


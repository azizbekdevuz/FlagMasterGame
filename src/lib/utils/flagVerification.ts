/**
 * Flag image verification utilities
 * Verifies flag images exist and handles fallbacks
 */

import { Country } from '@/lib/types';
import { FLAG_IMAGE_BASE_PATH, FLAG_IMAGE_EXTENSION } from '@/lib/config/constants';

/**
 * Get the path to a flag image
 */
export function getFlagImagePath(countryCode: string): string {
  return `${FLAG_IMAGE_BASE_PATH}/${countryCode.toLowerCase()}${FLAG_IMAGE_EXTENSION}`;
}

/**
 * Verify if a flag image exists
 * Returns a promise that resolves to true if the image loads successfully
 */
export async function verifyFlagImage(countryCode: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = getFlagImagePath(countryCode);
  });
}

/**
 * Verify all flag images for a list of countries
 * Returns a map of country codes to verification status
 */
export async function verifyAllFlags(countries: Country[]): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();
  
  // Verify flags in batches to avoid overwhelming the browser
  const batchSize = 10;
  for (let i = 0; i < countries.length; i += batchSize) {
    const batch = countries.slice(i, i + batchSize);
    const promises = batch.map(async (country) => {
      const exists = await verifyFlagImage(country.code);
      results.set(country.code, exists);
      return exists;
    });
    await Promise.all(promises);
  }
  
  return results;
}

/**
 * Get a fallback flag image path or placeholder
 */
export function getFallbackFlagPath(): string {
  // Return a placeholder or default flag
  return `${FLAG_IMAGE_BASE_PATH}/unknown.png`;
}


import { cookies } from 'next/headers';
import axiosInstance from './axiosInstance';

interface FetchOptions {
  tags?: string[];
  revalidate?: number | false;
  cache?: RequestCache;
}

/**
 * Server-side fetch wrapper with Next.js caching support
 * Uses axios instance configuration (baseURL, auth pattern) but native fetch for caching
 */
export async function fetchServer(
  endpoint: string,
  options: FetchOptions & {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
    body?: any;
    params?: Record<string, any>;
  } = {}
): Promise<any> {
  const { tags, revalidate, cache, method = 'GET', body, params } = options;

  // Use axios instance's baseURL configuration
  let baseURL = axiosInstance.defaults.baseURL;
  if (!baseURL) {
    throw new Error('Base URL not configured in axios instance');
  }

  // Fix common URL formatting issues (missing // after protocol)
  // Convert "http:example.com" to "http://example.com"
  if (baseURL.match(/^https?:[^/]/)) {
    baseURL = baseURL.replace(/^(https?:)([^/])/, '$1//$2');
  }

  // Normalize baseURL (ensure it ends without trailing slash)
  const normalizedBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;

  // Ensure endpoint starts with a slash
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Build full URL
  const fullURL = `${normalizedBaseURL}${normalizedEndpoint}`;

  let url: URL;
  try {
    url = new URL(fullURL);
  } catch (error) {
    throw new Error(`Invalid URL constructed: ${fullURL}. BaseURL: ${baseURL}, Endpoint: ${endpoint}`);
  }

  // Add query params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Use the same auth pattern as axios instance (from cookies)
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // Prepare fetch options with Next.js caching
  const fetchOptions: RequestInit & { next?: { tags?: string[]; revalidate?: number | false } } = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  // Add Next.js specific caching options (only for GET requests)
  if (method === 'GET') {
    const nextOptions: { tags?: string[]; revalidate?: number | false } = {};

    if (tags && tags.length > 0) {
      nextOptions.tags = tags;
    }

    if (revalidate !== undefined) {
      nextOptions.revalidate = revalidate;
    }

    if (cache !== undefined) {
      fetchOptions.cache = cache;
    }

    if (Object.keys(nextOptions).length > 0) {
      fetchOptions.next = nextOptions;
    }
  } else {
    // For non-GET requests, don't cache
    fetchOptions.cache = 'no-store';
  }

  const finalURL = url.toString();
  const response = await fetch(finalURL, fetchOptions);

  if (!response.ok) {
    // Include more details in error for debugging
    const errorMessage = `Failed to fetch ${finalURL}: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const json = await response.json();

  // Return the response as-is to maintain API response structure
  // The API likely returns { data, meta } or similar structure
  return json;
}

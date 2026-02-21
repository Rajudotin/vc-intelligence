// components/TestFetch.js
"use client";

import { useState, useEffect } from 'react';

export default function TestFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testEnrichment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.com' }),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);
      
      const text = await response.text();
      console.log('Raw response:', text);
      
      try {
        const data = JSON.parse(text);
        setData(data);
      } catch (e) {
        setError(`Invalid JSON: ${text}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200">
      <h3 className="font-bold mb-4">API Test</h3>
      <button 
        onClick={testEnrichment}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Test API
      </button>
      
      {loading && <p className="mt-4">Loading...</p>}
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {data && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="font-bold text-green-700">Success!</p>
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
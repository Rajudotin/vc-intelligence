"use client";

import { useState, useEffect } from "react";
import { mockCompanies } from "@/utils/mockData";

const STORAGE_KEY = "vc_intelligence_companies";
const DATA_VERSION = "2.0";

export function useCompanies() {
  const [companies, setCompanies] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [savedSearches, setSavedSearches] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      try {
        const { 
          companies: storedCompanies, 
          savedIds: storedSaved, 
          savedSearches: storedSearches,
          version 
        } = JSON.parse(stored);
        
        if (version === DATA_VERSION) {
          setCompanies(storedCompanies);
          setSavedIds(new Set(storedSaved || []));
          setSavedSearches(storedSearches || []);
        } else {
          console.log("Data version mismatch, loading new mock data");
          setCompanies(mockCompanies);
          setSavedIds(new Set());
          setSavedSearches([]);
        }
      } catch (e) {
        console.log("Error parsing stored data, using mock data");
        setCompanies(mockCompanies);
        setSavedIds(new Set());
        setSavedSearches([]);
      }
    } else {
      setCompanies(mockCompanies);
      setSavedIds(new Set());
      setSavedSearches([]);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          companies,
          savedIds: Array.from(savedIds),
          savedSearches,
          version: DATA_VERSION,
        })
      );
    }
  }, [companies, savedIds, savedSearches]);

  const toggleSaved = (companyId) => {
    setSavedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
      } else {
        newSet.add(companyId);
      }
      return newSet;
    });
  };

  // Save search query
  const saveSearch = (query, filters = {}) => {
    const newSearch = {
      id: Date.now().toString(),
      query,
      filters,
      results: companies.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase())
      ).length,
      createdAt: new Date().toISOString(),
    };

    setSavedSearches(prev => [newSearch, ...prev].slice(0, 20)); // Keep last 20 searches
  };

  // Remove saved search
  const removeSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  // Re-run saved search
  const runSearch = (search) => {
    // This will be handled by the component
    return {
      query: search.query,
      filters: search.filters,
    };
  };

  const savedCompanies = companies.filter((c) => savedIds.has(c.id));

  return {
    companies,
    savedIds,
    savedCompanies,
    savedSearches,
    toggleSaved,
    saveSearch,
    removeSearch,
    runSearch,
  };
}
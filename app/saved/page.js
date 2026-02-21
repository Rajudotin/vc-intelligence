"use client";

import { useState } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Search,
  Clock,
  Trash2,
  Play,
  Filter,
  Calendar,
  ChevronRight,
  Grid3x3,
  LayoutList,
  ExternalLink
} from "lucide-react";

export default function SavedPage() {
  const router = useRouter();
  const { savedCompanies, savedSearches, removeSearch, runSearch } = useCompanies();
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("companies"); // 'companies' or 'searches'

  const getScoreColor = (score) => {
    if (score >= 70) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const handleRunSearch = (search) => {
    const params = new URLSearchParams();
    if (search.query) params.set('search', search.query);
    if (search.filters?.sector) params.set('sector', search.filters.sector);
    if (search.filters?.stage) params.set('stage', search.filters.stage);
    
    router.push(`/companies?${params.toString()}`);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 animate-fade-in bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Saved Items</h1>
            <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              Access your saved companies and searches
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-4">
              <Star size={24} className="text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{savedCompanies.length}</p>
            <p className="text-sm text-gray-500">Saved Companies</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Search size={24} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{savedSearches.length}</p>
            <p className="text-sm text-gray-500">Saved Searches</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
              <Filter size={24} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {savedCompanies.reduce((sum, c) => sum + (c.score || 0), 0) / (savedCompanies.length || 1) | 0}
            </p>
            <p className="text-sm text-gray-500">Avg. Score</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
              <Clock size={24} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {savedSearches.filter(s => {
                const date = new Date(s.createdAt);
                const now = new Date();
                return date.toDateString() === now.toDateString();
              }).length}
            </p>
            <p className="text-sm text-gray-500">Today's Searches</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab("companies")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "companies"
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Saved Companies ({savedCompanies.length})
            </button>
            <button
              onClick={() => setActiveTab("searches")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === "searches"
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Saved Searches ({savedSearches.length})
            </button>
          </div>

          {activeTab === "companies" && savedCompanies.length > 0 && (
            <div className="flex items-center gap-2 p-1 bg-white border border-gray-200 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === "companies" ? (
        /* Saved Companies */
        savedCompanies.length > 0 ? (
          viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedCompanies.map((company) => (
                <div
                  key={company.id}
                  onClick={() => router.push(`/companies/${company.id}`)}
                  className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-yellow-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                          {company.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{company.sector}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{company.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="text-gray-400">Stage:</span> {company.stage}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="text-gray-400">Location:</span> {company.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getScoreColor(company.score)}`}>
                      Score: {company.score}
                    </span>
                    <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1">
                      View Details
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
        ) : (
            /* List View */
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hidden md:table-header-group">
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Sector</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Stage</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Score</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {savedCompanies.map((company) => (
                      <tr 
                        key={company.id}
                        onClick={() => router.push(`/companies/${company.id}`)}
                        className="group hover:bg-yellow-50/30 cursor-pointer transition-colors"
                      >
                        <td className="px-4 md:px-6 py-4 font-medium text-gray-900">
                          <div className="flex flex-col">
                            <span>{company.name}</span>
                            <span className="md:hidden text-xs text-gray-500">{company.sector}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{company.sector}</td>
                        <td className="px-4 md:px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                            {company.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{company.location}</td>
                        <td className="px-4 md:px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getScoreColor(company.score)}`}>
                            {company.score}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4 text-right">
                          <button className="p-1.5 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100 md:opacity-100">
                            <ExternalLink size={16} className="text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          /* Empty State - Saved Companies */
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="w-24 h-24 bg-yellow-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Star size={48} className="text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No saved companies yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start saving companies you're interested in by clicking the star icon on any company card.
            </p>
            <button
              onClick={() => router.push('/companies')}
              className="px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Browse Companies
            </button>
          </div>
        )
      ) : (
        /* Saved Searches */
        savedSearches.length > 0 ? (
          <div className="space-y-4">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Search size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {search.query || "All companies"}
                      </h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          {search.results} results
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(search.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {Object.keys(search.filters).length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {Object.entries(search.filters).map(([key, value]) => (
                            <span
                              key={key}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                            >
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRunSearch(search)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors group/btn"
                      title="Run search again"
                    >
                      <Play size={18} className="text-blue-600 group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => removeSearch(search.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State - Saved Searches */
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search size={48} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No saved searches yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Save your search queries and filters to quickly access them later.
            </p>
            <button
              onClick={() => router.push('/companies')}
              className="px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Start Searching
            </button>
          </div>
        )
      )}
    </div>
  );
}
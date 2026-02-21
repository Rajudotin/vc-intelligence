"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Link as LinkIcon, 
  Award, 
  Globe, 
  FileText, 
  Tag, 
  Activity,
  Building2,
  MapPin,
  Calendar,
  Users,
  Mail,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap
} from "lucide-react";

export default function CompanyProfile({ company, savedIds, onToggleSaved, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [enrichmentData, setEnrichmentData] = useState(null);
  const [enrichmentLoading, setEnrichmentLoading] = useState(false);
  const [enrichmentError, setEnrichmentError] = useState(null);

  const lists = [
    { id: 1, name: "Q1 Prospects", count: 12 },
    { id: 2, name: "Follow Up", count: 8 },
    { id: 3, name: "Hot Leads", count: 5 },
  ];

  const handleEnrich = async () => {
    setEnrichmentLoading(true);
    setEnrichmentError(null);
    
    try {
      console.log('Starting enrichment for:', company.website);
      
      const response = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: company.website }),
      });
      
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      setEnrichmentData(data);
      
    } catch (err) {
      console.error('Enrichment error:', err);
      setEnrichmentError(err.message);
    } finally {
      setEnrichmentLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Back Button - Mobile optimized */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors group"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center">
          <ArrowLeft size={14} className="text-gray-600" />
        </div>
        <span className="text-sm">Back to companies</span>
      </button>

      {/* Main Content - Desktop exactly as before, mobile optimized */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header Section - Mobile optimized */}
        <div className="p-5 sm:p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Company Avatar - Smaller on mobile */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-lg sm:shadow-xl shadow-blue-600/20 flex-shrink-0">
                {company.name?.charAt(0) || '?'}
              </div>
              <div className="flex-1 min-w-0">
                {/* Title and Score - Stack on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">{company.name}</h1>
                  <span className={`self-start sm:self-auto px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-block w-fit ${
                    company.score >= 70 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : company.score >= 50 
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    Score: {company.score}
                  </span>
                </div>
                
                {/* Description - Smaller on mobile */}
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">{company.description}</p>
                
                {/* Company Meta - Stack on mobile */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                    <Building2 size={14} className="text-gray-400" />
                    <span>{company.sector}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{company.stage}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{company.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Save Button - Positioned better on mobile */}
            <div className="absolute top-5 right-5 sm:static">
              <button 
                onClick={() => onToggleSaved(company.id)}
                className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 bg-white"
              >
                <Star 
                  size={18} 
                  className={savedIds.has(company.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats - Horizontal scroll on mobile */}
        <div className="p-4 sm:p-6 border-b border-gray-200 overflow-x-auto">
          <div className="flex sm:grid sm:grid-cols-4 gap-3 min-w-min sm:min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-3 sm:p-4 flex-shrink-0 sm:flex-shrink w-40 sm:w-auto">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Founded</p>
                <p className="text-xs sm:text-sm font-semibold">2020</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-3 sm:p-4 flex-shrink-0 sm:flex-shrink w-40 sm:w-auto">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Users size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Employees</p>
                <p className="text-xs sm:text-sm font-semibold">50-100</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-3 sm:p-4 flex-shrink-0 sm:flex-shrink w-40 sm:w-auto">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Mail size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Contact</p>
                <p className="text-xs sm:text-sm font-semibold truncate max-w-[100px]">sales@</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-3 sm:p-4 flex-shrink-0 sm:flex-shrink w-40 sm:w-auto">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <ExternalLink size={16} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Website</p>
                <a href={company.website} target="_blank" className="text-xs sm:text-sm font-semibold text-blue-600 truncate block max-w-[100px]">
                  Visit
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Stack on mobile */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            >
              <option value="">Add to list...</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>{list.name} ({list.count})</option>
              ))}
            </select>

            <button className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all text-sm font-medium">
              Contact
            </button>
          </div>
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="border-b border-gray-200 px-4 sm:px-8 overflow-x-auto">
          <div className="flex gap-4 sm:gap-8 min-w-max sm:min-w-0">
            {["overview", "signals", "notes", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap
                  ${activeTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-8">
          {activeTab === "overview" && (
            <div className="space-y-6 sm:space-y-8">
              {/* AI Enrichment Section */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Award size={18} className="text-blue-600" />
                    AI Enrichment
                  </h3>
                  {!enrichmentData && !enrichmentLoading && !enrichmentError && (
                    <button
                      onClick={handleEnrich}
                      className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                    >
                      Run Enrichment
                    </button>
                  )}
                </div>

                {!enrichmentData && !enrichmentLoading && !enrichmentError && (
                  <div className="text-center py-6 sm:py-8">
                    <Globe size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-sm text-gray-500 mb-2">No enrichment data available</p>
                    <p className="text-xs text-gray-400">Click to analyze {company.website}</p>
                  </div>
                )}

                {enrichmentLoading && (
                  <div className="text-center py-8 sm:py-12">
                    <div className="animate-spin-slow text-3xl sm:text-4xl mb-3">⏳</div>
                    <p className="text-sm text-gray-600">Analyzing website...</p>
                    <p className="text-xs text-gray-400 mt-2">This may take a few seconds</p>
                  </div>
                )}

                {enrichmentError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <AlertCircle size={16} />
                      <span className="text-sm font-medium">Failed</span>
                    </div>
                    <p className="text-xs text-red-600 mb-3">{enrichmentError}</p>
                    <button
                      onClick={handleEnrich}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {enrichmentData && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <p className="text-xs text-green-700">Successfully enriched</p>
                    </div>

                    {/* Summary */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FileText size={14} className="text-gray-400" />
                        Summary
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        {enrichmentData.summary}
                      </p>
                    </div>

                    {/* What They Do */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Activity size={14} className="text-gray-400" />
                        What They Do
                      </h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {enrichmentData.what_they_do?.map((item, i) => (
                          <li key={i} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Keywords */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Tag size={14} className="text-gray-400" />
                        Keywords
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {enrichmentData.keywords?.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs border border-gray-200">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sources */}
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Sources</h4>
                      <div className="space-y-1">
                        {enrichmentData.sources?.map((source, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                            <a href={source.url} target="_blank" className="text-blue-600 hover:underline truncate max-w-[200px] sm:max-w-md">
                              {source.url}
                            </a>
                            <span className="text-gray-400 text-xs">
                              {new Date(source.scraped_at).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes Section */}
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes about this company..."
                  className="w-full min-h-[80px] sm:min-h-[100px] p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === "signals" && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold mb-4">Signal Timeline</h3>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Zap size={14} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">New funding round announced</p>
                  <p className="text-xs text-gray-500 mt-1">Feb 15, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users size={14} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">Hiring for 3 new roles</p>
                  <p className="text-xs text-gray-500 mt-1">Feb 10, 2024</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold mb-4">Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes about this company..."
                className="w-full min-h-[150px] p-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm"
              />
              <div className="flex justify-end">
                <button className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg text-sm font-medium">
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold mb-4">Recent Activity</h3>
              <div className="text-center py-8 text-gray-500">
                <Activity size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm">No recent activity</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
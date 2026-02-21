"use client";

import { useState } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import CompaniesTable from "@/components/CompaniesTable";
import { 
  Filter, 
  ChevronDown, 
  Download, 
  Plus, 
  RefreshCw,
  Building2,
  TrendingUp,
  Briefcase,
  Calendar,
  Grid3x3,
  LayoutList,
  SlidersHorizontal,
  BookmarkPlus,
  Search
} from "lucide-react";

export default function CompaniesPage() {
  const { companies, savedIds, toggleSaved, saveSearch } = useCompanies();
  const [sectorFilter, setSectorFilter] = useState("All Sectors");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("all");
  const [tableSearch, setTableSearch] = useState("");
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sectors = ["All Sectors", ...new Set(companies.map((c) => c.sector))];
  const stages = ["All Stages", ...new Set(companies.map((c) => c.stage))];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = tableSearch === "" || 
      company.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      company.sector.toLowerCase().includes(tableSearch.toLowerCase()) ||
      company.location.toLowerCase().includes(tableSearch.toLowerCase());
    
    const matchesSector = sectorFilter === "All Sectors" || company.sector === sectorFilter;
    const matchesStage = stageFilter === "All Stages" || company.stage === stageFilter;
    
    return matchesSearch && matchesSector && matchesStage;
  });

  const stats = [
    { 
      label: "Total Companies", 
      value: companies.length, 
      change: "+12%", 
      icon: Building2, 
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    { 
      label: "Active Deals", 
      value: "24", 
      change: "+3", 
      icon: Briefcase, 
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    { 
      label: "Portfolio", 
      value: "18", 
      change: "+2", 
      icon: TrendingUp, 
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    { 
      label: "Meetings", 
      value: "8", 
      change: "This week", 
      icon: Calendar, 
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
  ];

  // Handle save search
  const handleSaveSearch = () => {
    saveSearch(tableSearch, {
      sector: sectorFilter !== "All Sectors" ? sectorFilter : undefined,
      stage: stageFilter !== "All Stages" ? stageFilter : undefined,
    });
    setShowSaveSearchModal(false);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in bg-gray-50">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        {/* Header - Desktop unchanged, mobile adjusted */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              <span className="px-2 sm:px-0">Companies</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex sm:mt-1.5 items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
              Manage and track your investment opportunities
            </p>
          </div>
          
          {/* Action Buttons - Mobile optimized */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-2 sm:p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm hover:shadow">
              <RefreshCw size={18} className="text-gray-600" />
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/20 transition-all shadow-lg shadow-blue-600/10">
              <Plus size={18} />
              <span className="text-sm font-semibold hidden sm:inline">Add Company</span>
              <span className="text-sm font-semibold sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Stats Grid - Desktop 4 columns, mobile 2 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className={stat.iconColor} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 sm:px-2.5 sm:py-1 rounded-full ${
                    stat.change.startsWith('+') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Search Bar - Always visible on mobile */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search companies by name, sector, or location..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
            />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl mb-4"
        >
          <span className="text-sm font-medium text-gray-700">Filters & Options</span>
          <ChevronDown size={18} className={`text-gray-500 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Filters Bar - Desktop always visible, Mobile collapsible */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Company Count Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-600/20">
                    <Building2 size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{filteredCompanies.length}</p>
                    <p className="text-xs text-gray-500">companies found</p>
                  </div>
                </div>

                {/* Divider - hidden on mobile */}
                <div className="hidden sm:block h-10 w-px bg-gray-200"></div>

                {/* Filter Chips - scrollable on mobile */}
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  {["all", "new", "active"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`
                        px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium capitalize transition-all whitespace-nowrap
                        ${activeFilter === filter 
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                        }
                      `}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Section - wraps on mobile */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Sector Filter */}
                <div className="relative flex-1 min-w-[120px]">
                  <select 
                    value={sectorFilter} 
                    onChange={(e) => setSectorFilter(e.target.value)} 
                    className="appearance-none pl-4 sm:pl-5 pr-10 sm:pr-12 py-2 sm:py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 cursor-pointer hover:bg-gray-50 transition-all w-full font-medium text-gray-700"
                  >
                    {sectors.map((sector) => (
                      <option key={sector}>{sector}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                </div>
                
                {/* Stage Filter */}
                <div className="relative flex-1 min-w-[120px]">
                  <select 
                    value={stageFilter} 
                    onChange={(e) => setStageFilter(e.target.value)} 
                    className="appearance-none pl-4 sm:pl-5 pr-10 sm:pr-12 py-2 sm:py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 cursor-pointer hover:bg-gray-50 transition-all w-full font-medium text-gray-700"
                  >
                    {stages.map((stage) => (
                      <option key={stage}>{stage}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                </div>

                {/* Save Search Button */}
                <button
                  onClick={() => setShowSaveSearchModal(true)}
                  className="p-2 sm:p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all group"
                  title="Save current search"
                >
                  <BookmarkPlus size={18} className="text-gray-600 group-hover:scale-110 transition-transform" />
                </button>

                {/* Export Button - hidden on small mobile */}
                <button className="hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl hover:shadow-lg hover:shadow-gray-800/20 transition-all shadow-md group">
                  <Download size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">Export</span>
                </button>

                {/* View Toggle - hidden on mobile */}
                <div className="hidden md:flex items-center gap-1 p-1 bg-gray-100 rounded-xl border border-gray-200">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid" 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list" 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <LayoutList size={18} />
                  </button>
                </div>

                {/* More Filters */}
                <button className="p-2 sm:p-2.5 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-all">
                  <SlidersHorizontal size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <CompaniesTable 
        companies={filteredCompanies} 
        savedIds={savedIds} 
        onToggleSaved={toggleSaved} 
      />

      {/* Save Search Modal - Mobile optimized */}
      {showSaveSearchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Save Search</h3>
              <p className="text-sm text-gray-500 mt-1">
                Save your current search query and filters to access them later
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="text-xs font-medium text-blue-700 uppercase tracking-wider mb-3">Search Criteria</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Query:</span>
                      <span className="font-medium text-gray-900">"{tableSearch || "All companies"}"</span>
                    </div>
                    {sectorFilter !== "All Sectors" && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Sector:</span>
                        <span className="font-medium text-gray-900">{sectorFilter}</span>
                      </div>
                    )}
                    {stageFilter !== "All Stages" && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Stage:</span>
                        <span className="font-medium text-gray-900">{stageFilter}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Results:</span> {filteredCompanies.length} companies match your search
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-gray-200 bg-gray-50/50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setShowSaveSearchModal(false)}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSearch}
                className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/20 transition-all text-sm font-medium flex items-center justify-center gap-2"
              >
                <BookmarkPlus size={16} />
                Save Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
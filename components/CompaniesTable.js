"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Search,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2,
  Building2,
  MapPin,
  Tag,
  Award
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function CompaniesTable({ companies, savedIds, onToggleSaved }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [tableSearch, setTableSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      company.sector.toLowerCase().includes(tableSearch.toLowerCase()) ||
      company.location.toLowerCase().includes(tableSearch.toLowerCase())
    );
  }, [companies, tableSearch]);

  // Sort companies
  const sortedCompanies = useMemo(() => {
    const sortable = [...filteredCompanies];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortable;
  }, [filteredCompanies, sortConfig]);

  const totalPages = Math.ceil(sortedCompanies.length / ITEMS_PER_PAGE);
  
  // Paginate
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCompanies.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedCompanies, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortConfig, tableSearch]);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleCompanyClick = (companyId) => {
    router.push(`/companies/${companyId}`);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 70) return "bg-blue-100 text-blue-700 border-blue-200";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (score >= 30) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Table Header with Search */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by company, sector, or location..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
            />
          </div>
          
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">{selectedRows.length} selected</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-border">
                <Copy size={16} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors border border-border text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table with proper spacing */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-50 border-b border-border">
              <th className="w-12 px-6 py-4">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(paginatedCompanies.map(c => c.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === paginatedCompanies.length && paginatedCompanies.length > 0}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-2">
                  <Building2 size={14} />
                  Company
                  {sortConfig.key === "name" && (
                    sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort("sector")}>
                <div className="flex items-center gap-2">
                  <Tag size={14} />
                  Sector
                  {sortConfig.key === "sector" && (
                    sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort("stage")}>
                <div className="flex items-center gap-2">
                  Stage
                  {sortConfig.key === "stage" && (
                    sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort("location")}>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  Location
                  {sortConfig.key === "location" && (
                    sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort("score")}>
                <div className="flex items-center gap-2">
                  <Award size={14} />
                  Score
                  {sortConfig.key === "score" && (
                    sortConfig.direction === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Enriched
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedCompanies.map((company) => (
              <tr 
                key={company.id} 
                onMouseEnter={() => setHoveredRow(company.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`
                  group transition-colors
                  ${hoveredRow === company.id ? 'bg-blue-50/30' : 'hover:bg-gray-50'}
                `}
              >
                <td className="w-12 px-4 md:px-6 py-4 md:py-5 hidden md:table-cell" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    checked={selectedRows.includes(company.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows([...selectedRows, company.id]);
                      } else {
                        setSelectedRows(selectedRows.filter(id => id !== company.id));
                      }
                    }}
                  />
                </td>
                <td className="px-4 md:px-6 py-4 md:py-5">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-600/20">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <button
                        onClick={() => handleCompanyClick(company.id)}
                        className="text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline transition-colors text-left"
                      >
                        {company.name}
                      </button>
                      <p className="text-xs text-gray-500 mt-0.5 hidden md:block">ID: {company.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className="text-sm text-gray-700 font-medium">{company.sector}</span>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">
                    {company.stage}
                  </span>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-700">{company.location}</span>
                  </div>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getScoreColor(company.score)}`}>
                    {company.score}
                  </span>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${
                    company.enriched 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}>
                    {company.enriched ? '✓ Enriched' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 md:py-5 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1 md:gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleSaved(company.id); }} 
                      className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors border border-border"
                      aria-label={savedIds.has(company.id) ? "Unsave company" : "Save company"}
                    >
                      <Star 
                        size={16}
                        className={savedIds.has(company.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} 
                      />
                    </button>
                    <button 
                      onClick={() => handleCompanyClick(company.id)}
                      className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors border border-border opacity-0 group-hover:opacity-100"
                      aria-label="View details"
                    >
                      <Eye size={16} className="text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {sortedCompanies.length > 0 && (
        <>
          <div className="px-6 py-4 border-t border-border bg-gray-50/50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{paginatedCompanies.length}</span> of{" "}
                <span className="font-medium">{sortedCompanies.length}</span> companies
              </p>
              <p className="text-sm text-gray-500">
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`
                        w-9 h-9 text-sm font-medium rounded-lg transition-all
                        ${currentPage === pageNum 
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-100 border border-border'
                        }
                      `}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="text-gray-400">...</span>}
              </div>
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {sortedCompanies.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
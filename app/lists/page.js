"use client";

import { useState, useEffect } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { 
  Plus, 
  Download, 
  Trash2, 
  Edit,
  Eye,
  MoreHorizontal,
  FileJson,
  FileText,
  Grid3x3,
  LayoutList,
  Search,
  X,
  Check,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function ListsPage() {
  const { companies } = useCompanies();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [editingList, setEditingList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Load lists from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("vc_lists");
    if (stored) {
      try {
        setLists(JSON.parse(stored));
      } catch {
        setLists([]);
      }
    }
  }, []);

  // Save lists to localStorage
  useEffect(() => {
    localStorage.setItem("vc_lists", JSON.stringify(lists));
  }, [lists]);

  // Create new list
  const createList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const newList = {
      id: Date.now().toString(),
      name: newListName,
      description: "",
      companies: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setLists([...lists, newList]);
    setNewListName("");
  };

  // Update list
  const updateList = (listId, updates) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, ...updates, updatedAt: new Date().toISOString() }
        : list
    ));
    setEditingList(null);
  };

  // Delete list
  const deleteList = (listId) => {
    if (confirm("Are you sure you want to delete this list?")) {
      setLists(lists.filter(l => l.id !== listId));
      if (selectedList?.id === listId) {
        setSelectedList(null);
      }
    }
  };

  // Add company to list
  const addCompanyToList = (listId, companyId) => {
    setLists(lists.map(list => {
      if (list.id === listId && !list.companies.includes(companyId)) {
        return {
          ...list,
          companies: [...list.companies, companyId],
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    }));
  };

  // Remove company from list
  const removeCompanyFromList = (listId, companyId) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          companies: list.companies.filter(id => id !== companyId),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    }));
  };

  // Export list as JSON
  const exportAsJSON = (list) => {
    const listData = {
      ...list,
      companies: list.companies.map(id => 
        companies.find(c => c.id === id)
      ).filter(Boolean),
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(listData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `${list.name.toLowerCase().replace(/\s+/g, "-")}.json`);
    link.click();
  };

  // Export list as CSV
  const exportAsCSV = (list) => {
    const companyData = list.companies
      .map(id => companies.find(c => c.id === id))
      .filter(Boolean);

    if (companyData.length === 0) {
      alert("No companies in this list to export");
      return;
    }

    const headers = ["Name", "Sector", "Stage", "Location", "Score", "Enriched"];
    const rows = companyData.map(c => [
      c.name,
      c.sector,
      c.stage,
      c.location,
      c.score,
      c.enriched ? "Yes" : "No"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${list.name.toLowerCase().replace(/\s+/g, "-")}.csv`);
    link.click();
  };

  // Filter companies for adding to list
  const availableCompanies = companies.filter(c => 
    !selectedList?.companies.includes(c.id) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.sector.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 p-6 lg:p-8 animate-fade-in bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Lists</h1>
            <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              Create and manage custom company lists
            </p>
          </div>
          
          {/* Create List Form */}
          <form onSubmit={createList} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New list name..."
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm w-full sm:w-64"
            />
            <button
              type="submit"
              disabled={!newListName.trim()}
              className="px-5 py-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Create List</span>
              <span className="sm:hidden">Create</span>
            </button>
          </form>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Plus size={24} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{lists.length}</p>
            <p className="text-sm text-gray-500">Total Lists</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
              <Eye size={24} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {lists.reduce((acc, list) => acc + list.companies.length, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Companies</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
              <FileJson size={24} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {lists.filter(l => l.companies.length > 0).length}
            </p>
            <p className="text-sm text-gray-500">Active Lists</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-4">
              <Download size={24} className="text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {lists.reduce((acc, list) => acc + (list.updatedAt ? 1 : 0), 0)}
            </p>
            <p className="text-sm text-gray-500">Updated Today</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
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
        </div>
      </div>

      {/* Lists Grid/View */}
      {lists.length > 0 ? (
        viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lists.map((list) => {
              const listCompanies = list.companies
                .map(id => companies.find(c => c.id === id))
                .filter(Boolean);

              return (
                <div
                  key={list.id}
                  className="group bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {list.name}
                      </h3>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                        {list.companies.length} companies
                      </span>
                    </div>
                    {list.description && (
                      <p className="text-sm text-gray-500">{list.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Updated {new Date(list.updatedAt || list.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Companies Preview */}
                  <div className="p-6">
                    {listCompanies.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        {listCompanies.slice(0, 3).map((company) => (
                          <div key={company.id} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{company.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              company.score >= 70 ? 'bg-green-100 text-green-700' :
                              company.score >= 50 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {company.score}
                            </span>
                          </div>
                        ))}
                        {listCompanies.length > 3 && (
                          <p className="text-xs text-gray-400">
                            +{listCompanies.length - 3} more companies
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-400">No companies yet</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedList(list)}
                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <Plus size={14} />
                        Add Companies
                      </button>
                      <button
                        onClick={() => exportAsJSON(list)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Export as JSON"
                      >
                        <FileJson size={16} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => exportAsCSV(list)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Export as CSV"
                      >
                        <FileText size={16} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => setEditingList(list)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit list"
                      >
                        <Edit size={16} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => deleteList(list.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete list"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">List Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Companies</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lists.map((list) => (
                  <tr key={list.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{list.name}</p>
                        {list.description && (
                          <p className="text-xs text-gray-500 mt-1">{list.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                        {list.companies.length} companies
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(list.updatedAt || list.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedList(list)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Add companies"
                        >
                          <Plus size={16} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => exportAsJSON(list)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Export JSON"
                        >
                          <FileJson size={16} className="text-gray-500" />
                        </button>
                        <button
                          onClick={() => exportAsCSV(list)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Export CSV"
                        >
                          <FileText size={16} className="text-gray-500" />
                        </button>
                        <button
                          onClick={() => setEditingList(list)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} className="text-gray-500" />
                        </button>
                        <button
                          onClick={() => deleteList(list.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Plus size={48} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No lists yet</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Create your first list to start organizing companies you're interested in.
          </p>
          <form onSubmit={createList} className="max-w-md mx-auto flex gap-3">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name..."
              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={!newListName.trim()}
              className="px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 font-medium"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {/* Add Companies Modal */}
      {selectedList && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add to {selectedList.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Select companies to add to this list</p>
              </div>
              <button
                onClick={() => setSelectedList(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                />
              </div>

              {/* Companies List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableCompanies.map((company) => (
                  <label
                    key={company.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer border border-transparent hover:border-gray-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCompanies([...selectedCompanies, company.id]);
                          } else {
                            setSelectedCompanies(selectedCompanies.filter(id => id !== company.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{company.name}</p>
                        <p className="text-xs text-gray-500">{company.sector} • {company.stage}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      company.score >= 70 ? 'bg-green-100 text-green-700' :
                      company.score >= 50 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {company.score}
                    </span>
                  </label>
                ))}

                {availableCompanies.length === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No companies available to add</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedCompanies.length} companies selected
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedList(null);
                    setSelectedCompanies([]);
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    selectedCompanies.forEach(id => addCompanyToList(selectedList.id, id));
                    setSelectedList(null);
                    setSelectedCompanies([]);
                    setSearchQuery("");
                  }}
                  disabled={selectedCompanies.length === 0}
                  className="px-6 py-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Check size={16} />
                  Add {selectedCompanies.length} Companies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit List Modal */}
      {editingList && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit List</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">List Name</label>
                  <input
                    type="text"
                    value={editingList.name}
                    onChange={(e) => setEditingList({ ...editingList, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                  <textarea
                    value={editingList.description || ""}
                    onChange={(e) => setEditingList({ ...editingList, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-none"
                    placeholder="Add a description..."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50/50 flex justify-end gap-3">
              <button
                onClick={() => setEditingList(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateList(editingList.id, {
                    name: editingList.name,
                    description: editingList.description,
                  });
                }}
                className="px-6 py-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
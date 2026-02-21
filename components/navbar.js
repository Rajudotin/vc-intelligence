"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, ArrowLeft } from "lucide-react";
import { useSidebar } from "@/app/providers";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setMobileOpen } = useSidebar();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [desktopSearchQuery, setDesktopSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowMobileSearch(false);
    setSearchQuery("");
    setDesktopSearchQuery("");
  }, [pathname]);

  const handleSearch = (e, isMobile = false) => {
    e.preventDefault();
    const query = isMobile ? searchQuery : desktopSearchQuery;
    
    if (query.trim()) {
      router.push(`/companies?search=${encodeURIComponent(query.trim())}`);
      setShowMobileSearch(false);
      setSearchQuery("");
      setDesktopSearchQuery("");
    }
  };

  const handleKeyDown = (e, isMobile = false) => {
    if (e.key === 'Enter') {
      handleSearch(e, isMobile);
    }
  };

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Desktop Layout - WITH SEARCH BUTTON */}
      <div className="hidden md:block">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/companies" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">VC Intelligence</h1>
            </Link>

            {/* Search Bar with Button */}
            <div className="flex-1 max-w-xl mx-4">
              <form onSubmit={(e) => handleSearch(e, false)} className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={desktopSearchQuery}
                  onChange={(e) => setDesktopSearchQuery(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, false)}
                  className="w-full pl-10 pr-24 py-2.5 bg-gray-50 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-0 px-4 py-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-r-xl hover:shadow-lg hover:shadow-blue-600/20 transition-all text-sm font-medium"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - WITH SEARCH BUTTON */}
      <div className="md:hidden">
        {showMobileSearch ? (
          // Search Mode
          <div className="px-3 py-2">
            <form onSubmit={(e) => handleSearch(e, true)} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="p-2 hover:bg-gray-100 rounded-lg shrink-0"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, true)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>
        ) : (
          // Normal Mode
          <div className="flex items-center justify-between px-3 py-2">
            {/* Logo */}
            <Link href="/companies" className="flex items-center gap-1">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-base font-bold text-gray-900">VC Intel</span>
            </Link>

            {/* Right side - Search and Profile */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setShowMobileSearch(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Search"
              >
                <Search size={20} className="text-gray-600" />
              </button>
              
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                JD
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/app/providers";
import { 
  LayoutDashboard, 
  Star, 
  List, 
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/companies", icon: LayoutDashboard },
  { name: "Saved", href: "/saved", icon: Star },
  { name: "Lists", href: "/lists", icon: List },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Trends", href: "/trends", icon: TrendingUp },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  const isActive = (href) => {
    return pathname === href || (href === "/companies" && pathname?.startsWith("/companies/"));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50
        bg-white border-r border-gray-200
        shadow-xl
        transition-all duration-300 ease-out
        w-64
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:sticky md:top-[73px] md:h-[calc(100vh-73px)] md:translate-x-0
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        flex flex-col
        overflow-hidden /* Disable scrollbar */
      `}>
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold text-gray-900">VC Intel</span>
          </div>
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Desktop Header - Professional with Menu Toggle */}
        <div className="hidden md:block p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {isCollapsed ? 'MENU' : 'NAVIGATION'}
            </span>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 bg-white shadow-sm"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Profile Section - Professional */}
        <div className="p-4 border-b border-gray-200">
          <div className={`
            flex items-center gap-3 p-3 rounded-xl
            bg-gradient-to-r from-gray-50 to-white
            border border-gray-200
            ${isCollapsed ? 'justify-center' : ''}
            transition-all duration-200 hover:shadow-md hover:border-blue-200
          `}>
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                JD
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">Partner</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Professional */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-hide">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 group relative
                    ${active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    transition-all duration-200
                    ${active 
                      ? 'text-blue-600' 
                      : 'text-gray-500 group-hover:text-gray-700'
                    }
                  `}>
                    <Icon size={20} />
                  </div>
                  
                  {!isCollapsed && (
                    <>
                      <span className={`flex-1 text-sm font-medium ${
                        active ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {item.name}
                      </span>
                      {/* Right chevron for active items */}
                      {active && (
                        <ChevronRight size={16} className="text-blue-600" />
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Section - Professional */}
        <div className="p-4 border-t border-gray-200">
          <button className={`
            flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
            text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              transition-all duration-200
              text-gray-500 group-hover:text-red-600
            `}>
              <LogOut size={20} />
            </div>
            {!isCollapsed && (
              <span className="flex-1 text-sm font-medium text-left">Logout</span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                Logout
              </span>
            )}
          </button>
          
          {/* Version - Only when expanded */}
          {!isCollapsed && (
            <div className="mt-4 px-3 text-xs text-gray-400">
              <p>Version 2.0.0</p>
              <p className="mt-1">© 2024 VC Intel</p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Menu Button - FLOATING BUTTON ONLY */}
      <button 
        onClick={() => setMobileOpen(true)} 
        className="md:hidden fixed bottom-4 right-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all z-40 border border-white/20"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    </>
  );
}
"use client";

import { useParams, useRouter } from "next/navigation";
import { useCompanies } from "@/hooks/useCompanies";
import CompanyProfile from "@/components/CompanyProfile";

export default function CompanyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { companies, savedIds, toggleSaved } = useCompanies();
  const company = companies.find((c) => c.id === parseInt(id));

  if (!company) {
    return (
      <div className="flex-1 p-6 lg:p-8">
        <div className="bg-white border border-border rounded-xl p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
          <p className="text-gray-500 mb-6">The company you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.back()} 
            className="px-6 py-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/20 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <CompanyProfile company={company} savedIds={savedIds} onToggleSaved={toggleSaved} onBack={() => router.back()} />;
}
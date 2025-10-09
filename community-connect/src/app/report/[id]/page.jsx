"use client";

import React from "react";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Camera,
  Users,
} from "lucide-react";

const categories = {
  roads: "Roads & Pavements",
  lighting: "Street Lighting",
  waste: "Waste & Recycling",
  parks: "Parks & Green Spaces",
  transport: "Public Transport",
  safety: "Safety & Security",
  utilities: "Utilities",
  other: "Other Issues",
};

const getStatusColor = (status) => {
  switch (status) {
    case "reported":
      return "bg-yellow-100 text-yellow-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "reported":
      return <Clock className="w-4 h-4" />;
    case "in-progress":
      return <AlertCircle className="w-4 h-4" />;
    case "resolved":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const IssueDetailPage = () => {
  const params = useParams();
  const { id } = params;

  const { data: issue, isLoading } = useQuery({
    queryKey: ["issueDetail", id],
    queryFn: async () => {
      const res = await fetch(`/api/report/${id}`);
      if (!res.ok) throw new Error("Failed to fetch issue");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading issue details...</p>
        </div>
      </Layout>
    );
  }

  if (!issue) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Issue not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {issue.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {categories[issue.category] || "Other"} |{" "}
                <span className="capitalize">{issue.priority}</span> priority
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                issue.status
              )}`}
            >
              {getStatusIcon(issue.status)}
              <span className="capitalize">{issue.status}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Issue Description
              </h3>
              <p className="text-gray-700">{issue.description}</p>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-500" />
              <p>{issue.location || "No location provided"}</p>
            </div>

            {/* Reporter Info */}
            {issue.contactInfo && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Reported By</h4>
                <p className="text-gray-700">
                  Name: {issue.contactInfo.name || "Anonymous"}
                  <br />
                  Email: {issue.contactInfo.email || "N/A"}
                  <br />
                  Phone: {issue.contactInfo.phone || "N/A"}
                </p>
              </div>
            )}

            {/* Photos */}
            {issue.photos && issue.photos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Photos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {issue.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo.url || photo} // adjust if your backend returns URL
                      alt={`Issue Photo ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-sm text-gray-500">
              Reported{" "}
              {formatDistanceToNow(new Date(issue.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IssueDetailPage;

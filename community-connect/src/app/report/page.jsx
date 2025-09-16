"use client";

import React, { useState } from "react";
import {
  MapPin,
  Camera,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const IssueReportingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    priority: "medium",
    photos: [],
    contactInfo: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentReports, setRecentReports] = useState([
    {
      id: 1,
      title: "Broken streetlight on Main St",
      category: "lighting",
      status: "in-progress",
      date: "2 days ago",
      priority: "high",
    },
    {
      id: 2,
      title: "Pothole near community center",
      category: "roads",
      status: "reported",
      date: "1 week ago",
      priority: "medium",
    },
    {
      id: 3,
      title: "Overflowing waste bin in park",
      category: "waste",
      status: "resolved",
      date: "3 days ago",
      priority: "low",
    },
  ]);

  const { data, isPending } = useQuery({
    queryKey: ["reportRecent"],
    queryFn: async () => {
      const response = await fetch(`/api/report/`);
      const data = await response.json();
      return data;
    },
  });

  console.log("report: ", data);

  const categories = [
    {
      id: "roads",
      name: "Roads & Pavements",
      icon: "🛣️",
      color: "bg-blue-500",
    },
    {
      id: "lighting",
      name: "Street Lighting",
      icon: "💡",
      color: "bg-yellow-500",
    },
    {
      id: "waste",
      name: "Waste & Recycling",
      icon: "🗑️",
      color: "bg-green-500",
    },
    {
      id: "parks",
      name: "Parks & Green Spaces",
      icon: "🌳",
      color: "bg-emerald-500",
    },
    {
      id: "transport",
      name: "Public Transport",
      icon: "🚌",
      color: "bg-purple-500",
    },
    {
      id: "safety",
      name: "Safety & Security",
      icon: "⚠️",
      color: "bg-red-500",
    },
    { id: "utilities", name: "Utilities", icon: "⚡", color: "bg-orange-500" },
    { id: "other", name: "Other Issues", icon: "📋", color: "bg-gray-500" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate form submission
    setShowSuccess(true);

    // Add new report to recent reports
    const newReport = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      status: "reported",
      date: "Just now",
      priority: formData.priority,
    };

    setRecentReports((prev) => [newReport, ...prev]);

    // Reset form
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep(1);
      setFormData({
        category: "",
        title: "",
        description: "",
        location: "",
        priority: "medium",
        photos: [],
        contactInfo: { name: "", email: "", phone: "" },
      });
    }, 3000);
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Report Submitted!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for reporting this issue. We'll review it and get back to
            you soon.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-1">Reference Number</p>
            <p className="font-mono text-lg">
              #CR{Date.now().toString().slice(-6)}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            You'll receive updates via email as we work on resolving this issue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Community Connect
                  </h1>
                  <p className="text-sm text-gray-600">
                    Report local issues and help improve your community
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{recentReports.length} active reports</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Progress Bar */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Step {currentStep} of 3
                    </span>
                    <span className="text-sm text-gray-500">
                      {currentStep === 1 && "Category & Details"}
                      {currentStep === 2 && "Location & Photos"}
                      {currentStep === 3 && "Contact Information"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Step 1: Category & Details */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          What type of issue are you reporting?
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() =>
                                handleInputChange("category", category.id)
                              }
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                formData.category === category.id
                                  ? "border-blue-500 bg-blue-50 shadow-md"
                                  : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                              }`}
                            >
                              <div className="text-2xl mb-2">
                                {category.icon}
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {category.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issue Title *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          placeholder="Brief description of the issue"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Detailed Description *
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          rows={4}
                          placeholder="Provide more details about the issue..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority Level
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) =>
                            handleInputChange("priority", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="low">Low - Minor inconvenience</option>
                          <option value="medium">
                            Medium - Moderate impact
                          </option>
                          <option value="high">
                            High - Urgent attention needed
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Location & Photos */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            placeholder="Enter street address or landmark"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Be as specific as possible to help us locate the issue
                          quickly
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Photos (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload photos to help us understand the issue better
                          </p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label
                            htmlFor="photo-upload"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Choose Photos
                          </label>
                        </div>

                        {formData.photos.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {formData.photos.map((photo, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  onClick={() => removePhoto(index)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Information */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Contact Information
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          We'll use this information to update you on the
                          progress of your report.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.contactInfo.name}
                          onChange={(e) =>
                            handleContactChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.contactInfo.email}
                          onChange={(e) =>
                            handleContactChange("email", e.target.value)
                          }
                          placeholder="your@email.com"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.contactInfo.phone}
                          onChange={(e) =>
                            handleContactChange("phone", e.target.value)
                          }
                          placeholder="Your phone number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-blue-900">
                              Review your report
                            </h4>
                            <p className="text-sm text-blue-700 mt-1">
                              <strong>Category:</strong>{" "}
                              {
                                categories.find(
                                  (c) => c.id === formData.category
                                )?.name
                              }
                              <br />
                              <strong>Title:</strong> {formData.title}
                              <br />
                              <strong>Location:</strong> {formData.location}
                              <br />
                              <strong>Priority:</strong> {formData.priority}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`px-6 py-2 rounded-lg font-medium ${
                        currentStep === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Previous
                    </button>

                    {currentStep < 3 ? (
                      <button
                        onClick={nextStep}
                        disabled={
                          (currentStep === 1 &&
                            (!formData.category ||
                              !formData.title ||
                              !formData.description)) ||
                          (currentStep === 2 && !formData.location)
                        }
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={
                          !formData.contactInfo.name ||
                          !formData.contactInfo.email
                        }
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Report</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Reports */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Reports
                </h3>
                <div className="space-y-3">
                  {data ? (
                    data.slice(0, 5).map((report) => (
                      <div
                        key={report.id}
                        className={`p-3 rounded-lg border-l-4 ${getPriorityColor(
                          report.priority
                        )} bg-gray-50`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {report.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDistanceToNow(new Date(report.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                              report.status
                            )}`}
                          >
                            {getStatusIcon(report.status)}
                            <span className="capitalize">{report.status}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Help & Tips */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Reporting Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>
                      Be specific about the location to help us find and fix the
                      issue quickly
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>
                      Include photos when possible - they help us understand the
                      problem better
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>
                      Choose the right priority level to ensure urgent issues
                      get immediate attention
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>
                      Check if the issue has already been reported to avoid
                      duplicates
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default IssueReportingPage;

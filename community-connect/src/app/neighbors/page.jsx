import Layout from "@/components/Layout";
import React from "react";

const Page = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No neighborhood yet
          </h3>
          <p className="text-gray-500">
            Be the first to share something with your neighbors!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

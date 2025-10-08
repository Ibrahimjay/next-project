import Layout from "@/components/Layout";
import { AlertCircle, Users2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const PrivateLayout = ({ children }) => {
  return (
    <Layout>
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                <Image src={"/logo.svg"} width={32} height={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Community Connect
                </h1>
                <p className="text-sm text-gray-600">
                  Connect and help improve your community
                </p>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {children}
    </Layout>
  );
};

export default PrivateLayout;

"use client";

import Link from "next/link";
import {
  FaChartLine,
  FaSearch,
  FaDownload,
  FaGithub,
  FaRocket,
  FaArrowRight,
  FaCheckCircle,
  FaDatabase,
  FaRobot,
} from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { FiBarChart2, FiLock, FiUsers } from "react-icons/fi";
import { SiCts } from "react-icons/si";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <FaChartLine className="text-2xl text-gray-900" />
              <span className="text-xl font-bold text-gray-900">
                Insighta Labs+
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#api"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                API
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaRocket className="text-gray-600" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Next Generation Intelligence
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Profile Intelligence at
                <span className="text-gray-900"> Your Fingertips</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Access comprehensive demographic insights through natural
                language queries. Filter, sort, and analyze profile data with
                unprecedented ease.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  Get Started <FaArrowRight />
                </Link>
                <Link
                  href="#features"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaSearch className="text-gray-500" />
                  <code className="bg-white px-3 py-2 rounded-lg text-sm border border-gray-200">
                    young males from nigeria
                  </code>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaDatabase className="text-gray-500" />
                  <code className="bg-white px-3 py-2 rounded-lg text-sm border border-gray-200">
                    females above 30 with high confidence
                  </code>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <SiCts className="text-gray-500" />
                  <code className="bg-white px-3 py-2 rounded-lg text-sm border border-gray-200">
                    export profiles to CSV
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to query, analyze, and export demographic data
              efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <FaRobot className="text-xl text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Natural Language Search
              </h3>
              <p className="text-gray-600">
                Query profiles using everyday language. Type &quot;young males
                from nigeria&quot; and get instant results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <MdAnalytics className="text-xl text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Advanced Filtering
              </h3>
              <p className="text-gray-600">
                Filter by gender, age range, country, and confidence scores.
                Combine multiple filters for precise results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <SiCts className="text-xl text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                CSV Export
              </h3>
              <p className="text-gray-600">
                Export filtered results to CSV format for further analysis.
                Admin-only feature for data governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to access powerful demographic insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGithub className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1. Sign in with GitHub
              </h3>
              <p className="text-gray-600">
                Secure authentication using your GitHub account. No additional
                passwords to remember.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2. Query & Filter
              </h3>
              <p className="text-gray-600">
                Use natural language or structured filters to find the profiles
                you need.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <SiCts className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. Analyze & Export
              </h3>
              <p className="text-gray-600">
                Review results and export data for deeper analysis and
                reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-20 bg-gray-900 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                REST API for Developers
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Integrate our intelligence platform into your applications with
                our comprehensive REST API.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCheckCircle className="text-gray-400" />
                  <span>GitHub OAuth authentication with PKCE</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCheckCircle className="text-gray-400" />
                  <span>Role-based access control (Admin & Analyst)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCheckCircle className="text-gray-400" />
                  <span>JWT tokens with short expiry windows</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCheckCircle className="text-gray-400" />
                  <span>CSV export and pagination support</span>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/api/docs"
                  className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center gap-2 font-medium"
                >
                  Explore API Docs <FaArrowRight />
                </Link>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`# Natural language search
curl -X GET "https://api.insighta.com/api/profiles/search/?q=young%20males%20from%20nigeria" \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter with parameters
curl -X GET "https://api.insighta.com/api/profiles/?gender=male&country_id=NG&min_age=25" \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Export to CSV
curl -X GET "https://api.insighta.com/api/profiles/export/csv/" \\
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                Real-time
              </div>
              <p className="text-gray-600">Live data synchronization</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                Role-based
              </div>
              <p className="text-gray-600">Admin & Analyst roles</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                Secure
              </div>
              <p className="text-gray-600">JWT token authentication</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                Scalable
              </div>
              <p className="text-gray-600">Handles large datasets</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your data analysis?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join organizations using Insighta Labs+ to power their demographic
            intelligence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              Start Free Trial
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Clean and readable */}
      <footer className="py-12 bg-gray-900 text-gray-400 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-xl text-gray-400" />
                <span className="text-lg font-bold text-white">
                  Insighta Labs+
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Profile Intelligence Platform for modern data analysis.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#api"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">
                Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/api/docs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
            <p>&copy; 2026 Insighta Labs+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TargetIcon,
  LoaderIcon,
  ExternalLinkIcon,
} from 'lucide-react'
import axios from 'axios'

interface AnalysisResult {
  title: string
  link: string
}

export const TargetAnalysis = () => {
  const [targetCompany, setTargetCompany] = useState('')
  const [competitorCompany, setCompetitorCompany] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<AnalysisResult[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const resp = await axios.post("/api/getcollabs", {
      targetCompany,
      competitorCompany
    })
    setIsLoading(false)
    setResults(resp.data.results)
  }

  return (
    <motion.section
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-8">
        <div className="bg-purple-100 p-3 rounded-full mr-4">
          <TargetIcon className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Target Company Analysis
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="target-company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Target Company
            </label>
            <input
              id="target-company"
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="e.g., Virgin Media"
              required
            />
          </div>
          <div>
            <label
              htmlFor="competitor-company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Competitor Company
            </label>
            <input
              id="competitor-company"
              type="text"
              value={competitorCompany}
              onChange={(e) => setCompetitorCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder="e.g., BT Group"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <LoaderIcon className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <TargetIcon className="h-5 w-5 mr-2" />
              Analyze Target Company
            </>
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-10"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analysis Results
            </h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.a
                  key={index}
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-gray-50 hover:bg-purple-50 border border-gray-200 rounded-lg shadow-sm transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-semibold text-purple-800 hover:underline">
                      {result.title}
                    </h4>
                    <ExternalLinkIcon className="h-4 w-4 text-purple-400 mt-1" />
                  </div>
                  <p className="text-sm text-gray-500 truncate">{result.link}</p>
                </motion.a>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-purple-800 transition"
              >
                View Detailed Report
                <ExternalLinkIcon className="ml-1 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

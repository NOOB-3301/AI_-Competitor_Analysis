"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchIcon, Building2, Loader2 } from "lucide-react"

export default function CompetitorFinderPage() {
  const [company, setCompany] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [competitors, setCompetitors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setCompetitors([
        "Accenture",
        "TCS",
        "Wipro",
        "Cognizant",
        "Capgemini",
        "HCL Technologies",
      ])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.section
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 rounded-full p-3 mr-4">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Discover Your Competitors
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Your Company Name
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Infosys"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <SearchIcon className="h-5 w-5 mr-2" />
                Find Competitors
              </>
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {competitors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-10"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Competitors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {competitors.map((competitor) => (
                  <motion.div
                    key={competitor}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {competitor}
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => alert("Continue clicked")}
              >
                Continue to Target Analysis
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  )
}

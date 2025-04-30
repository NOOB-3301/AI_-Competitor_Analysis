"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TargetIcon,
  ArrowLeftIcon,
  LoaderIcon,
  ExternalLinkIcon,
} from 'lucide-react'
interface TargetAnalysisProps {
  isActive: boolean
  onBack: () => void
}
interface AnalysisResult {
  competitor: string
  relationship: string
  description: string
  confidence: number
}
export const TargetAnalysis: React.FC<TargetAnalysisProps> = ({
  isActive,
  onBack,
}) => {
  const [targetCompany, setTargetCompany] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<AnalysisResult[]>([])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          competitor: 'Accenture',
          relationship: 'Active Partnership',
          description:
            'Currently working on digital transformation initiatives',
          confidence: 95,
        },
        {
          competitor: 'TCS',
          relationship: 'Recent Contract',
          description: 'Cloud migration and IT services',
          confidence: 88,
        },
        {
          competitor: 'Wipro',
          relationship: 'Past Engagement',
          description: 'Network infrastructure upgrade project',
          confidence: 75,
        },
      ])
      setIsLoading(false)
    }, 2000)
  }
  return (
    <motion.section
      className={`bg-white rounded-xl shadow-lg p-8 ${!isActive && 'opacity-50'}`}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-purple-100 rounded-full p-3 mr-4">
            <TargetIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Target Company Analysis
          </h2>
        </div>
        <motion.button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 flex items-center"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          disabled={!isActive}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back
        </motion.button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label
            htmlFor="target"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Company Name
          </label>
          <input
            type="text"
            id="target"
            value={targetCompany}
            onChange={(e) => setTargetCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            placeholder="e.g., Virgin Media"
            disabled={!isActive}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 flex items-center justify-center"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={!isActive || isLoading}
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
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analysis Results
            </h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {result.competitor}
                    </h4>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {result.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{result.relationship}</p>
                  <p className="text-gray-500 text-sm">{result.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mt-6 text-center"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <a
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-purple-800"
              >
                View Detailed Report{' '}
                <ExternalLinkIcon className="ml-1 h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

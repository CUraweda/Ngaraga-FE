import React from 'react'
import { CiTrophy } from 'react-icons/ci'

interface CollectorProps {
    rank: number
    name: string
    totalCards: number
    avatarUrl: string
  }
  
  const collectors: CollectorProps[] = [
    { rank: 1, name: "Keepitreal", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 2, name: "DigiLab", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 3, name: "GravityOne", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 4, name: "Juanie", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 5, name: "BlueWhale", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 6, name: "mr fox", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 7, name: "Shroomie", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 8, name: "robotica", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 9, name: "RustyRobot", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 10, name: "animakid", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 11, name: "Dotgu", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
    { rank: 12, name: "Ghiblier", totalCards: 3409, avatarUrl: "/placeholder.svg?height=100&width=100" },
  ]

  function CollectorCard({ rank, name, totalCards, avatarUrl }: CollectorProps) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4">
          <div className="relative">
            <div className="absolute -top-2 -left-2 bg-gray-700 dark:bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
              {rank}
            </div>
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img
                src={avatarUrl || "/placeholder.svg"}
                alt={`${name}'s avatar`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Card: <span className="font-medium">{totalCards} Card</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
const TopCollector = () => {
  return (
    <div>
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Top collectors</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Checkout Top Rated Collectors on the Ngaraga Marketplace
              </p>
            </div>
            <button className="btn bg-amber-400">
              <CiTrophy className="h-4 w-4" />
              <span>View Rankings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collectors.map((collector) => (
              <CollectorCard key={collector.rank} {...collector} />
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default TopCollector

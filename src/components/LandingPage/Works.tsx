import React from 'react'
import { FaCartArrowDown, FaFolder, FaWallet } from 'react-icons/fa6'


interface StepProps {
    title: string
    description: string
    icon: React.ReactNode
  }
  
  const steps: StepProps[] = [
    {
      title: "Find your Card",
      description:
        "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.",
      icon: <FaWallet className="w-12 h-12 text-amber-50" />,
    },
    {
      title: "Scan Your Card",
      description: "Upload your work and setup your collection. Add a description, social links and floor price.",
      icon: <FaFolder className="w-12 h-12 text-amber-50" />,
    },
    {
      title: "Its work",
      description:
        "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
      icon: <FaCartArrowDown className="w-12 h-12 text-amber-50" />,
    },
  ]

  function StepCard({ title, description, icon }: StepProps) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="mb-6">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full blur-md opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    )
  }
const Works = () => {
  return (
    <div>
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Find out how to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Works

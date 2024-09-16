import { CalendarIcon, ImageIcon, RocketIcon, CodeIcon, BugIcon, AwardIcon, UsersIcon, BarChartIcon } from "lucide-react"
import Image from "next/image"

const timelineItems = [
  {
    date: "September 2024",
    title: "Project Inception",
    description: "Identified the need for an efficient background removal tool in the market. Conducted initial market analysis and competitor research. Defined the unique value proposition: a fast, accurate, and user-friendly background removal service.",
    icon: CalendarIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Market analysis graph showing demand for background removal tools",
  },
  {
    date: "February 2024",
    title: "Research and Planning",
    description: "Dove deep into various image segmentation algorithms and machine learning models. Evaluated different tech stacks and cloud services for scalability. Created a detailed project roadmap and allocated resources for development.",
    icon: CodeIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Whiteboard with project architecture and tech stack decisions",
  },
  {
    date: "March 2024",
    title: "Prototype Development",
    description: "Developed a basic prototype using a U-Net architecture for image segmentation. Implemented initial API endpoints for image upload and processing. Achieved a baseline accuracy of 85% on test images.",
    icon: ImageIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Screenshot of the prototype UI with a sample image being processed",
  },
  {
    date: "April 2024",
    title: "Alpha Testing",
    description: "Conducted rigorous internal testing with a diverse set of images. Refined the algorithm to handle edge cases like hair and transparent objects. Improved processing speed by 40% through GPU optimization.",
    icon: BugIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Comparison of original algorithm results vs improved results after alpha testing",
  },
  {
    date: "May 2024",
    title: "UI/UX Development",
    description: "Designed and implemented a user-friendly interface for the web application. Incorporated features like drag-and-drop upload, preview mode, and batch processing. Conducted usability tests with a focus group.",
    icon: UsersIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Mockup of the user interface showing key features",
  },
  {
    date: "June 2024",
    title: "Beta Launch",
    description: "Released a beta version to 500 selected users. Implemented A/B testing for different pricing models. Collected and analyzed user feedback, achieving a satisfaction rate of 88%.",
    icon: RocketIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Graph showing user engagement and feedback during beta testing",
  },
  {
    date: "July 2024",
    title: "Performance Optimization",
    description: "Based on beta feedback, optimized the service for faster processing times. Implemented a caching system to reduce load times by 60%. Improved the algorithm's accuracy to 95% on standard test sets.",
    icon: BarChartIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Before and after comparison of processing times and accuracy improvements",
  },
  {
    date: "August 2024",
    title: "Official Launch",
    description: "Launched the background removal service to the public. Implemented a freemium model with tiered pricing. Achieved 10,000 sign-ups in the first week with a 5% conversion rate to paid plans.",
    icon: AwardIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Launch day statistics showing sign-ups, conversions, and user activity",
  },
]

export default function Component() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center"> F0</h2>
      <h2 className="text-xl md:text-3xl font-bold mb-8 text-center"> Development Timeline</h2>
      <div className="relative border-l border-primary-400">
        {timelineItems.map((item, index) => (
          <div key={index} className="mb-16 ml-6">
            <div className="absolute md:w-8 w-6 md:h-8 h-6 bg-primary-200 rounded-full mt-1.5 md:-left-4 -left-3 flex items-center justify-center">
              <item.icon className="md:h-6 md:w-6 h-4 w-4 text-blue-600" />
            </div>
            <time className="mb-1 text-sm font-normal leading-none text-primary-600">{item.date}</time>
            <h3 className="text-xl font-semibold text-white mt-2 mb-4">
              {item.title}
            </h3>
            <p className="mb-4 text-base font-normal text-primary-900 ">{item.description}</p>
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={400}
              height={200}
              className="rounded-lg shadow-md mb-4 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
import { CalendarIcon, ImageIcon, RocketIcon, CodeIcon, BugIcon, AwardIcon, UsersIcon, BarChartIcon, ArrowLeft, Inspect } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
// import {BlogHeader} from "./global-elements"
interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: React.ElementType; // Type for the icon component
  image: string;
  imageAlt: string;
  href: string;
}
const timelineItems : TimelineItem[] = [
  {
    date: "September 2024",
    title: "F0 Inception",
    description: "I was using remove.bg as a normal lazy user who couldnt help it, its slow, its expensive, its shitty. Then, Theo dropped picthing. I noticed its super fast, and I have $6 on me but totally worht it specially with the optimized image hosting .engineering thing",
    icon: Inspect,
    image: "/docs/picthing.png",
    imageAlt: "Market analysis graph showing demand for background removal tools",
    href: "https://pic.ping.gg/",
  },
  {
    date: "February 2024",
    title: "Research and Planning",
    description: "Dove deep into various image segmentation algorithms and machine learning models. Evaluated different tech stacks and cloud services for scalability. Created a detailed project roadmap and allocated resources for development.",
    icon: CodeIcon,
    image: "/placeholder.svg?height=200&width=8",
    imageAlt: "Whiteboard with project architec8ure and tech stack decisions",
  href:''
    
  },
  {
    date: "March 2024",
    title: "Prototype Development",
    description: "Developed a basic prototype using a U-Net architecture for image segmentation. Implemented initial API endpoints for image upload and processing. Achieved a baseline accuracy of 85% on test images.",
    icon: ImageIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Screenshot of the prototype UI with a sample image being processed",
  href:''
  },
  {
    date: "April 2024",
    title: "Alpha Testing",
    description: "Conducted rigorous internal testing with a diverse set of images. Refined the algorithm to handle edge cases like hair and transparent objects. Improved processing speed by 40% through GPU optimization.",
    icon: BugIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Comparison of original algorithm results vs improved results after alpha testing",
  href:''
  },
  {
    date: "May 2024",
    title: "UI/UX Development",
    description: "Designed and implemented a user-friendly interface for the web application. Incorporated features like drag-and-drop upload, preview mode, and batch processing. Conducted usability tests with a focus group.",
    icon: UsersIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Mockup of the user interface showing key features",
  href:''
  },
  {
    date: "June 2024",
    title: "Beta Launch",
    description: "Released a beta version to 500 selected users. Implemented A/B testing for different pricing models. Collected and analyzed user feedback, achieving a satisfaction rate of 88%.",
    icon: RocketIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Graph showing user engagement and feedback during beta testing",
  href:''
  },
  {
    date: "July 2024",
    title: "Performance Optimization",
    description: "Based on beta feedback, optimized the service for faster processing times. Implemented a caching system to reduce load times by 60%. Improved the algorithm's accuracy to 95% on standard test sets.",
    icon: BarChartIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Before and after comparison of processing times and accuracy improvements",
  href:''
  },
  {
    date: "August 2024",
    title: "Official Launch",
    description: "Launched the background removal service to the public. Implemented a freemium model with tiered pricing. Achieved 10,000 sign-ups in the first week with a 5% conversion rate to paid plans.",
    icon: AwardIcon,
    image: "/placeholder.svg?height=200&width=400",
    imageAlt: "Launch day statistics showing sign-ups, conversions, and user activity",
  href:''
  },
]

const highlightWords = (text: string, href: string, wordsToHighlight: string[]): JSX.Element[] => {
  const regex = new RegExp(`(${wordsToHighlight.join('|')})`, 'gi');
  return text.split(regex).map((part, index) => 
    wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())
      ? (
          <a href={href} key={index} rel="noopener noreferrer" target='_blank' className='mx-1 custom-underline font-medium'>
            {part}
          </a>
        )
      : <span key={index}>{part}</span> // Wrap string parts in a span
  );
};

export  function Docs() {
  const wordsToHighlight = ["picthing"]; 
  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <h2 className="text-xl md:text-3xl font-bold mb-8 text-center text-neutral-200">F0 Dev Timeline</h2>

      <Link href="/" className="w-full flex items-center justify-start mb-4  z-50">
        <ArrowLeft size='20' className="p-2 rounded-full bg-primary-300/50 hover:bg-primary-300 transition duration-300 cursor-pointer h-8 w-8"/>
      </Link>
      <div className="relative border-l border-primary-400/50 z-20">
        {timelineItems.map((item, index) => (
          <div key={index} className="mb-16 ml-6">
            <div className="absolute md:w-8 w-6 md:h-8 h-6 bg-primary-300/50 rounded-full md:-left-4 -left-3 flex items-center justify-center">
              <item.icon className="md:h-6 md:w-6 h-4 w-4 text-blue-600" />
            </div>
            <time className="text-xs md:text-sm font-normal leading-none text-primary-500">{item.date}</time>
            <h3 className="text-xl font-semibold text-white  mb-4">
              {item.title}
            </h3>
            <p className="mb-4 text-base font-semibold text-primary-900 ">
            {highlightWords(item.description, item.href,wordsToHighlight)}
            </p>
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={8000}
              height={8000}
              className="rounded-lg shadow-md mb-4 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Docs;
import {  ImageIcon, RocketIcon, CodeIcon, BugIcon, AwardIcon, UsersIcon, BarChartIcon, ArrowLeft, Inspect } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: React.ElementType; 
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
    imageAlt: "inception (why f0 is indeed needed)",
    href: "https://pic.ping.gg/",
  },
  {
    date: "February 2024",
    title: "Research and Planning",
    description: `
    There are a lot of bg removal services out there, some are open source and some are not, some are in-browser processing and some server-side, some use machine learning and some do not.
    Dove deep into various image segmentation algorithms and machine learning models, and ended up going for rembg, built upon an ONNX runtime-based gpu optimized version. Then, I build a small endpoint in express with bun runtime for serving and processing, It is not open source, neither and avaialable API to call/use yourself (yet).`,
    icon: CodeIcon,
    image: "/docs/rembg.jpeg",
    imageAlt: "rembg",
  href:'https://github.com/danielgatis/rembg'
    
  },
  {
    date: "March 2024",
    title: "F0 Initiation",
    description: "I have been using and obsessing about V0. with shadcn guy, the guy who made it too, working at Vercel and all whats happening is just so inspiring for me because I love those bad boys so much they DO good for the web. So F0 came really inspired by all of this (logo, brand name, and entity)",
    icon: ImageIcon,
    image: "/assets/v0.svg",
    imageAlt: "v0",
  href:'https://v0.dev/'
  },
  {
    date: "April 2024",
    title: "F0.0.0.1 Out",
    description: "First Commit, It came out as nexjs app with tailwind (ofcourse), drizzle ORM with neonDB (first time trying this serverless) with postgreSQL. This stack was not bad at the moment and still. It has been incredible dev experience with typeScript tho.Go open source",
    icon: BugIcon,
    image: "/docs/f0-first-commit.jpeg",
    imageAlt: "Comparison of original algorithm results vs improved results after alpha testing",
  href:'https://github.com/Ebrahim-Ramadan/F0'
  },
  {
    date: "May 2024",
    title: "UI/UX Development",
    description: "Designed and implemented a user-friendly interface for the web application. Incorporated features like drag-and-drop upload, preview mode, and batch processing. Conducted usability tests with a focus group.",
    icon: UsersIcon,
    image: "/",
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
      : <span key={index}>{part}</span> 
  );
};

export  function Docs() {
  const wordsToHighlight = ["picthing", "rembg", "V0", "go open source"]; 
  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <h2 className="text-xl md:text-3xl font-bold mb-8 text-center text-neutral-200">F0 Dev. Timeline</h2>

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
              className={`bg-primary-100 rounded-xl shadow-md mb-4 w-full ${item.image=='/assets/v0.svg'&& 'md:p-20 p-8'}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Docs;
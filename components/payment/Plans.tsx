
import { CheckIcon } from "lucide-react"

export default function Plans({selectedPlan}) {
  return (
    <div className="grid gap-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-2 w-full">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground">Choose the plan that best suits your background removal needs.</p>
      </div>



      <div className="grid gap-6 [&>*]:transition [&>*]:duration-300 [&>*]:p-4 [&>*]:rounded-3xl">
        <div className="hover:bg-primary-100 border-primary-100 border-2
hover:bg-primary-100 border-primary-100 border-2">
          <div>
            <p className="text-2xl md:text-3xl font-semibold">Go nuts Plan</p>
            <p className="text-sm text-primary-900">150 images per month</p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">$4</div>
              <div className="text-muted-foreground">/month</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Batch background removal for up to 150 images</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>No restricitons or commercial shit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Monthly payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Premium image quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Email, chat, and phone support</span>
              </div>
            </div>
          </div>
            <button className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-sm md:text-base rounded-3xl hover:bg-neutral-200 text-black font-semibold w-full">Subscribe</button>
        </div>
        <div className="">
          <div>
            <p className="text-xs px-2 py-1 bg-primary-200 rounded-full w-fit">Founder Mode?</p>
          </div>
          <div className="grid gap-6">
            <div>
              <div className="text-4xl font-bold">Contact Us</div>
            <p className="text-sm text-primary-900">Tailored to your needs</p>

            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Customized background removal solution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Enterprise-level support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-neutral-500" />
                <span>Tailored pricing</span>
              </div>
            </div>
          </div>
            <button className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-sm md:text-base rounded-3xl hover:bg-neutral-200 text-black font-semibold w-full">Contact The Founder</button>
        </div>
      </div>
    </div>
  )
}

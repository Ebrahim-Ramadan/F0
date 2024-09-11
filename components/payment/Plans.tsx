
import { CheckIcon } from "lucide-react"

export default function Plans({selectedPlan}) {
  return (
    <div className="grid gap-8 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground">Choose the plan that best suits your background removal needs.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div>
            <p>Monthly Plan</p>
            <p>Up to 15 images per day</p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">$9</div>
              <div className="text-muted-foreground">per month</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Single image background removal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Up to 15 images per day</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Monthly payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Standard image quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Email support</span>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full">Subscribe</button>
          </div>
        </div>
        <div>
          <div>
            <p>Yearly Plan</p>
            <p>Up to 40 images per day</p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">$99</div>
              <div className="text-muted-foreground">per year</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Batch background removal for multiple images</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Up to 40 images per day</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Yearly payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>High image quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Email and chat support</span>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div>
          <div>
            <p>Enterprise Plan</p>
            <p>Unlimited images per day</p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">$499</div>
              <div className="text-muted-foreground">per year</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Batch background removal for unlimited images</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Unlimited images per day</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Yearly payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Premium image quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Email, chat, and phone support</span>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full">Subscribe</button>
          </div>
        </div>
        <div>
          <div>
            <p>Custom Plan</p>
            <p>Tailored to your needs</p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">Contact Us</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Customized background removal solution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Dedicated account manager</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Enterprise-level support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 fill-primary" />
                <span>Tailored pricing</span>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  )
}

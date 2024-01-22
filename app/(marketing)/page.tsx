import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Medal } from 'lucide-react';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local'
import Link from 'next/link';

const fonts = localFont({
    src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


const MarketingPage = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-x-3 bg-amber-100 rounded-full shadow-sm border py-3 px-4">
            <Medal className="h-4 w-4" />
            <p className="font-bold text-amber-700">
              No 1. Task management system
            </p>
          </div>

          <p className={cn(fonts.className, "text-2xl md:text-4xl")}>
            QuickTask helps for teams move
          </p>

          <div className="text-xl md:text-2xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 rounded-md p-2 w-fit flex items-center justify-center">
            work forward.
          </div>

          <p
            className={cn(
              "text-sm text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
              textFont.className
            )}
          >
            Elevate your productivity with TaskMaster, the ultimate ToDo app
            designed to streamline your daily tasks and boost efficiency.
            Whether you&apos;re a busy professional, a student managing assignments,
            or someone simply looking to stay organized, TaskMaster has you
            covered.
          </p>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/sign-up">Get QuickTask for free</Link>
          </Button>
        </div>
      </div>
    );
}

export default MarketingPage
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Navbar = () => {
    return (
      <div className="w-full h-[60px] flex items-center bg-white fixed top-0 border-b shadow-sm px-6">
        <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
          <Logo />
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            <Button size="sm" variant="outline" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get Taskify for free</Link>
            </Button>
          </div>
        </div>
      </div>
    );
}
 
export default Navbar;
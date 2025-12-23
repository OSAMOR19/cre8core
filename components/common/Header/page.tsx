import { useAuth } from "@/components/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const menuNavigation = [
    { name: "Hackathons", link: "/hackathon" },
    { name: "Bounties", link: "/bounties", submenu: true },
    { name: "Grants", link: "/grants" },
    { name: "Jobs", link: "/jobs" },
    { name: "About", link: "/about" },
  ];
  return (
    <div className="fixed h-20 top-0 w-full z-40 py-4 font-montserrat bg-white flex items-start md:items-center justify-between px-4 md:px-8 lg:px-20">
      <div className="flex items-center justify-between w-full ">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={100} height={40} />
        </Link>
        <div>
          <ul className="hidden md:flex gap-8 items-center text-sm font-light">
            {menuNavigation?.map((item, index) => (
              <li key={index}>
                <Link className="flex items-center gap-1.5" href={item?.link}>
                  {item?.name} {item?.submenu && <IoIosArrowDown size={10} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <div
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <Avatar>
                  <AvatarImage
                    src={user.user_metadata?.avatar_url || "https://github.com/shadcn.png"}
                    alt={user.user_metadata?.full_name || "User"}
                  />
                  <AvatarFallback className="uppercase">
                    {user.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <IoIosArrowDown size={10} />
              </div>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-lg z-50 py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors font-montserrat"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsProfileDropdownOpen(false);
                      router.push("/");
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors font-montserrat"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-700 font-normal hover:bg-transparent hover:text-black">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-black text-white hover:bg-black/90 font-normal rounded-full px-6">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
          <Button className="bg-[#EBB643] hover:bg-[#d9a532] text-slate-900 font-normal font-montserrat rounded-full px-6">
            Connect Wallet
          </Button>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg z-50 flex flex-col p-4 space-y-4">
          <Link
            href="/hackathon"
            className="text-slate-700 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Hackathons
          </Link>
          <Link
            href="/bounties"
            className="text-slate-700 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bounties
          </Link>
          <Link
            href="/grants"
            className="text-slate-700 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Grants
          </Link>
          <Link
            href="/jobs"
            className="text-slate-700 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            href="/about"
            className="text-slate-700 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="text-slate-700 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View Profile
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                  router.push("/");
                }}
                className="text-left text-slate-700 font-medium"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t mt-2">
              <Link
                href="/login"
                className="text-slate-700 font-medium p-2 text-center border rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-white bg-black font-medium p-2 text-center rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}

          <Button className="bg-[#EBB643] hover:bg-[#d9a532] text-slate-900 font-semibold rounded-full w-full">
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;

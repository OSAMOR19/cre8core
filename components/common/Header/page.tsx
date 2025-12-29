import { useAuth } from "@/components/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../../../public/images/logo.png";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  /* Avatar State */
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  /* Fetch Profile Logic */
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }
    };

    fetchProfile();
  }, [user]);

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
            {menuNavigation?.map((item, index) => {
              const isActive = item.link === "/" ? pathname === "/" : pathname?.startsWith(item.link);
              return (
                <li key={index}>
                  <Link
                    className={`flex items-center gap-1.5 transition-colors ${isActive ? "text-[#EBB643] font-bold" : "text-slate-700 hover:text-[#EBB643]"}`}
                    href={item?.link}
                  >
                    {item?.name} {item?.submenu && <IoIosArrowDown size={10} />}
                  </Link>
                </li>
              )
            })}
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
                    src={avatarUrl || user.user_metadata?.avatar_url || "https://github.com/shadcn.png"}
                    alt={user.user_metadata?.full_name || "User"}
                    className="object-cover"
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
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 w-[75%] sm:w-1/2 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full bg-white">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="text-xl font-bold font-montserrat text-slate-900">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-slate-500 hover:text-slate-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col space-y-6">
            <Link
              href="/hackathon"
              className="text-xl font-medium text-slate-800 hover:text-[#EBB643] transition-colors font-montserrat"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hackathons
            </Link>
            <Link
              href="/bounties"
              className="text-xl font-medium text-slate-800 hover:text-[#EBB643] transition-colors font-montserrat"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bounties
            </Link>
            <Link
              href="/grants"
              className="text-xl font-medium text-slate-800 hover:text-[#EBB643] transition-colors font-montserrat"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Grants
            </Link>
            <Link
              href="/jobs"
              className="text-xl font-medium text-slate-800 hover:text-[#EBB643] transition-colors font-montserrat"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/about"
              className="text-xl font-medium text-slate-800 hover:text-[#EBB643] transition-colors font-montserrat"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            <div className="my-4 border-t border-gray-100 pt-6 space-y-6">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 text-lg font-medium text-slate-800 hover:text-[#EBB643] transition-colors font-montserrat"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>View Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                      router.push("/");
                    }}
                    className="text-left text-lg font-medium text-red-500 hover:text-red-600 transition-colors font-montserrat"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    className="w-full py-3 text-center text-slate-700 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full py-3 text-center text-white bg-black font-medium rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Button className="w-full bg-[#EBB643] hover:bg-[#d9a532] text-slate-900 font-bold py-6 rounded-full text-lg shadow-md">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/logo.png";
import { IoIosArrowDown } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const menuNavigation = [
    { name: "Hackathons", link: "/hackathons" },
    { name: "Bounties", link: "/bounties", submenu: true },
    { name: "Grants", link: "/grants" },
    { name: "Jobs", link: "/jobs" },
    { name: "About", link: "/about" },
  ];
  return (
    <div className="fixed h-[80px] shadow-md top-0 w-full z-40 py-4 font-montserrat bg-white flex items-start md:items-center justify-between px-4 md:px-8 lg:px-20">
      <div className="flex items-center justify-between w-full ">
        <div className="">
          <Image src={Logo} alt="Logo" width={100} height={40} />
        </div>
        <div>
          <ul className="flex gap-8 items-center text-sm font-light">
            {menuNavigation?.map((item, index) => (
              <li key={index}>
                <Link className="flex items-center gap-1.5" href={item?.link}>
                  {item?.name} {item?.submenu && <IoIosArrowDown size={10} />}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <IoIosArrowDown size={10} />
          </div>
          <button className="px-4 py-2 bg-[#E4B95C] rounded-2xl text-sm font-light">
            connect wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

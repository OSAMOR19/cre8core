import Link from "next/link";

const footerLinks = [
  {
    title: "Opportunities",
    links: [
      { name: "Browse Jobs", href: "#" },
      { name: "Active Bounties", href: "#" },
      { name: "Upcoming Hackathons", href: "#" },
      { name: "Grant Programs", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Base Documentation", href: "#" },
      { name: "Developer Tools", href: "#" },
      { name: "Community Forum", href: "#" },
      { name: "Success Stories", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
];

const socialMediaLinks = [
  { name: "X (Formerly Twitter)", href: "#", icon: "/icons/x.svg" },
  { name: "Telegram", href: "#", icon: "/icons/telegram.svg" },
  { name: "Discord", href: "#", icon: "/icons/discord.svg" },
];

const Footer = () => {
  return (
    <footer className="px-16 py-10 bg-[#EFEFEF] ">
      <div className="flex justify-between mb-4 footer_bg">
        <div className="max-w-[500px]">
          <h2 className="text-[47px] leading-[1.1]">
            Cre8core Labs Fueling the Creative Layer of{" "}
            <span className="text-[#E4B95C]">Base</span>
          </h2>
          <ul className="flex items-center gap-4 my-4">
            {socialMediaLinks.map((link) => (
              <li className="bg-[#D9D9D985] p-4 rounded-full" key={link.name}>
                <a href={link.href} target="_blank">
                  <img src={link.icon} alt={link.name} width={15} />
                </a>
              </li>
            ))}
          </ul>
          <p className="font-montserrat">©, 2025, Base all right reserved</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-16">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-[#030406]/50 font-semibold font-nunito mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2 text-[#030406]/40 font-montserrat">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#03040629] pt-6">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Cre8core Logo" width={120} />
        </div>
        <ul className="font-montserrat flex gap-5 text-sm">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

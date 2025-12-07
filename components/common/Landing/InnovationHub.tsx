import Image from "next/image";
import React from "react";
import { ImTrophy } from "react-icons/im";
import { IoIosCode } from "react-icons/io";
import { RxRocket } from "react-icons/rx";
import { TbArrowGuide } from "react-icons/tb";
import img1 from "../../../public/images/coin.svg";
import img2 from "../../../public/images/Eth.svg";
import img3 from "../../../public/images/uni.svg";
import img4 from "../../../public/images/chain.svg";
import img5 from "../../../public/images/Polygon.svg";
import img6 from "../../../public/images/opti.svg";

const hubs = [
  {
    icon: <RxRocket color="#183D8B" size={24} />,
    type: "Jobs",
    description:
      "Find Your Next Web3 Career - Connect with leading projects seeking talented developers, designers, and innovators.",
    reward: "500+ Active Positions.",
  },
  {
    icon: <ImTrophy color="#183D8B" size={24} />,
    type: "Bounties",
    description:
      "Solve Challenges, Earn Rewards - Tackle real-world problems and get compensated for your innovative solutions.",
    reward: "$500K+ Total Rewards",
  },
  {
    icon: <IoIosCode color="#183D8B" size={24} />,
    type: "Hackathons",
    description:
      "Build the Future Together - Join collaborative events where breakthrough ideas become reality in just days.",
    reward: "Co25+ Events Annually",
  },
  {
    icon: <TbArrowGuide color="#183D8B" size={24} />,
    type: "Grants",
    description:
      "Fund Your Innovation - Access capital to transform your groundbreaking ideas into impactful Web3 solutions.",
    reward: "$2M+ Distributed",
  },
];

const HubCards = ({
  icon,
  type,
  description,
  reward,
}: {
  icon: React.ReactNode;
  type: string;
  description: string;
  reward: string;
}) => {
  return (
    <div className="bg-[#EFEFEF] min-h-[310px] rounded-md p-6 flex flex-col justify-around  my-6">
      <span className="p-3 flex items-center justify-center w-12 h-12 bg-[#D5DCEB61] rounded-full">
        {icon}
      </span>
      <div className="text-[24px] font-semibold">{type}</div>
      <div className="font-montserrat text-[#666666]">{description}</div>
      <div className=" text-[#666666] text-sm">{reward}</div>
    </div>
  );
};

const InnovationHub = () => {
  return (
    <div>
      <div className="p-12">
        <div className="max-w-xl mx-auto text-center mb-4">
          <h2 className="text-[32px] mb-3">
            Your Complete Web3 Innovation Hub
          </h2>
          <p className="font-montserrat text-[#666666]">
            From finding your dream job to launching groundbreaking projects,
            cre8core lab connects you with every opportunity in the BASE
            ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {hubs.map((hub, index) => (
            <HubCards
              key={index}
              icon={hub.icon}
              type={hub.type}
              description={hub.description}
              reward={hub.reward}
            />
          ))}
          {/* Additional HubCards can be added here */}
        </div>
      </div>

      <div className="bg-[#EFEFEF] p-16">
        <div className="max-w-xl mx-auto text-center mb-4">
          <h2 className="text-[32px] mb-3">
            Trusted by Leading Web3 Organizations
          </h2>
          <p className="font-montserrat text-[#666666]">
            Join the ecosystem that's shaping the future of decentralized
            innovation
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-between max-w-5xl mx-auto mt-5">
          <Image src={img1} alt="01" width={134} height={30} />
          <Image src={img2} alt="02" width={134} height={30} />
          <Image src={img3} alt="03" width={134} height={30} />
          <Image src={img4} alt="04" width={134} height={30} />
          <Image src={img5} alt="05" width={134} height={30} />
          <Image src={img6} alt="06" width={134} height={30} />
        </div>
      </div>
    </div>
  );
};

export default InnovationHub;

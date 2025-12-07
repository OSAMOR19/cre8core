import React from "react";

interface ITestCard {
  img: string;
  name: string;
  title: string;
  description: string;
  text: string;
}

function TestCards({ img, name, title, description, text }: ITestCard) {
  return (
    <div className="bg-[#EFEFEF] min-h-[300px] p-8 rounded-2xl flex flex-col justify-around ">
      <div className="flex gap-5 items-center">
        <img src={img} alt="" />
        <span className="flex flex-col justify-between">
          <p className="font-semibold text-2xl">{name}</p>
          <p>{title}</p>
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-montserrat">"{description}"</p>
        <img src="/images/star.svg" alt="" width={100} />
      </div>
      <p>{text}</p>
    </div>
  );
}

const data = [
  {
    img: "/images/sarah.svg",
    name: "Sarah Chen",
    title: "Solidity developer @BaseDex",
    description:
      "Found my dream job at a leading DeFi protocol through cre8core lab. The platform's focus on BASE ecosystem opportunities made all the difference in my career transition.",
    text: "Landed $180K position at DeFi Labs",
  },
  {
    img: "/images/marcus.svg",
    name: "Marcus Rodriguez",
    title: "Startup Founder",
    description:
      "Received a $50K grant that enabled us to build our NFT marketplace on BASE. The mentorship and resources provided were invaluable for our success",
    text: "LandeRaised $2M Series A funding",
  },
  {
    img: "/images/alex.svg",
    name: "Alex Kim",
    title: "Full-Stack Developer",
    description:
      "Won first place at the BASE Builder Hackathon and turned my project into a thriving dApp with over 10K users. The community support was incredible.",
    text: "Built ChainVault with 10K+ users",
  },
  // Additional testimonials can be added here
];

const Testimonial = () => {
  return (
    <div>
      <div className="p-12">
        <div className="max-w-xl mx-auto text-center mb-4">
          <h2 className="text-[32px] mb-3">
            Success Stories From Our Community
          </h2>
          <p className="font-montserrat text-[#666666]">
            Hear from builders who've transformed their careers and projects
            through cre8core lab
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 mt-10">
          {data.map((item, index) => (
            <TestCards
              img={item.img}
              name={item.name}
              title={item.title}
              description={item.description}
              text={item.text}
            />
          ))}
          {/* Additional HubCards can be added here */}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

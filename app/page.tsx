import InnovationHub from "@/components/common/Landing/InnovationHub";
import MainContent from "@/components/common/Landing/MainContent";
import SideContent from "@/components/common/Landing/SIdeContent";
import Testimonial from "@/components/common/Landing/Testimonial";
import FutureOfWeb3 from "@/components/common/Section/FutureOfWeb3";

export default function Home() {
  return (
    <div>
      <div className="max-w-[90%] mx-auto grid grid-cols-12 gap-8 px-8 my-5">
        <div className="col-span-full lg:col-span-8">
          <MainContent />
        </div>
        <div className="lg:border-l lg:pl-5 col-span-full lg:col-span-4">
          <SideContent />
        </div>
      </div>
      <InnovationHub />
      <Testimonial />
      <FutureOfWeb3
        heading="Ready to Build the Future on BASE?"
        description="Join thousands of builders, creators, and innovators who are shaping the next generation of Web3 applications. Your breakthrough moment starts here."
        text="Join the Cre8Core Community"
        textOutline="Reach Out to UsExplore opportunities"
      />
    </div>
  );
}

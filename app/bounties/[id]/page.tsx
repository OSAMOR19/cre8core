import MainBounty from "@/components/common/Bounty/MainBounty";
import SideBounty from "@/components/common/Bounty/SideBounty";
import { CiBookmark, CiShare1 } from "react-icons/ci";

const BountyDetails = () => {
  return (
    <div className="max-w-[90%] mx-auto grid grid-cols-12 gap-4 my-10">
      <div className=" col-span-full md:col-span-8">
        <span className="flex gap-3 text-[#1E1E1E] justify-end mb-4 text-2xl">
          <CiBookmark />
          <CiShare1 />
        </span>
        <MainBounty />
      </div>
      <div className="col-span-full md:col-span-4 mt-10">
        <SideBounty />
      </div>
    </div>
  );
};

export default BountyDetails;

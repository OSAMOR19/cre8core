import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { IoCalendarOutline } from "react-icons/io5";

const UpcomingEvent = () => {
  return (
    <Card className="p-4 font-montserrat">
      <CardHeader className="flex p-0 justify-between">
        <h4 className="text-lg font-semibold">Upcoming Events</h4>
        <IoCalendarOutline size={20} />
      </CardHeader>
      <CardDescription className=" font-montserrat text-sm text-[#030406B8]">
        <div className="relative ">
          <div className="flex items-center gap-6 mb-4 ">
            <span className="flex flex-col gap-3 justify-between border-l-2 px-4 border-[#183D8B] ">
              <span className="font-semibold">Base Builder Hackathon</span>
              <span>May 15-17, 2025</span>
              <span>$50K in prizes • Virtual event</span>
            </span>
          </div>

          <div className="flex items-center gap-6 mb-4 ">
            <span className="flex flex-col gap-3 justify-between border-l-2 px-4 border-[#8A38F5] ">
              <span className="font-semibold">DeFi Summit BASE</span>
              <span>May 22, 2025</span>
              <span>San Francisco • Networking</span>
            </span>
          </div>

          <div className="flex items-center gap-6 mb-4 ">
            <span className="flex flex-col gap-3 justify-between border-l-2 px-4 border-[#EEBF5A] ">
              <span className="font-semibold">Creator Workshop</span>
              <span>May 28, 2025</span>
              <span>Online • Free registration</span>
            </span>
          </div>
        </div>
        <Button
          onClick={() => window.location.href = '/events'}
          className="w-full rounded-3xl bg-[#EFEFEF] hover:bg-[#EFEFEF]/50 text-black py-6"
        >
          View All Events
        </Button>
      </CardDescription>
    </Card>
  );
};

export default UpcomingEvent;

import React from "react";

const Hackathon = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/images/hackathonbg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" mt-20 h-[calc(100vh-80px)] flex items-center justify-center"
      >
        <div>
          <h1 className="text-white text-[96px] font-semibold">Coming Soon!</h1>
          <p className="text-white text-sm text-center">
            Will host large-scale developer builderthon for projects on Base in
            various demography
          </p>

          <div className="bg-white font-montserrat mt-8 flex flex-col items-center gap-4 py-4 px-6 rounded-lg">
            <p className="text-[#10295F]">
              Want to be the first to know when we are ready?
            </p>
            <div className="flex w-full gap-3">
              <input
                type="text"
                placeholder="Enter your email"
                className="border flex-1 p-1 rounded-lg"
              />
              <button className="bg-[#0F2555] p-4 text-white rounded-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hackathon;

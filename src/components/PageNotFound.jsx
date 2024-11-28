import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <section className="relative z-10 bg-gray-900 py-[60px] sm:py-[80px] md:py-[120px] mb-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full sm:w-2/3 lg:w-1/2 text-center">
              <h2 className="mb-4 text-[40px] sm:text-[50px] md:text-[60px] font-bold leading-none text-white">
                404
              </h2>
              <h4 className="mb-4 text-[18px] sm:text-[22px] font-semibold leading-tight text-white">
                Oops! That page can’t be found
              </h4>
              <p className="mb-8 text-base sm:text-lg text-white">
                The page you are looking for might have been deleted or moved.
              </p>
              <Link
                to="/quiz-app"
                className="inline-block rounded-lg border border-gray-700 px-8 py-3 text-base sm:text-lg font-semibold text-white transition hover:bg-[#0064ff] hover:text-white"
              >
                Go To Home
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-gray-800 to-transparent"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-gray-800 to-transparent"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-gray-800 to-transparent"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-gray-800 to-transparent"></div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;

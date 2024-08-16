import React, { useState, useEffect } from "react";
import { SiGooglegemini } from "react-icons/si";
import { TbLoader3 } from "react-icons/tb";

function Aisuggetions({ isExpanded, prediction, predictionRF }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 second delay

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [isExpanded]);

  return (
    <>
      <div
        className={`w-3/4 ${
          isExpanded ? "h-24" : "h-12"
        }  transition-all duration-300 ease-in-out login-form flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-300 to-sky-500 w-full px-4`}
      >
        {!isExpanded && (
          <>
            <SiGooglegemini className="text-lg text-white animate-pulse" />
            <p className="font-bold text-lg text-white"> AI recommendations</p>
          </>
        )}

        {isExpanded && loading && (
          <TbLoader3 className="text-3xl text-white animate-spin" />
        )}

        {isExpanded && !loading && (
          <div className="mt-2">
            <p className="text-white text-lg">
              Units more to order:{" "}
              <span className="text-xl text-yellow-300">{predictionRF}</span>
            </p>
            <p className="text-white text-lg">
              Suggested selling price:{" "}
              <span className="text-xl text-yellow-300">{prediction}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Aisuggetions;

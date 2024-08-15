import React from "react";
import { useInView } from "react-intersection-observer";

const ScrollAnimation = ({ children, className, triggerOnce }) => {
  const { ref, inView } = useInView({
    triggerOnce: triggerOnce,
    threshold: 0.5,
  });

  const style = {
    opacity: inView ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
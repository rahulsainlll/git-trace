import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.pageYOffset;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="progress-bar-container"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "99999",
          height: "7px",
        }}
      >
        {/* Glowing Progress Bar */}
        <div
          className="progress-bar"
          style={{
            border: "none",
            borderRadius: "2rem",
            height: "100%",
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #ffff ,#404f78)",
            boxShadow: "0 0 2px #ffff, 0 0 5px #404f78, 0 0 10px #2F80ED",
          }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;

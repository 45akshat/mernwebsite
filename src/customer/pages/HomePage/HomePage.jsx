import React, { useState, useRef, useCallback, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import Footer from "../../components/navigation/footer";
import { useNavigate } from "react-router-dom";
import { trackPageView } from "../../../pixel";


const Links = ({ currentIndex }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate(); // Hook for navigation

  const linkData = [
    { title: "Launch 24'", subtitle: "Owners Club" },
    { title: "Retro Street", subtitle: "Subtitle 2" },
    { title: "Raw", subtitle: "Subtitle 3" },
  ];

  const handleNavigate = () => {
    navigate('/products'); // Navigate to the /products page
  };

  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    // Add event listeners to disable scrolling within the component
    const divElement = document.getElementById('no-scroll-div');
    if (divElement) {
      divElement.addEventListener('wheel', preventScroll, { passive: false });
      divElement.addEventListener('touchmove', preventScroll, { passive: false });
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (divElement) {
        divElement.removeEventListener('wheel', preventScroll);
        divElement.removeEventListener('touchmove', preventScroll);
      }
    };
  }, []);

  return (
    <div
      id="no-scroll-div"
      style={{
        position: "absolute",
        bottom: "3%",
        left: "50%",
        transform: "translate(-50%, -50%)", // This centers the content
        zIndex: 100,
        textAlign: "center", // To center the text itself within the div
        overflow: 'hidden',
      }}
    >
      <div style={{
        color: "white",
        fontSize: isMobile ? "10px" : "12px",
        letterSpacing: isMobile ? "-0.7px" : "-0.8px",
        marginBottom: '2vh',
      }}>EXPLORE</div>
      
      {linkData.map((item, index) => (
        <div
          key={index}
          style={{
            color: currentIndex === index ? "white" : "#ffffff78",
            fontWeight: currentIndex === index ? "bolder" : "bold",
            cursor: "pointer",
            transition: "color 0.3s fade-in",
          }}
        >
          <h2
            style={{
              letterSpacing: isMobile ? "-1.2px" : "-2.0px",
              fontSize: isMobile
                ? currentIndex === index
                  ? "26px" // Active link size for mobile
                  : "20px" // Regular link size for mobile
                : currentIndex === index
                  ? "38px" // Active link size for desktop
                  : "26px", // Regular link size for desktop
              transition: isMobile ? "none" : "all 0.3s",
            }}
          >
            {item.title}
          </h2>
        </div>
      ))}
      
      <div
        style={{
          color: "#ffffff",
          textDecoration: 'underline',
          fontWeight: "lighter",
          cursor: "pointer",
          transition: "color 0.3s fade-in",
        }}
        onClick={handleNavigate} // Add the onClick handler for navigation
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginTop: '10vh',
          justifyContent: 'center'
        }} className="text-sm">
          SHOP <span style={{ marginLeft: "5px" }}>→</span>
        </div>
      </div>
    </div>
  );
};

const MainCarouselItem = ({ style }) => (
  <div
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
    }}
  >
    <MainCarousel itemIndex={1} />
  </div>
);

const TextSnapItem = ({ style }) => (
  <div
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "black",
    }}
  >
    <MainCarousel itemIndex={2} />
  </div>
);

const ImageSnapItem = ({ style }) => (
  <div
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "black",
    }}
  >
    <MainCarousel itemIndex={3} />
  </div>
);



const DesktopSnapScroll = ({ items }) => {
  const listRef = useRef();
  const [viewportSize, setViewportSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemCount = items.length;
  const itemSize = viewportSize.height;

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = useCallback(
    ({ scrollOffset }) => {
      const newIndex = Math.round(scrollOffset / itemSize);
      setCurrentIndex(newIndex);
    },
    [itemSize]
  );


  const isLastItem = currentIndex === itemCount - 1;


  return (
    <div style={{ position: "relative" }}>


      {/* Fade-out effect for Links */}
      <div
        style={{
          opacity: isLastItem ? 0 : 1,
          transition: "0.5s all",  // Smooth fade transition
        }}
      >
        <Links currentIndex={currentIndex} />
      </div>

      <List
        ref={listRef}
        height={viewportSize.height}
        itemCount={itemCount}
        itemSize={itemSize}
        width={viewportSize.width}
        onScroll={handleScroll}
        style={{
          // width:"100vw",

          scrollSnapType: "y mandatory",
          overflowY: "scroll",
          scrollbarWidth: "none",
          overflowX:'hidden',
          
        }}
        className="hide-scrollbar"
      >
        {({ index, style }) => (
          <div
            style={{
              ...style,
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            {index === 0 ? (
              <MainCarouselItem
                style={{ width: viewportSize.width, height: viewportSize.height }}
              />
            ) : index === 1 ? (
              <TextSnapItem
                style={{ width: viewportSize.width, height: viewportSize.height }}
              />
            ) : index === 2 ? (
              <ImageSnapItem
                style={{ width: viewportSize.width, height: viewportSize.height }}
              />
            ) : (
              <Footer/>
            ) 
            }
          </div>
        )}
      </List>
    </div>
  );
};




const MobileSnapScroll = ({ items }) => {
  const [isLastImageVisible, setIsLastImageVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null); // Reference to the scroll container

  const navigate = useNavigate();

  const handleNavigate = (where) => {
    navigate(where);
  };


  
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const viewportHeight = window.innerHeight;
      const scrollTop = container.scrollTop;

      // Check if the last item is visible
      const isLastVisible = scrollTop + viewportHeight >= container.scrollHeight;
      setIsLastImageVisible(isLastVisible);

      // Calculate the current index based on scroll position
      const newIndex = Math.floor(scrollTop / viewportHeight);
      setCurrentIndex(Math.min(newIndex, items.length - 1)); // Clamp to avoid out-of-bounds
      // console.log(newIndex)
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items]); // Re-run effect if items change

  return (  
    <div
      ref={containerRef}
      style={{
        scrollSnapType: "y mandatory",
        overflowY: "auto",
        height: "100vh",
        scrollBehavior: 'smooth', // Optional: for smooth scrolling
      }}
    >
      

      {/* Only show Links if we are not on the last item */}
      {currentIndex < items.length - 1 && <Links currentIndex={currentIndex} />}


      {items.map((item, index) => (
        <div
          key={index}
          style={{
            scrollSnapAlign: "start",
            height: "100vh", // Each item takes up a full viewport height
            width: "100vw", // Full width of the viewport
          }}
        >
          {index === 0 ? (
            <MainCarouselItem />
          ) : index === 1 ? (
            <TextSnapItem />
          ) : index === 2 ? (
            <ImageSnapItem />
          ) : (
            <Footer />
          )
          
          }
        </div>
      ))}
      {isLastImageVisible && (
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          Last item is visible
        </div>
      )}
    </div>
  );
};




// HomePage component remains unchanged
const HomePage = () => {
  const items = ['MainCarousel', 'TextSnap', 'ImageSnap', 'Footer'];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    trackPageView();


    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="App">
      {isMobile ? <MobileSnapScroll items={items} isMobile={isMobile} /> : <DesktopSnapScroll items={items} />}
    </div>
  );
};

export default HomePage;
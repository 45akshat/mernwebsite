import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white pt-[6vh]">
      {/* Left section for the banner image */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center h-[60vh] lg:h-auto "
        style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/muser-a9192.appspot.com/o/MOBILE%20BANNER%20PHOTOS%2F000%20FINAL%20DIM%2003.jpg?alt=media&token=d9f46483-e9bd-4c97-9644-7cd395483bc9)' }}
      >
      </div>

      {/* Right section for the About Us content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-black shadow-sm " >
        <div className="max-w-lg text-left">
          <h1 className="text-lg text-gray-300 font-bold mb-6">ABOUT US</h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            At <span className="font-semibold">YAHOOM</span> a cutting-edge streetwear brand founded under Lal Melwani & Grandsons LLP. We are inspired by global street culture and bring high-quality designs to India. Our collection includes a wide range of urban apparel, made in India for those who dare to be different. We value authenticity, comfort, and individuality.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed mt-4">
            Our tagline, <span className="italic">“Streetwear that speaks amazing,”</span> reflects this vision.
            We aim to provide more than just apparel; we offer a form of self-expression, designed for those who embrace individuality and live authentically.
            From bustling streets to dynamic communities, YAHOOM taps into the pulse of urban culture, creating streetwear that resonates with your vibe.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed mt-4">
            Every piece in our collection blends comfort, durability, and cutting-edge style, making it perfect for those who want to stand out effortlessly.
            Made in India and inspired by global street trends, YAHOOM is committed to delivering quality clothing that empowers you to feel and look amazing, every day.
          </p>
          <p className="text-xs  text-gray-400 leading-relaxed mt-4">
            Welcome to YAHOOM, where every thread speaks a story, and every design speaks amazing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

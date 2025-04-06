import Image_1 from "../assets/images/landingPage_1.jpg";
import Image_2 from ".././assets/images/landingPage_2.jpg";
import Image_3 from ".././assets/images/landingPage_3.jpg";
import Image_4 from ".././assets/images/landingPage_4.jpg";
import Logo from ".././assets/images/landingPage_logo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const images = [Image_1, Image_2, Image_3, Image_4, Image_2, Image_4];
  const [CounterState, setCounterState] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed w-full bg-light-primary text-white-bg p-4 flex justify-between items-center z-10">
        <div className="text-2xl font-bold ">VitalCure</div>
        <nav className="flex justify-center items-center space-x-4 sm:visible">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Serving
          </a>
          <a href="#" className="hover:underline">
            Pricing
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </nav>
        <button
          onClick={() => navigate("/login")}
          className="bg-dark-primary1 text-purple-900 px-4 py-2 rounded hover:bg-gray-100"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative p-8 bg-white md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image Grid */}
          <div className="relative grid grid-cols-2 gap-3">
            {/* Top Left Image */}
            <img
              src={Image_1}
              alt="Image 1"
              className="w-full h-32 md:h-60 rounded-lg object-cover"
            />

            {/* Top Right Image - Taller */}
            <img
              src={Image_2}
              alt="Image 2"
              className="w-11/12 h-50 md:h-55 mt-6 rounded-lg object-cover"
            />

            {/* Bottom Left Image */}
            <img
              src={Image_3}
              alt="Image 3"
              className="w-12/12 h-60 md:h-56 mt-4 rounded-lg object-cover"
            />

            {/* Bottom Right Image - Overlapping */}
            <img
              src={Image_4}
              alt="Image 4"
              className="w-full h-32 md:h-80 rounded-lg object-cover shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-inter font-bold text-dark-primary1">
              Protect your health for future generations.
            </h1>
            <p className="text-black font-inter">
              Every step we take towards better health is a commitment to
              enhancing the well-being of our patients and community.
            </p>
            <div className="md:mx-20 flex justify-end w-4/5">
              <button
                onClick={() => navigate("/login")}
                className="border-2 border-black bg px-6 py-2 rounded-lg hover:bg-dark-primary1 hover:text-white-bg  transition-colors"
              >
                Join us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Milestones Section */}
      <section className="bg-light-primary text-white-bg p-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-inter">
            Key milestones in our healthcare impact
          </h2>
          <p className="mb-8 font-inter text-2xl">
            From innovative treatments to community health initiatives, our key
            milestones reflect our commitment to improving health outcomes for
            all.
          </p>
          <ScrollTrigger
            onEnter={() => setCounterState(true)}
            onExit={() => {
              setCounterState(false);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-appear-linear">
              <div className="bg-white-bg text-black-c p-3 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold">
                  {CounterState && <CountUp start={0} end={45}></CountUp>}%
                </h1>
                <p className="font-bold">Reduction in hospital readmissions</p>
              </div>
              <div className="bg-white-bg text-black-c p-3 rounded-lg shadow-md ">
                <h1 className="text-2xl font-bold">
                  {CounterState && <CountUp start={0} end={80}></CountUp>}%
                </h1>
                <p className="font-bold">Patient Satisfaction Rate</p>
              </div>
              <div className="bg-white-bg text-black-c p-3 rounded-lg shadow-md ">
                <h1 className="text-2xl font-bold">
                  {CounterState && <CountUp start={0} end={65}></CountUp>}%
                </h1>
                <p className="font-bold">TeleHealth Services Offered</p>
              </div>
            </div>
          </ScrollTrigger>
        </div>
      </section>

      <section className="relative p-8 mt-3 mb-3 bg-gray-50">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          dir="rtl" // Right to left direction
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative group overflow-hidden rounded-lg mt-2">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-[250px] object-cover rounded-lg transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-black-c bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                  <p className="text-white-bg text-lg font-bold">
                    Our Service is Always Available
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Commitment Section */}
      <section className="bg-light-primary text-white-bg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-5xl font-bold">
              A Commitment to Health and Wellness
            </h1>
            <p className="mt-6">
              Healthcare is the practice of providing medical services to
              improve the health of individuals and communities. It involves
              efforts to prevent illness, promote wellness, and provide
              treatment for various health conditions.
            </p>
            <button className="mt-8 bg-white-bg text-black-c px-6 py-2 rounded-lg hover:bg-dark-primary1 hover:text-white-bg transition-colors">
              Welcome to our hospital
            </button>
          </div>
          <div className="flex-1">
            <img
              src={Image_1}
              alt="Modern Hospital Facility"
              className="w-full rounded-lg "
            />
          </div>
        </div>
      </section>

      {/* Empowering Patients Section */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <img src={Image_4} alt="" className="w-full rounded-lg" />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold">Empowering Patients Through</h2>
            <p>
              At our hospital, we believe that every patient deserves
              personalized care that addresses their unique needs and concerns.
              Our team of healthcare professionals works closely with each
              individual to develop tailored treatment.
            </p>
            <div className="flex space-x-4 pt-5 justify-center items-center w-full">
              <button className="border-2 border-black px-6 py-2 rounded-lg hover:bg-dark-primary1 hover:text-white-bg transition-colors">
                Schedule a Consultation
              </button>
              <button className="border-2 border-black px-6 py-2 rounded-lg hover:bg-dark-primary1 hover:text-white-bg transition-colors">
                Explore Our Personalized Care
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-light-primary text-white-bg p-8 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 ml-10">
          <div className="bg-dark-primary w-4/12">
            <img src={Logo} />
          </div>
          <div className="ml-10rem">
            <h1 className="text-2xl font-bold">Resources</h1>
            <p>Overview</p>
            <p>Condition</p>
            <p>Treatment</p>
            <p>Support</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Connect</h1>
            <p>Patient Portal</p>
            <p>Community Program</p>
            <p>Support Group</p>
            <p>Volunteer Opportunities</p>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Follow Us</h1>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Discord</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

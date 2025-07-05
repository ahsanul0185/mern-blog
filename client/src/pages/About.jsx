import React from "react";
import image_cover from "../assets/about_cover.jpg";
import NewsLetter from "../components/hero/NewsLetter";

const cards = [
  {
    no: "01",
    title: "Brainstorming",
    desc: "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated",
  },
  {
    no: "02",
    title: "Analysing",
    desc: "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line solely on the bottom line.",
  },
  {
    no: "03",
    title: "News Publishing",
    desc: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
  },
];

const About = () => {
  return (
  <>
    <div className="default-padding">
      <div className="flex flex-col py-6 md:py-12 gap-3 md:gap-6 items-center max-w-[80%] md:max-w-[70%] mx-auto">
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center font-semibold uppercase tracking-widest block">
          About Us
        </span>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
          Creative Blog Writting and publishing site
        </h2>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews. Iterative approaches to corporate strategy foster
          collaborative thinking to further the overall value proposition.
          Organically grow the holistic world view of disruptive innovation via
          workplace diversity and empowerment.
        </p>
      </div>

      <img
        src={image_cover}
        alt="cover image"
        className="aspect-[16/6] object-cover rounded-xl"
      />

      <div className="my-16">
        <span className="text-xs text-gray-600 dark:text-gray-300 mt-0 md:mt-6 font-semibold uppercase tracking-widest block">
          How we workd
        </span>

        <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold mt-5">
          I will show you how <br /> our team works
        </h2>

        <div className="mt-12 flex flex-col lg:flex-row gap-3">
          {cards.map((card) => (
            <div key={card.no} className="p-5 flex-1 rounded-xl relative group hover:bg-primary dark:hover:bg-primary pt-20 md:pt-26 duration-300 ease-in-out">
              <span className="absolute top-5 left-5 text-5xl md:text-6xl font-semibold text-gray-200 dark:text-gray-200/40 group-hover:text-white  duration-300 ease-in-out">{card.no}</span>
              <h3 className="text-lg md:text-xl font-semibold text-primary group-hover:text-white  duration-300 ease-in-out">{card.title}</h3>
              <p className="text-sm md:text-base text-gray-400 dark:text-gray-300 group-hover:text-gray-200 mt-3 md:mt-4 duration-300 ease-in-out">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <NewsLetter />
    </>
  );
};

export default About;

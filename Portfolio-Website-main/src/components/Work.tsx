import "./styles/Work.css";
import WorkVideo from "./WorkVideo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const worksData = [
  {
    num: "01",
    title: "Youtube Gaming Channel",
    category: "AayuGaming10",
    tools: "Davinci-Resolve, Adobe-Photoshop, Canva, Youtube-Algorithm",
    video: "https://youtu.be/QzPzmpuJGko?si=l1qcKaxAYex2YukY",
  },
  {
    num: "02",
    title: "Gaming Montage & Stream Highlights",
    category: "AayuGaming10",
    tools: "Davinci-Resolve(studio), Adobe-photoshop, Cap cut",
    video: "https://youtu.be/XQmkxSkbXJU?si=OBlqalbRwhL8vtKd",
  },
  {
    num: "03",
    title: "Work With Engineerbrother's",
    category: "Youtube  Edit & thumbnail design",
    tools: "Tech-Review, Youtubes-script, Davinci-Resolve",
    video: "https://youtu.be/BZTQG-CQy8g?si=0GJFv_EqBHrhm6vM",
  },
];

const Work = () => {
  useGSAP(() => {
    function getTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return 0;
      const container = document.querySelector(".work-container");
      if (!container) return 0;
      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parent = box[0].parentElement;
      if (!parent) return 0;
      const parentWidth = parent.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      return rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`, // Recalculate on refresh
        scrub: true,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(), // Recalculate on refresh
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {worksData.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkVideo Video={project.video} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

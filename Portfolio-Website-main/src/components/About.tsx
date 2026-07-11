import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm Aayush Bhayani, a passionate Video Editor, Script Writer, and Creative Content Specialist dedicated to transforming ideas into engaging visual stories. My primary expertise lies in professional video editing, where I combine cinematic storytelling, seamless transitions, advanced motion graphics, sound design, and color grading to create content that captures attention and keeps viewers engaged.
        </p>
        <p className="para" style={{ marginTop: "1.5rem" }}>
          I specialize in editing YouTube videos, Instagram Reels, YouTube Shorts, gaming content, promotional videos, and social media advertisements designed to maximize audience retention and increase engagement. Every project I work on is crafted with a strong focus on pacing, emotion, and storytelling to ensure the final video leaves a lasting impression.
        </p>
        <a className="about-resume-btn" href="Aayu_Bhayani_Resume.pdf" target="_blank" rel="noopener noreferrer">
          <HoverLinks text="VIEW RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      </div>
    </div>
  );
};

export default About;

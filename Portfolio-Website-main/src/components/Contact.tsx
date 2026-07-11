import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { BsYoutube } from "react-icons/bs";
import { ImInstagram } from "react-icons/im";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:[EMAIL_ADDRESS]" data-cursor="disable">
                bhayaniaayush36@gmail.com
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.youtube.com/@AayuGaming10"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              <BsYoutube />  YOUTUBE
            </a>
            <a
              href="https://www.instagram.com/aayush_bhayani10?igsh=bDZ3eHI0eWk1aXFt"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              <ImInstagram />   INSTAGRAM
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Aayush Bhayani</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

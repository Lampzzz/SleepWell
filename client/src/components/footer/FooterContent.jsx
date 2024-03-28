import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const FooterContact = () => {
  return (
    <div>
      <h5 className="mt-2 mb-3">Get in touch</h5>
      <ul className="list-unstyled">
        <li>
          <FaLocationDot className="me-2" />
          Paulino Caloocan City
        </li>
        <li>
          <MdEmail className="me-2" />
          sleepwell@gmail.com
        </li>
        <li>
          <FaPhone className="me-2" />
          +639300311893
        </li>
      </ul>
    </div>
  );
};

export default FooterContact;

import { FaPlay, FaPause, FaStop } from "react-icons/fa6";

const SessionButton = ({ label, action }) => {
  let IconComponent;

  switch (label) {
    case "play":
      IconComponent = FaPlay;
      break;
    case "pause":
      IconComponent = FaPause;
      break;
    case "stop":
      IconComponent = FaStop;
      break;
    default:
      break;
  }

  return (
    <div className="position-relative">
      <button className="btn btn-primary rounded-circle p-4" onClick={action}>
        <IconComponent color="#ffffff" className="session--icon" />
      </button>
    </div>
  );
};

export default SessionButton;

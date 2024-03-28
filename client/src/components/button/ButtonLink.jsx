import { Link } from "react-router-dom";

const ButtonLink = ({ link, label, style }) => {
  return (
    <>
      <Link to={link}>
        <button className={style}>{label}</button>
      </Link>
    </>
  );
};

export default ButtonLink;

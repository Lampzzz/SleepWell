import logo from "../../assets/image/logo.png";

const FooterLogo = () => {
  return (
    <div>
      <img src={logo} id="logo" alt="Logo" className="mb-3" />
      <p className="mb-0 text-black">
        Experience an elevated sleep journey through state-of-the-art
        monitoring, promoting holistic well-being.
      </p>
    </div>
  );
};

export default FooterLogo;

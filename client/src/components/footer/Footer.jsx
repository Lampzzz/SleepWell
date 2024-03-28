import FooterLogo from "./FooterLogo";
import FooterContact from "./FooterContent";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  const quickLinks = [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/about-us" },
    { label: "Contact", url: "/contact-us" },
    { label: "FAQ", url: "/freq-question" },
  ];

  const supportLinks = [
    { label: "Terms & Conditions", url: "/terms-conditions" },
    { label: "Privacy Policy", url: "/privacy-policy" },
  ];

  return (
    <footer className="container-fluid bg-light pt-5 pb-3 ">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3 d-flex justify-content-start justify-content-lg-center mb-3 mb-lg-0">
            <FooterLogo />
          </div>
          <div className="col-6 col-lg-3 d-flex justify-content-start justify-content-lg-center">
            <FooterLinks title="Quick Links" links={quickLinks} />
          </div>
          <div className="col-6 col-lg-3 d-flex justify-content-start justify-content-lg-center">
            <FooterLinks title="Support" links={supportLinks} />
          </div>
          <div className="col-12 col-lg-3 d-flex justify-content-start justify-content-lg-center">
            <FooterContact />
          </div>
        </div>
        <hr className="opacity-25 mb-3" />
        <div className="text-center">
          <p className="mb-0">© 2024 SleepWell. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

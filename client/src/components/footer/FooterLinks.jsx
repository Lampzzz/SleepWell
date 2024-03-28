const FooterLinks = ({ title, links }) => {
  return (
    <div>
      <h5 className="mt-2 mb-3">{title}</h5>
      <ul className="list-unstyled footer__links">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="text-black text-decoration-none">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;

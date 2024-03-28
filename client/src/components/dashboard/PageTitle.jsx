const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mt-4 mb-5">
      <h2>{title}</h2>
      <p className="mb-0">{subtitle}</p>
    </div>
  );
};

export default PageTitle;

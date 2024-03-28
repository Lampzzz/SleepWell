const Title = ({ title, subtitle }) => {
  return (
    <div className="mb-3">
      <h2>{title}</h2>
      <p className="text-black-50 mb-0">{subtitle}</p>
    </div>
  );
};

export default Title;

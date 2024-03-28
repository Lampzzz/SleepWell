const AccordionItem = ({ title, content, id }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed shadow-none "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${id}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`flush-collapse${id}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body text-black-50 ">{content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;

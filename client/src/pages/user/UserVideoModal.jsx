import { IoClose } from "react-icons/io5";

const UserVideoModal = ({ video, onClose }) => {
  return (
    <>
      {video && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className={`modal fade ${video ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{
              display: video ? "block" : "none",
            }}
          >
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content bg-transparent ">
                <div className="modal-header border-0 mb-0">
                  <button
                    type="button"
                    className="btn shadow-none border-0 ms-auto"
                    onClick={onClose}
                  >
                    <IoClose color="#fff" size={40} />
                  </button>
                </div>
                <div className="modal-body text-center">
                  <video controls>
                    <source
                      src={`http://localhost:3000/videos/${video}`}
                      type="video/webm"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserVideoModal;

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import Input from "../../../components/form/Input";
import Textarea from "../../../components/form/Textarea";
import ButtonAction from "../../../components/button/ButtonAction";
import { useSendContactMutation } from "../../../services/redux/api/userApiSlice";

const ContactUs = () => {
  const initialize = {
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  const [sendContact, { isLoading }] = useSendContactMutation();
  const [contact, setContact] = useState(initialize);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContact(contact).unwrap();
      toast.success("Send Successfully");
      setContact(initialize);
    } catch (err) {
      toast.error(err.data.errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex align-items-center banner py-5">
        <div className="banner__content">
          <h1>Contact</h1>
          <div className="d-flex">
            <Link to="/" className="text-black-50 text-decoration-none">
              Home
            </Link>
            <span className="mx-1">/</span>
            <Link
              to="/contact-us"
              className="text-black-50 text-decoration-none"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-white">
        <div className="container my-5">
          <div className="text-center mb-5">
            <h1>Contact Us</h1>
            <p className="mb-0 text-black-50">
              We'd love to talk about how we can help you.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-7">
                <div className="mb-3">
                  <label htmlFor="fullName">Full Name</label>
                  <Input
                    type={"text"}
                    name={"fullName"}
                    value={contact.fullName}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Input
                    type={"text"}
                    name={"email"}
                    value={contact.email}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Input
                    type={"text"}
                    name={"email"}
                    value={contact.phoneNumber}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message">Message</label>
                  <Textarea
                    name={"message"}
                    value={contact.message}
                    handleChange={handleChange}
                    required={true}
                  />
                </div>
                <ButtonAction
                  style={"btn btn-primary w-25"}
                  type={"submit"}
                  label={"Submit"}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

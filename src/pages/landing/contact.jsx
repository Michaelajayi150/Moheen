import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import * as MdIcons from "react-icons/md";
import * as CiIcons from "react-icons/ci";
import { Links } from "../../assets/data";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(false);
  const [state, handleSubmit] = useForm("xnqkrylk");

  useEffect(() => {
    if (state.succeeded) {
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setStatus(true);
      setTimeout(() => {
        setStatus(false);
      }, 2000);
    }
  }, [setForm, state.succeeded]);

  const handleChange = (inputSpec) => (e) => {
    setForm((prev) => ({ ...prev, [inputSpec]: e.target.value }));
    console.log(state.errors);
  };

  return (
    <section id="contact" className="py-16 px-6 max-w-[1120px] mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-semibold">Contact Us</h2>
        <p className="text-lg text-shades-200">
          Need any help? Do not hesitate to contact us
        </p>
      </div>
      <div className="flex max-sm:flex-col-reverse gap-6 md:gap-12 lg:gap-24 w-full mt-4">
        <form
          className="contact-form flex flex-col gap-3 w-full"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl text-left self-start font-medium">
            Talk to us
          </h3>

          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
            {/* Name Error */}
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
            {/* Email Error */}
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message">Your Message</label>
            {/* Text area */}
            <textarea
              type="text"
              id="message"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange("message")}
              minLength="30"
              required
            />
            {/* Text Message Error */}
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button
            className="uppercase bg-primary border border-primary hover:bg-white hover:text-primary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded text-white duration-500"
            type="submit"
            value="submit"
            disabled={state.submitting}
          >
            Send
          </button>
        </form>

        <div className="space-y-6 w-full">
          <h3 className="text-3xl font-semibold">Contact Information</h3>

          <div className="flex gap-3 text-secondary">
            <MdIcons.MdOutlineLocationOn className="mt-1" size="1.5rem" />
            <div className="text-neutral">
              <h4 className="text-xl">Our Address</h4>
              <address>36 Adamu street, Lagos</address>
            </div>
          </div>
          <div className="flex gap-3 text-secondary">
            <MdIcons.MdOutlinePhoneInTalk className="mt-1" size="1.5rem" />
            <div className="text-neutral">
              <h4 className="text-xl">Phone number</h4>
              <a rel="noreferrer" target="_blank" href={`tel: ${Links.phone}`}>
                (+234) {Links.phone.substring(1)}
              </a>
            </div>
          </div>
          <div className="flex gap-3 text-secondary">
            <MdIcons.MdAlternateEmail className="mt-1" size="1.5rem" />
            <div className="text-neutral">
              <h4 className="text-xl">Email address</h4>
              <a
                rel="noreferrer"
                target="_blank"
                href={`mailto: ${Links.mail}`}
              >
                {Links.mail}
              </a>
            </div>
          </div>
          <div className="flex gap-3 text-secondary">
            <CiIcons.CiClock2 className="mt-1" size="1.5rem" />
            <div className="text-neutral">
              <h4 className="text-xl">Working hours</h4>
              <span>Mon - Sat 8: 00am - 9:00pm</span>
            </div>
          </div>
        </div>
      </div>

      {status && <p>Message sent</p>}
    </section>
  );
}

export default Contact;

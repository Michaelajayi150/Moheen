import { aboutImage } from "../../assets";

function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 px-6 max-w-[1120px] mx-auto flex max-md:flex-col justify-between gap-8 md:gap-4"
    >
      <div className="md:w-8/12 space-y-3">
        <h2 className="text-3xl font-semibold relative w-fit">
          About Us
          <span className="absolute -z-0 right-1/4 bg-[#32338536] w-10 h-10 rounded-full" />
        </h2>
        <div className="md:max-w-lg space-y-4">
          <p>
            At moheencollections, we are driven by the goal to bring comfort and
            elegance to your space with our products. We do not just sell
            interior decor products, we sell comfort and elegance while
            rendering optimal services to all our clients.
          </p>

          <ul className="list-disc space-y-2">
            <li>
              💯 Legit - we are registered under CAC and have been in business
              for over 5 years.
            </li>
            <li>
              Quality products - we sell quality products with unique designs.
            </li>
            <li>
              Top Notch customer service - our customer service is top notch.
            </li>
          </ul>
          <p>
            We understand your need to have a good sleep at home after long
            working hours and with our products , we can assure you that your
            good sleep is sure. moheencollections is a business that has been
            into selling quality bedsheets, duvets, towels, bathrobes and
            interior products since 2019.
          </p>
        </div>
      </div>
      <div className="md:w-4/12">
        <img className="w-full" src={aboutImage} alt="About Moheen" />
      </div>
    </section>
  );
}

export default AboutSection;

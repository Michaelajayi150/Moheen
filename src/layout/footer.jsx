import { Logo2 } from "../assets";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { Links } from "../assets/data";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-neutral text-white">
      <div className="pt-16 pb-6 px-6 lg:max-w-[1120px] mx-auto relative">
        <Link to="/">
          <img src={Logo2} alt="Moheen" />
        </Link>
        <p className="mt-6">
          Join us on a journey of timeless elegance and modern luxury. Whether
          it&apos;s our intricately designed jewelry, finely crafted
          accessories, or thoughtfully curated home decor, every item reflects
          our unwavering dedication to excellence. Explore the world of Moheen
          Collections, where each piece is a testament to the artistry of life.
        </p>

        <div className="flex max-[400px]:flex-col justify-between gap-6 my-6">
          <div className="font-medium footer-tag space-y-3">
            <h4 className="text-secondary uppercase text-xl">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <address>36 Adamu street, Lagos</address>
              <a rel="noreferrer" target="_blank" href={`tel: ${Links.phone}`}>
                (+234) {Links.phone.substring(1)}
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href={`mailto: ${Links.mail}`}
              >
                {Links.mail}
              </a>
            </div>
          </div>
          <div className="font-medium footer-tag space-y-3">
            <h4 className="text-secondary uppercase text-xl">Socials</h4>
            <div className="flex items-center gap-3 text-xl">
              <a
                href={Links.instagram}
                rel="noreferrer"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center border border-white rounded-full hover:text-secondary hover:border-secondary"
              >
                <RiIcons.RiInstagramLine size="1rem" />
              </a>
              <a
                href={Links.facebook}
                rel="noreferrer"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center border border-white rounded-full hover:text-secondary hover:border-secondary"
              >
                <MdIcons.MdOutlineFacebook size="1rem" />
              </a>
              <a
                href={Links.twitter}
                rel="noreferrer"
                target="_blank"
                className="w-8 h-8 flex items-center justify-center border border-white rounded-full hover:text-secondary hover:border-secondary"
              >
                <RiIcons.RiTwitterXFill size="0.8rem" />
              </a>
            </div>
          </div>
        </div>

        <h3 className="font-medium text-lg text-center">
          COPYRIGHT &copy; MOHEENCOLLECTIONS | {new Date().getFullYear()} | ALL
          RIGHTS RESERVED.
        </h3>
      </div>
    </footer>
  );
}

export default Footer;

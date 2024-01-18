import { useState } from "react";
import { Links } from "../assets/data";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { Link } from "react-router-dom";
import { Logo } from "../assets";

function AdminHeader() {
  const [menu, setMenu] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/admin" },
    { name: "Upload Product", href: "/admin/uploadProduct/new/new" },
    { name: "Orders", href: "/admin/deliveries" },
  ];
  return (
    <header className={`${menu ? "max-sm:fixed z-50" : "relative"} w-full`}>
      <nav className="gradient px-6 w-full">
        <div className="flex items-center justify-between py-3 max-w-[1120px] mx-auto text-white">
          <div className="flex items-center gap-3">
            <a
              rel="noreferrer"
              target="_blank"
              href={`tel: ${Links.phone}`}
              className="flex gap-1 items-center"
            >
              <MdIcons.MdOutlinePhone />
              <span className="max-md:hidden">{Links.phone}</span>
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href={`mailto: ${Links.mail}`}
              className="flex gap-1 items-center"
            >
              <MdIcons.MdMail />
              <span className="max-md:hidden">{Links.mail}</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-xl">
            <a href={Links.instagram} rel="noreferrer" target="_blank">
              <RiIcons.RiInstagramLine size="1rem" />
            </a>
            <a href={Links.facebook} rel="noreferrer" target="_blank">
              <MdIcons.MdOutlineFacebook size="1rem" />
            </a>
            <a href={Links.twitter} rel="noreferrer" target="_blank">
              <RiIcons.RiTwitterXFill size="0.8rem" />
            </a>
          </div>
        </div>
      </nav>

      <nav className="flex items-center justify-between py-3 px-6 lg:max-w-[1120px] mx-auto bg-white relative">
        <Link to="/">
          <img src={Logo} alt="Moheen Collection" />
        </Link>

        {menu ? (
          <MdIcons.MdClose
            onClick={() => setMenu((prev) => !prev)}
            className="sm:hidden w-fit relative z-10 cursor-pointer"
            size="1.5rem"
          />
        ) : (
          <MdIcons.MdMenu
            onClick={() => setMenu((prev) => !prev)}
            className="sm:hidden w-fit relative z-10 cursor-pointer"
            size="1.5rem"
          />
        )}

        <div
          onClick={() => setMenu((prev) => !prev)}
          className={`${
            menu
              ? "fixed top-20 h-full bg-neutral bg-opacity-50 left-0 w-full"
              : "relative hidden"
          } sm:hidden -z-10`}
        />

        <nav
          className={`${
            menu
              ? "max-sm:fixed max-sm:top-20 h-full flex max-sm:flex-col justify-center bg-white right-0 w-1/2"
              : "relative hidden justify-between"
          } sm:justify-between sm:items-center duration-500 max-sm:pl-6 sm:w-9/12 md:w-8/12 sm:flex max-sm:gap-4`}
        >
          <nav
            className={`${
              menu ? "flex-col" : "flex-row"
            } flex sm:items-center gap-6 sm:flex-row`}
          >
            {navLinks.map((link, id) => (
              <Link
                onClick={() => setMenu((prev) => !prev)}
                to={link.href}
                key={id + link.name}
                className="cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </nav>
      </nav>
    </header>
  );
}

export default AdminHeader;

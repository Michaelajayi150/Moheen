/* eslint-disable react/prop-types */
import { AuthContext } from "../App";
import { useContext, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

import { Logo } from "../assets";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { useLocation } from "react-router-dom";

function Header() {
  const { cart, user, setOption } = useContext(AuthContext);

  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Products", href: "/#products" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`${menu ? "fixed z-50" : "relative"} w-full md:relative`}
    >
      <nav className="gradient px-6 w-full">
        <div className="flex items-center justify-between py-3 max-w-[1120px] mx-auto text-white">
          <div className="flex items-center gap-3">
            <a href="tel:090000000" className="flex gap-1 items-center">
              <MdIcons.MdOutlinePhone />
              <span className="max-md:hidden">0900 000 000</span>
            </a>
            <a
              href="mailto:ajayimichael@gmail.com"
              className="flex gap-1 items-center"
            >
              <MdIcons.MdMail />
              <span className="max-md:hidden">Moheen@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-xl">
            <a href="#">
              <RiIcons.RiInstagramLine size="1rem" />
            </a>
            <a href="#">
              <MdIcons.MdFacebook size="1rem" />
            </a>
            <a href="#">
              <RiIcons.RiTwitterXFill size="0.8rem" />
            </a>
          </div>
        </div>
      </nav>

      {pathname.split("/")[1] === "register" ||
      pathname.split("/")[1] === "login" ? null : (
        <nav className="flex items-center justify-between py-3 px-6 lg:max-w-[1120px] mx-auto bg-white relative">
          <img src={Logo} alt="Moheen Collection" />

          {menu ? (
            <MdIcons.MdClose
              onClick={() => setMenu((prev) => !prev)}
              className="sm:hidden w-fit"
              size="1.5rem"
            />
          ) : (
            <MdIcons.MdMenu
              onClick={() => setMenu((prev) => !prev)}
              className="sm:hidden w-fit"
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
                ? "fixed top-20 h-full flex flex-col justify-center bg-white right-0 w-1/2"
                : "relative hidden justify-between"
            } md:justify-between items-center duration-500 sm:w-9/12 md:w-8/12 sm:flex max-sm:gap-4`}
          >
            <nav
              className={`${
                menu ? "flex-col" : "flex-row"
              } flex items-center gap-4 md:flex-row`}
            >
              {navLinks.map((link, id) => (
                <Link
                  onClick={() => setMenu((prev) => !prev)}
                  smooth
                  to={link.href}
                  key={id + link.name}
                  className="cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <nav
              className={`${
                menu ? "flex-col" : "flex-row"
              } flex items-center gap-4 md:gap-3 py-2 md:flex-row`}
            >
              <div className="flex items-center gap-2">
                <div className="max-sm:hidden w-10 h-10 flex items-center justify-center rounded-full border border-neutral cursor-pointer hover:text-secondary hover:border-secondary">
                  <MdIcons.MdSearch size="1.2rem" />
                </div>
                <span className="sm:hidden">Search</span>
              </div>
              {!user ? (
                <div
                  onClick={() => setOption("login")}
                  className="uppercase text-sm bg-primary border-2 border-white hover:bg-white hover:border-primary hover:text-primary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded-md text-white"
                >
                  Login
                </div>
              ) : (
                <Link to="/cart" className="flex items-center gap-2">
                  <div className="max-sm:hidden w-10 h-10 flex items-center justify-center rounded-full border border-neutral cursor-pointer group hover:text-secondary hover:border-secondary relative">
                    <MdIcons.MdOutlineShoppingBag size="1.2rem" />
                    <span className="absolute -bottom-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full border border-neutral group-hover:border-secondary text-[10px] font-semibold bg-white">
                      {cart.length}
                    </span>
                  </div>
                  <span className="sm:hidden">Cart ({cart.length})</span>
                </Link>
              )}
            </nav>
          </nav>
        </nav>
      )}
    </header>
  );
}

export default Header;

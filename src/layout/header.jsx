/* eslint-disable react/prop-types */
import { AuthContext } from "../App";
import { useContext, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

import { Logo } from "../assets";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { Links, categories } from "../assets/data";

function Header() {
  const { cart, user, setOption } = useContext(AuthContext);

  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Products", href: "/products/" },
    { name: "Contact", href: "/#contact" },
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

      {pathname.split("/")[1] === "register" ||
      pathname.split("/")[1] === "login" ? null : (
        <nav className="flex items-center justify-between py-3 px-6 lg:max-w-[1120px] mx-auto bg-white relative">
          <Link to="/">
            <img src={Logo} alt="Moheen Collection" />
          </Link>

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
                ? "max-sm:fixed max-sm:top-20 h-full flex max-sm:flex-col justify-center bg-white right-0 w-1/2"
                : "relative hidden justify-between"
            } sm:justify-between items-center duration-500 sm:w-9/12 md:w-8/12 sm:flex max-sm:gap-4`}
          >
            <nav
              className={`${
                menu ? "flex-col" : "flex-row"
              } flex items-center gap-6 sm:flex-row`}
            >
              {navLinks.map((link, id) =>
                link.name === "Products" ? (
                  <div key={id + link.name} className="relative">
                    <p className="peer cursor-pointer">{link.name}</p>
                    <div className="peer-hover:z-10 hover:z-10 peer-hover:top-full peer-hover:visible peer-hover:opacity-100 translate-y-6 hover:top-full hover:visible hover:opacity-100 duration-500 -z-10 -top-full absolute invisible bg-white flex flex-col min-w-max">
                      {categories.map((category) => (
                        <Link
                          key={category.target + category.name}
                          to={{
                            pathname: "/products",
                            search: `?type=${category.target}`,
                          }}
                          className="border-b px-8 py-3 hover:bg-primary hover:text-white w-full"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    onClick={() => setMenu((prev) => !prev)}
                    smooth
                    to={link.href}
                    key={id + link.name}
                    className="cursor-pointer"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            <nav
              className={`${
                menu ? "flex-col" : "flex-row"
              } flex items-center gap-4 sm:gap-3 py-2 sm:flex-row`}
            >
              {/* <div className="flex items-center gap-2">
                <div className="max-sm:hidden w-10 h-10 flex items-center justify-center rounded-full border border-neutral cursor-pointer hover:text-secondary hover:border-secondary">
                  <MdIcons.MdSearch size="1.2rem" />
                </div>
                <span className="sm:hidden">Search</span>
              </div> */}
              {!user ? (
                <button
                  onClick={() => setOption("login")}
                  className="uppercase text-sm bg-primary border-2 border-white hover:bg-white hover:border-primary hover:text-primary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded-md text-white"
                >
                  Login
                </button>
              ) : user?.email === "moheenadmin@gmail.com" ? (
                <Link to="/admin" className="flex items-center gap-2">
                  <div className="max-sm:hidden w-10 h-10 flex items-center justify-center rounded-full border border-neutral cursor-pointer group hover:text-secondary hover:border-secondary relative">
                    <MdIcons.MdOutlineShoppingBag size="1.2rem" />
                  </div>
                  <span className="sm:hidden">Dashboard</span>
                </Link>
              ) : (
                <Link to="/cart" className="flex items-center gap-2">
                  <div className="max-sm:hidden w-10 h-10 flex items-center justify-center rounded-full border border-neutral cursor-pointer group hover:text-secondary hover:border-secondary relative">
                    <MdIcons.MdOutlineShoppingBag size="1.2rem" />
                    <span className="absolute -bottom-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full border border-neutral group-hover:border-secondary text-[10px] font-semibold bg-white">
                      {cart.length}
                    </span>
                  </div>
                  <span className="sm:hidden">
                    Cart (
                    {cart.filter((cart) => cart.status === "pending").length})
                  </span>
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

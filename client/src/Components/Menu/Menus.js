/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import IconPic from "../../images/kasetnow1.jpg";
// * Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signout } from "../../redux/action/auth";
import { Link } from "react-router-dom";

const Menus = ({ auth: { isAuthenticated ,user}, signout }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-blue-grey-900-contrast">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 " src={IconPic} alt="Workflow" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/product"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Kaset
                </Link>
                {isAuthenticated ? (
                  <Fragment>
                    <Link
                      to="/myshop"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Shop
                    </Link>
                    <Link
                      to="/social"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Social Page
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 md:ml-2 flex items-center ">
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  <Link
                    to="/signin"
                    className="whitespace-nowrap text-base font-medium text-gray-300 hover:text-gray-500"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <Fragment>
                  <button className="bg-gray-800 p-1 rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.avatar}
                          alt=""
                        />
                      </button>
                    </div>
                    <div
                      className={
                        "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" +
                        (profileOpen ? " flex-row" : " hidden")
                      }
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        to="/myprofile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Your Profile
                      </Link>

                      <Link
                        to="/settingprofile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </Link>

                      <a
                        onClick={signout}
                        
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Heroicon name: outline/menu Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Heroicon name: outline/x Menu open: "block", Menu closed: "hidden" */}

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={(navbarOpen ? " flex" : " hidden") + " md:hidden"}>
        <div className="px-4 pt-2 pb-3 space-y-2 sm:px-3">
          <Link
            to=""
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Kaset
          </Link>
          {isAuthenticated ? (
            <Fragment>
              <Link
                to="/myshop"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Shop
              </Link>
              <Link
                to="/social"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Social Page
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                to="/signin"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:bg-gray-700  bg-indigo-600 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Up
              </Link>
            </Fragment>
          )}
        </div>
        {!isAuthenticated ? (
          <Fragment></Fragment>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.avatar}
                  alt=""
                />
              </div>

              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {user.fullname}
                </div>
                <div className="text-sm font-medium leading-none text-gray-300">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="mt-3 px-2 space-y-1 ">
              <Link
                to="/myprofile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Your Profile
              </Link>

              <Link
                to="/settingprofile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Settings
              </Link>

              <a
                onClick={signout}
                
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

signout.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { signout })(Menus);

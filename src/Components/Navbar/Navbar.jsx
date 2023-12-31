//Inbuilt modules:
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//Own Files:
import "./Navbar.css";
import Searchbar from "./Searchbar/Searchbar";

//React Icons:
import { RiVideoAddLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { login } from "../../Actions/auth";

function Navbar({ toggleDrawer }) {
  const CurrentUser = null;
  /* const CurrentUser = {
    result: {
      email: "abisek501@BiLogoGmail.com",
      name: "Abisek",
      JoinedOn: "10-11-2023:57:23:4892",
    },
  }; */
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "973380708341-20i9sumhb79h6bd5t7534aoi0cu0d8sl.apps.googleusercontent.com",
        scope:"email"
      })
    }
    gapi.load("client:auth2", start);
  },[])

 const dispatch = useDispatch();

  const onSuccess = (response) => {
    const Email = response.profileObj.email;
    console.log(Email);
    dispatch(login({email:Email}))
  }
  const onFailure = (response) => {
    console.log("Unable to login with Google", response);
  }
  return (
    <div className="container_navbar">
      <div className="logo_Container">
        <div className="leftside_Navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            onClick={() => toggleDrawer()}
          >
            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
          </svg>
          <Link to={"/"}>
            <img
              width="100"
              height="20"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
              alt="YouTube-Logo-social-media-those-icons-flat-those-icons"
              className="nav_Logo"
            />
          </Link>
        </div>
        <Searchbar />
        <div className="rightside_Navbar">
          <RiVideoAddLine size={22} className="VideoIcon" />
          <div className="appIcon">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/fluency-systems-regular/48/more.png"
              alt="App icone load failed"
            />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/fluency-systems-regular/48/more.png"
              alt="App icone load failed"
              className="appImg"
            />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/fluency-systems-regular/48/more.png"
              alt="App icone load failed"
              className="appImg"
            />
          </div>
          <IoMdNotificationsOutline size={22} className="BellIcone" />
          <div>
            {CurrentUser ? (
              <>
                <div className="chanel_logo_App">
                  <p className="char_logo_App">
                    {CurrentUser?.result.name ? (
                      <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                    ) : (
                      <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                    )}
                  </p>
                </div>
              </>
            ) : (
             <div className="login_Container">
                <GoogleLogin className="google_login_button"
                clientId="973380708341-20i9sumhb79h6bd5t7534aoi0cu0d8sl.apps.googleusercontent.com"
                onSuccess={onSuccess}
                onFailure={onFailure}
                />
                <div className="authLogo_Box">
                  <BiUserCircle size={22} className="authLogo" />
                  Sign in
                </div>
             </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

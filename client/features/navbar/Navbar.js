import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="sticky">
      <div className="nav-wrapper">
        <Link to="/">
          <img src="../poke-logo.png" alt="logo" className="logo" />
        </Link>

        <nav>
          <div>
            <Link to="/home">Home</Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth  } from '../../firebase';
import { useNavigate } from "react-router-dom";


const CustomNav = ({ li }) => {
  const [window, setWindow] = useState(false);
  const navigate = useNavigate();

  // let openClose = () => {
  //   if (window === false) {
  //     setWindow(true);
  //   } else {
  //     setWindow(false);
  //   }
  // };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <nav className="navbar-menu" style={{ width: window === false ? 250 : 60 }}>
        {/* <div className="burger" onClick={() => openClose()}>
          <img src="img/menu.svg" alt="burger" />
        </div> */}
        <div><h3 className="mx-3">AniMangaList</h3></div>
      <ul className="navbar__list">
        {li.map((item, i) => (
          <div className="navbar__li-box text-decoration-none" key={i}>
            <img
              src={item[1]}
              alt={item[1]}
              style={{ paddingLeft: window === false ? 27 : 17 }}
            />
            <li
              className="navbar__li"
              style={{ display: window === false ? "inline-block" : "none" }}
            >
              <Link to={`/${item[0].toLowerCase()}`} style={{ textDecoration: 'none' }}>{item[0]}</Link>
            </li>
          </div>
        ))}
      </ul>
            {/* Sign Out Button */}
        <button className="btn btn-danger signout-button position-fixed bottom-0 start-0 m-3" onClick={handleSignOut}>
        Sign Out
      </button>
    </nav>
  );
};

export default CustomNav;

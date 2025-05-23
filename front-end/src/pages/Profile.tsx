import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import data from "../data.json";
// import clip1 from "../assets/clip-01.jpg";
// import clip2 from "../assets/clip-02.jpg";
// import clip3 from "../assets/clip-03.jpg";
// import clip4 from "../assets/clip-04.jpg";
import profile from "../assets/profile.jpg";
import profileg from "../assets/profileGirl.jpeg";
import { useState, useEffect, Fragment } from "react";
function Profile() {


  // const [user, setUser] = useState({});
  const [user, setUser] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    phone?: string;
    gender?: string;
  }>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5001/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data);
          });
        } else {
          window.location.href = "/login";
        }
      });
    } else {
      window.location.href = "/login";
    }
  }, []);


  // var image = profile;
  // if (data.gender === "female") {
  //   image = profileg;
  // }
  return (
    <Fragment>
      <NavBar />
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile">
                    <div className="row">
                      <div className="col-lg-4">
                        {/* Render user profile image here */}
                        <img src={user.gender === "female" ? profileg : profile} alt="Profile Image" />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h1 id="firstname">{user.firstName}</h1>
                          <h5 id="lastname">{user.lastName}</h5>
                          <p>"I'm {user.firstName}, an electronics enthusiast who loves discovering the latest gadgets and tech innovations. Let's power up your tech collection together!"</p>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Email <span>{user.email}</span>
                          </li>
                          <li>
                            Age <span>{user.age}</span>
                          </li>
                          <li>
                            Phone Number <span>{user.phone}</span>
                          </li>
                          <li>
                            Clips <span>29</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Rest of the JSX code */}
                    {/* ... */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Profile;

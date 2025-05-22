import "../Style/Register.css";
import { useState } from "react";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          email, 
          password, 
          firstName, 
          lastName, 
          age: Number(age), 
          phone, 
          gender 
        })
      });

      if (response.ok) {
        console.log("Registered successful");
        window.location.href = "/login"; // redirect on success
      } else {
        console.log("Registration failed");
        alert("Registration failed, please try again");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-img">
      <div className="registerContent">
        <header>Register Form</header>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h6>First name</h6>
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="First Name"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <h6>Last name</h6>
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h6>Email</h6>
              <div className="field">
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <h6>Phone number</h6>
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Phone"
                  name="phone"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h6>Password</h6>
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <h6>Confirm password</h6>
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Confirm password"
                  onChange={(e) => setconfPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h6>Age</h6>
              <div className="field">
                <input
                  type="number"
                  className="form-control"
                  required
                  placeholder="Age"
                  name="age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <h6>Gender</h6>
              <div>
                <label>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    onChange={(e) => setGender(e.target.value)} 
                    required
                  /> Male
                </label>
                <label style={{ marginLeft: "20px" }}>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    onChange={(e) => setGender(e.target.value)} 
                    required
                  /> Female
                </label>
              </div>
            </div>
          </div>

          <div className="field space">
            <input type="submit" value="Register Now" />
          </div>
        </form>

        <div className="signup space">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;

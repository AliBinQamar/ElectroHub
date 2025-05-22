import { Fragment, useState } from "react";
import "../Style/Login.css";
import Alert from "../component/Alert";
function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log("Login successful");
        // window.location.href = "/";
        response.json().then((data) => {
          window.location.href = "/";
          console.log(data);
          localStorage.setItem("token", data);
          localStorage.setItem("user", JSON.stringify(data.user));
        });
      } else {
        alert("password or email not correct");
        window.location.href = "/login";
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }


  }
  return (
    <Fragment>
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="fieldHeader" htmlFor="email">Email</label>
              <div className="field">
                <input
                  id="email"
                  type="text"
                  required
                  placeholder="Email or Username"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="fieldHeader" htmlFor="password">Password</label>
              <div className="field">
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <input type="submit" value="LOGIN" />
            </div>
          </form>
          <div className="signup space">
            Don't have account?
            <a href="/register">Signup Now</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;

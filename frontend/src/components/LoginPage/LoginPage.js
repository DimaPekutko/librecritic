import React, {useContext} from "react";
import AuthContext from "../../context/AuthContext";

const LoginPage = () => {
    const {login} = useContext(AuthContext); 

  return (
    <div className="page">
      <div className="login_form d-flex align-items-center justify-content-center">
        <form onSubmit={login}>
          <h3>Login</h3>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Your Login</label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter login"
            />
            <small className="form-text text-muted">Type your login</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

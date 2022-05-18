import React from 'react'

const register = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/register/", {
        method: "POST",
        headers: {
            "Content-Type":"application/json" 
        },
        body: JSON.stringify({
            email:     e.target.email.value,
            username:  e.target.username.value,
            password:  e.target.password.value
        })
    })
    console.log(res)
    if (res.status === 200) {
        // const data = await res.json()
        // const user = await get_user_data(data.access)
        // setTokens(data)
        // setUser(user)
        // localStorage.setItem("auth_tokens", JSON.stringify(data))
        // localStorage.setItem("user_data", JSON.stringify(user))
        // navigate("/")
    }
}

const RegisterPage = () => {
    return (
        <div className="page">
          <div className="login_form d-flex align-items-center justify-content-center">
            <form onSubmit={register}>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small className="form-text text-muted">Type your email</small>
              </div>
              <div className="form-group">
                <label>Your Login</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter login"
                />
                <small className="form-text text-muted">Type your login</small>
              </div>
              <div className="form-group">
                <label>Password</label>
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
                  id="exampleCheck1"
                />
                <label className="form-check-label">
                  Check me out
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
}

export default RegisterPage
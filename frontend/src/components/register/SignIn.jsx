import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn(){
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePasswd = (e) => {
        setPassword(e.target.value)
    }
    const loginUser = (e) => {
        e.preventDefault();
        // axios.defaults.withCredentials = true;
        // axios.post(AppConfig.apis.loginUser, {
        //     email,
        //     password
        // })
        //     .then(res => {
        //         if(res.status === 200) {
        //             navigate("/dashboard", { replace: true });
        //         }
        //     })
        //     .catch(err => {
        //         console.log("error", err);
        //     })
    }
    return(
        <div>
            <div className="register-page-title">
                <h1> Welcome to The Auto Room</h1>
            </div>
            <div className="register-page-wrapper">
                <div className="sidebar">
                </div>
                <div className="formBar">
                    <h2>Sign In</h2>
                    <form className="form" onSubmit={loginUser}>

                        <label htmlFor="email">Email: </label> <br />
                        <input type="text" id="email" name="email" value={email} onChange={onChangeEmail} />
                        <br /> <br />
                        <label htmlFor="passwd">Password: </label> <br />
                        <input type="password" id="passwd" name="password" value={password} onChange={onChangePasswd} />
                        <br /> <br />
                        <button type="submit"> Login </button>
                    </form>
                    <br />
                    Don't have an account? Click here to <Link to='/register'>register</Link>
                </div>
            </div>
        </div>
    )
}

import React from "react";
import "./login.css"
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";  

function Login() {
    return (
        <><body>
            <header>
                <h2 className="logo">GymBro</h2>
            </header>

        </body><section>
                <div className="form-box">
                    <div className="form-value">
                        <form action="">

                            {/*Login with email and password*/}
                            <h2>Login</h2>
                            <div className="inputbox">
                                <IonIcon icon={mailOutline} className="mail-icon" />
                                <input type="email" required></input>
                                <label for="">Email</label>
                            </div>

                            <div className="inputbox">
                                <IonIcon icon={lockClosedOutline} className="lock-icon" />
                                <input type="password" required></input>
                                <label for="">Password</label>
                            </div>

                            {/*This is for the Remember Me and Forgot Passowrd section*/}
                            <div className="forgot">
                                <label for="">
                                    <input type="checkbox" />Remember Me &nbsp; <a href="#">Forgot Password</a>
                                </label>

                            </div>

                            <button className="log-in">Log in</button>

                            <div className="register">
                                <p>Don't have an account? &nbsp;<a href="#">Register</a>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>

            </section></>
    );

}

export default Login;
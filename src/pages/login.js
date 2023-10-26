import styles from '@/styles/Login.module.css';
import Link from "next/link";

export default function Login() {
    return (
        <div className={styles["signin-container"]}>
            <div className={styles["signin-box"]}>
                <h2 className={styles["signin-title"]}>Sign In</h2>
                <form className={styles["signin-form"]}>
                    <p className={styles["sign-p"]}>
                        Enter your email and password to sign in!
                    </p>
                    <div>
                        <button className={styles["google-signin-button"]}>
                            <i className="fab fa-google"></i> Sign in with
                            Google
                        </button>
                    </div>
                    <div className={styles["centered-hr"]}>
                        <hr className={styles["horizontal-line"]} />
                        <div className={styles["centered-text"]}>or</div>
                        <hr className={styles["horizontal-line"]} />
                    </div>
                    <div className={styles["form-group"]}>
                        <label
                            className={styles["form-label"]}
                            htmlFor="username">
                            Email*
                        </label>
                        <input
                            type="text"
                            id="username"
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="mail@simmmple.com"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label
                            className={styles["form-label"]}
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="Min. 8 characters"
                        />
                    </div>
                    <div className={styles["checkbox-container"]}>
                        <div>
                            <input
                                type="checkbox"
                                id="keepLoggedIn"
                                className={styles["checkbox-input"]}
                            />
                            <label htmlFor="keepLoggedIn">
                                Keep me logged in
                            </label>
                        </div>
                        <div className={styles["forget"]}>
                            <p>Forget password?</p>
                        </div>
                    </div>
                    <button type="submit" className={styles["signin-button"]}>
                        Sign In
                    </button>
                </form>
                <div className={styles["signup-link"]}>
                    <p>
                        Not registered yet?<span className={styles['create']}>Create an Account</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
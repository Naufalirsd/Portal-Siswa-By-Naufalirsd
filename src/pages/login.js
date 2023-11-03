import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css";

export default function Login() {
    const router = useRouter();

    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const data = { nis, password };

            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await res.json();

            if (res.ok) {
                // Redirect ke halaman dashboard jika login berhasil
                router.push("/dashboard");
            } else {
                setError(responseData.message);
            }
        } catch (error) {
            console.log("error: ", error);
            alert("Terjadi Kesalahan, harap hubungi tim support");
        }
    };

    return (
        <div className={styles["signin-container"]}>
            <div className={styles["signin-box"]}>
                <h2 className={styles["signin-title"]}>Sign In</h2>
                <form className={styles["signin-form"]}>
                    <p className={styles["sign-p"]}>
                        Enter your email and password to sign in!
                    </p>
                    {/* Input NIS */}
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]} htmlFor="nis">
                            NIS<span className={styles["star"]}>*</span>
                        </label>
                        <input
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="12345"
                            value={nis}
                            onChange={(e) => setNis(e.target.value)}
                        />
                    </div>
                    {/* Input Password */}
                    <div className={styles["form-group"]}>
                        <label
                            className={styles["form-label"]}
                            htmlFor="password">
                            Password<span className={styles["star"]}>*</span>
                        </label>
                        <input
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="******"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Tombol Login */}
                    <button
                        className={styles["signin-button"]}
                        onClick={handleLogin}>
                        Sign In
                    </button>
                    {/* Pesan Kesalahan */}
                    {error && (
                        <p className={styles["error-message"]}>{error}</p>
                    )}
                </form>
                {/* Tautan untuk Registrasi */}
                <div className={styles["signup-link"]}>
                    <p>
                        Not registered yet?{" "}
                        <a href="/registration" className={styles["create"]}>
                            Create an Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

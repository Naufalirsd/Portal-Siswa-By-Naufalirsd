import styles from "@/styles/Login.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        // Kirim data login ke server
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ nis, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            // Login berhasil, tangani token di sini
        } else {
            // Login gagal, tampilkan pesan kesalahan
            setError(data.message);
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
                            NIS*
                        </label>
                        <input
                            type="text"
                            id="nis"
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="NIS"
                            value={nis}
                            onChange={(e) => setNis(e.target.value)}
                        />
                    </div>
                    {/* Input Password */}
                    <div className={styles["form-group"]}>
                        <label
                            className={styles["form-label"]}
                            htmlFor="password">
                            Password*
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Tombol Login */}
                    <button
                        type="button"
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
                        <Link href="/registration">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

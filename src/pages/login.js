import styles from "@/styles/Login.module.css";
import { dmSans } from "@/styles/fonts";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
    const router = useRouter();

    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [isKeepLogin, setKeepLogin] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const handleUnload = () => {
            // Bersihkan sessionStorage dan localStorage saat tab ditutup
            sessionStorage.clear();
            localStorage.clear();
        };

        window.addEventListener("unload", handleUnload);

        return () => {
            // Hapus event listener saat komponen unmount
            window.removeEventListener("unload", handleUnload);
        };
    }, []);

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            if (!nis || !password) {
                setError("NIS dan password harus diisi");
                return;
            }

            const data = { nis, password, isKeepLogin };

            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await res.json();

            if (res.ok) {
                if (isKeepLogin) {
                    localStorage.setItem("token", responseData.token);
                } else {
                    sessionStorage.setItem("token", responseData.token);
                }

                alert("Sukses login");
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
        <div className={`${styles["signin-container"]} ${dmSans.className}`}>
            <div className={styles["signin-box"]}>
                <h2 className={styles["signin-title"]}>Masuk</h2>
                <form className={styles["signin-form"]}>
                    <p className={styles["sign-p"]}>
                        Masukkan email dan kata sandi Anda untuk masuk!
                    </p>
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
                    <div className={styles["checkbox-container"]}>
                        <input
                            type="checkbox"
                            checked={isKeepLogin}
                            onChange={(e) => {
                                setKeepLogin(e.target.checked);
                            }}
                            className={styles["checkbox-input"]}
                        />
                        <span style={{ marginBottom: "5px" }}>
                            {" "}
                            Keep Me Logged In
                        </span>
                    </div>
                    <button
                        className={styles["signin-button"]}
                        onClick={handleLogin}>
                        Masuk
                    </button>
                    {error && (
                        <p className={styles["error-message"]}>{error}</p>
                    )}
                </form>
                <div className={styles["signup-link"]}>
                    <p>
                        Belum punya akun?{" "}
                        <Link href="/registration" className={styles["create"]}>
                            Buat Akun
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

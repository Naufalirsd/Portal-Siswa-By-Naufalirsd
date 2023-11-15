// registration.js

import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Registration.module.css";

export default function Registration() {
    const router = useRouter();

    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Tambahkan state untuk name
    const [error, setError] = useState("");

    const handleRegistration = async () => {
        try {
            // Validasi panjang password
            if (password.length < 6 || password.length >= 10) {
                setError("Password harus diantar 6 sampai 10 karakter");
                return;
            }

            const { nis, password, name } = req.body;

            const res = await fetch("/api/registration", {
                method: "POST",
                body: JSON.stringify({ nis, password, name }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await res.json();

            if (res.ok) {
                router.push("/login");
            } else {
                setError(responseData.message);
            }
        } catch (error) {
            console.log("error: ", error);
            alert("Terjadi Kesalahan, harap hubungi tim support");
        }
    };

    return (
        <div className={styles["registration-container"]}>
            <div className={styles["registration-box"]}>
                <h2 className={styles["registration-title"]}>Registrasi</h2>
                <form className={styles["registration-form"]}>
                    <p className={styles["register-p"]}>
                        Masukkan detail Anda untuk membuat akun!
                    </p>
                    {/* Input Name */}
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]} htmlFor="name">
                            Name<span className={styles["star"]}>*</span>
                        </label>
                        <input
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    {/* Tombol Registrasi */}
                    <button
                        className={styles["registration-button"]}
                        onClick={handleRegistration}>
                        Daftar
                    </button>
                    {/* Pesan Kesalahan */}
                    {error && (
                        <p className={styles["error-message"]}>{error}</p>
                    )}
                </form>
                {/* Tautan untuk Login */}
                <div className={styles["login-link"]}>
                    <p>
                        Sudah punya akun?{" "}
                        <a href="/login" className={styles["signin"]}>
                            Masuk
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

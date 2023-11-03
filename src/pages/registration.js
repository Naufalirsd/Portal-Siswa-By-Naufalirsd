import styles from "@/styles/Registration.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Registration() {
    const router = useRouter();

    const [nis, setNis] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegistration = async () => {
        // Validasi di sini sebelum mengirim permintaan ke server
        if (name.length < 3 || name.length >= 20) {
            setError("Nama harus di antara 3 sampai 20 karakter");
            return;
        }

        if (nis.length !== 5) {
            setError("NIS harus 5 karakter");
            return;
        }

        if (password.length < 6 || password.length >= 10) {
            setError("Password harus di antara 6 sampai 10 karakter");
            return;
        }

        // Kirim data registrasi ke server
        const response = await fetch("/api/registration", {
            method: "POST",
            body: JSON.stringify({ nis, name, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.status === 201) {
            // Registrasi berhasil, tampilkan pesan sukses atau redirect ke halaman login
            alert("Registrasi berhasil!");
            router.push("/login");
        } else {
            // Registrasi gagal, tampilkan pesan kesalahan dari server
            setError(data.message);
        }
    };

    return (
        <div className={styles["registration-container"]}>
            <div className={styles["registration-box"]}>
                <h2 className={styles["registration-title"]}>
                    Create an Account
                </h2>
                <form className={styles["registration-form"]}>
                    <p className={styles["sign-p"]}>
                        Enter your details to create an account!
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
                    {/* Input Name */}
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]} htmlFor="name">
                            Name*
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                    {/* Tombol Registrasi */}
                    <button
                        type="button"
                        className={styles["registration-button"]}
                        onClick={handleRegistration}>
                        Register
                    </button>
                    {/* Pesan Kesalahan */}
                    {error && (
                        <p className={styles["error-message"]}>{error}</p>
                    )}
                </form>
                {/* Tautan untuk Login */}
                <div className={styles["signin-link"]}>
                    <p>
                        Already have an account?{" "}
                        <Link href="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import styles from "@/styles/Registration.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Registration() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegistration = async () => {
        try {
            // Validasi di sini sebelum mengirim permintaan ke server
            if (name.length < 3 || name.length >= 20) {
                setError("Nama harus di antara 3 sampai 20 karakter");
                return;
            }

            if (password.length < 6 || password.length >= 10) {
                setError("Password harus di antara 6 sampai 10 karakter");
                return;
            }

            // Kirim data registrasi ke server
            const response = await fetch("/api/registration", {
                method: "POST",
                body: JSON.stringify({ name, password }),
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
        } catch (error) {
            console.error("Error during registration:", error);
            alert(
                "Terjadi kesalahan selama registrasi. Harap hubungi tim dukungan."
            );
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

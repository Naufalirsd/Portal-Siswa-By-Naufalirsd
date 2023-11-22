import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link from Next.js
import styles from "@/styles/Registration.module.css";

export default function Registration() {
    const router = useRouter();

    // Logika untuk redirect ke halaman login atau dashboard
    useEffect(() => {
        // Contoh: Jika pengguna sudah login, arahkan ke dashboard
        // const isLoggedIn = true; // Gantilah dengan logika sesuai kebutuhan
        // if (isLoggedIn) {
        //     router.push("/dashboard");
        // }
    }, []);

    const [nis, setNis] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleRegistration = async (e) => {
        try {
            e.preventDefault(); // Mencegah reload halaman saat mengirim data

            // Validasi panjang password
            if (password.length < 6 || password.length > 10) {
                setError("Password harus diantar 6 sampai 10 karakter");
                return;
            }

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
                    <button
                        className={styles["registration-button"]}
                        onClick={handleRegistration}>
                        Daftar
                    </button>
                    {error && (
                        <p className={styles["error-message"]}>{error}</p>
                    )}
                </form>
                <div className={styles["login-link"]}>
                    <p>
                        Sudah punya akun?{" "}
                        <Link href="/login" className={styles["signin"]}>
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

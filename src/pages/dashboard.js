import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Dashboard.module.css";

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            router.push("/login");
        } catch (error) {
            console.error("error: ", error);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.navHeader}>
                <div className={styles.title}>
                    <h3>Naufalirsd.</h3>
                </div>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Cari..." />
                    <button type="button">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.4235 11.6451C12.3267 10.7419 12.3267 9.25809 11.4235 8.35488L8.99918 5.93051M5.00082 5.93051C4.09761 6.83373 4.09761 8.31754 5.00082 9.22075L7.42518 11.6451M5.93051 8.99918L11.6451 3.28459"
                                stroke="#4318FF"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                </div>
                <div className={styles.logoutButton}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

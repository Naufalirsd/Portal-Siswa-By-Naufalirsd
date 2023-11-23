import styles from "@/styles/Dashboard.module.css";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDataApi, postDataApi } from "@/utils/api";

export default function Dasbor() {
    const [user, setUser] = useState({ id: "", name: "" });
    const router = useRouter();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const run = async () => {
            try {
                let myToken = "";
                if (localStorage.getItem("keepLogin") === "true") {
                    myToken = getCookie("token");
                } else {
                    myToken = sessionStorage.getItem("token");
                }

                if (myToken) {
                    const data = { token: myToken };

                    let myUser;
                    await postDataApi(
                        "/api/checkToken",
                        data,
                        (successData) => {
                            let roleName = "";
                            switch (successData.role) {
                                case 0:
                                    roleName = "Santri";
                                    break;
                                case 1:
                                    roleName = "Admin";
                                    break;
                            }
                            myUser = { ...successData, roleName };
                            setUser(myUser);
                        },
                        (failData) => {
                            console.log("failData: ", failData);
                            router.push("/login");
                        }
                    );

                    if (myUser && myUser.role === 1) {
                        await getDataApi(
                            "/api/listUsers",
                            (dataSuccess) => {
                                console.log("dataSuccess: ", dataSuccess);
                                setAllUsers(dataSuccess.users);
                            },
                            (dataFail) => {
                                console.log("dataFail: ", dataFail);
                            }
                        );
                    }
                }
            } catch (error) {
                console.log("error: ", error);
                // alert('Terjadi Kesalahan, harap hubungi team support');
            }
        };

        run();
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.header}>
                    <h1>Dasboard</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <button
                                className={styles.logoutBtn}
                                onClick={async () => {
                                    let myToken = "";
                                    if (
                                        localStorage.getItem("keepLogin") ===
                                        "true"
                                    ) {
                                        myToken = getCookie("token");
                                    } else {
                                        sessionStorage.setItem("token", "");
                                        router.push("/login");
                                        return;
                                    }
                                    if (myToken) {
                                        const data = { token: myToken };
                                        await postDataApi(
                                            "/api/logout",
                                            data,
                                            (successData) => {
                                                router.push("/login");
                                            },
                                            (failData) => {
                                                console.error(
                                                    "Gagal melakukan permintaan:",
                                                    failData
                                                );
                                                alert(
                                                    "terjadi kesalahan koneksi " +
                                                        failData
                                                );
                                            }
                                        );
                                    } else {
                                        router.push("/login");
                                    }
                                }}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.userHeader}>
                    <span>
                        {user.name} ({user.roleName})
                    </span>
                </div>
                {user.role === 1 && (
                    <div className={styles.tableContainer}>
                        <div>Data User</div>
                        <div className={styles.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>NIS</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers &&
                                        allUsers.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.nis}</td>
                                                <td>{data.name}</td>
                                                <td>{data.status}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

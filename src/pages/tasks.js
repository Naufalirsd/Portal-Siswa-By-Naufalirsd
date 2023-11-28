import styles from "@/styles/Dashboard.module.css";
import "remixicon/fonts/remixicon.css";
import { dmSans } from "@/styles/fonts";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDataApi, postDataApi } from "@/utils/api";
import Link from "next/link";

export default function Dasbor() {
    const [user, setUser] = useState({ id: "", name: "" });
    const router = useRouter();
    const [allUsers, setAllUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Gantilah '/api/getTasks' dengan endpoint yang sesuai di backend Anda
                const tasksData = await getDataApi("/api/getTasks");

                // Tampilkan data tugas ke konsol
                console.log("tasksData: ", tasksData);

                // Setel state tasks dengan data tugas dari server
                setTasks(tasksData.tasks);
            } catch (error) {
                console.error("Gagal mengambil data tugas:", error);
            }
        };

        // Panggil fungsi fetchTasks
        fetchTasks();
    }, []);

    const handleRegistration = async () => {
        let myToken = "";
        if (localStorage.getItem("keepLogin") === "true") {
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
                    console.error("Gagal melakukan permintaan:", failData);
                    alert("terjadi kesalahan koneksi " + failData);
                }
            );
        } else {
            router.push("/login");
        }
    };

    useEffect(() => {
        const run = async () => {
            try {
                let myToken = "";
                if (localStorage.getItem("keepLogin") === "true") {
                    myToken = getCookie("token");
                } else {
                    myToken = sessionStorage.getItem("token");
                }

                console.log("myToken: ", myToken);
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
                            setUser(myUser); // Specifying the content type as JSON
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
        <div className={`${styles.container} ${dmSans.className}`}>
            <div className={styles.sidebar}>
                <div
                    style={{
                        paddingTop: "56px",
                        paddingBottom: "56px",
                        paddingLeft: "54px",
                        paddingRight: "54px",
                        height: "70vh",
                    }}>
                    <h1>Dasboard</h1>
                    <div className={styles.boxMenu}>
                        <div className={styles.menu}>
                            <Link href="./dashboard" className={styles.navItem}>
                                <div className={styles.icon}>
                                    <i class="ri-school-line"></i>
                                </div>
                                <p>Kelas</p>
                            </Link>
                            <Link href="./tasks" className={styles.navItem}>
                                <div className={styles.icon}>
                                    <i class="ri-pencil-line"></i>
                                </div>
                                <p>Tugas</p>
                            </Link>
                            <Link href="" className={styles.navItem}>
                                <div className={styles.icon}>
                                    <i class="ri-user-line"></i>
                                </div>
                                <p>User</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.boxMenu2}>
                    <div className={styles.menu}>
                        <Link
                            href="./login"
                            className={styles.navItem2}
                            onClick={handleRegistration}>
                            <p>Log Out</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    width: "100%",
                    flexDirection: "column",
                }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                        padding: "16px",
                    }}>
                    <span
                        style={{
                            fontWeight: "700",
                            fontSize: "28px",
                            margin: "auto 20px",
                            color: "#2B3674",
                            padding: "30px 40px",
                        }}>
                        {user.name} ({user.roleName})
                    </span>
                </div>
                <div style={{ padding: "32px" }}>
                    {user.role === 1 && (
                        <>
                            <div
                                style={{
                                    textAlign: "center",
                                    backgroundColor: "#fff",
                                    padding: "1px",
                                }}>
                                <p>Data Tugas</p>
                                <hr style={{ margin: "20px" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <table
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#fff",
                                        border: "1px",
                                        padding: "10px 20px",
                                    }}>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Deadline</th>
                                            <th>Link</th>
                                            <th>Note</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks &&
                                            tasks.map((task, index) => (
                                                <tr
                                                    key={index}
                                                    style={{ padding: "8px" }}>
                                                    <td>{task.date}</td>
                                                    <td>{task.deadline}</td>
                                                    <td>{task.link}</td>
                                                    <td>{task.note}</td>
                                                    <td>{task.status}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

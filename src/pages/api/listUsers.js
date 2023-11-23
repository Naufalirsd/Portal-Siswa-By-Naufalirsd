import Users from "@/models/users";
import { connectMongoDB } from "@/db/mongoDB";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        // Mendapatkan token dari header
        const token = req.headers.authorization;

        // Validasi token
        if (!token) {
            return res
                .status(400)
                .json({ error: true, message: "Token tidak ditemukan" });
        }

        // Mencari pengguna berdasarkan token
        const user = await Users.findOne({ token });

        // Jika pengguna tidak ditemukan atau tidak memiliki NIS
        if (!user || !user.nis) {
            deleteCookie("token", { req, res });
            return res.status(400).json({
                error: true,
                message: "Token tidak valid",
            });
        }

        // Cek apakah pengguna memiliki peran sebagai admin (role 1)
        if (user.role !== 1) {
            return res.status(403).json({
                error: true,
                message: "Anda tidak memiliki hak akses",
            });
        }

        // Tampilkan semua pengguna jika pengguna adalah admin (role 1)
        let users;
        if (user.role === 1) {
            users = await Users.find({}, { _id: 0, password: 0, token: 0 });
        }

        // Data yang dikirimkan hanya yang tidak sensitif dan hanya yang perlu saja
        const sanitizedUsers = users.map((data) => ({
            name: data.name,
            nis: data.nis,
            status: data.status,
        }));

        // Kasih tahu client (hanya data yang diperbolehkan)
        return res.status(200).json({ users: sanitizedUsers });
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan, harap hubungi pengembang",
        });
    }
}

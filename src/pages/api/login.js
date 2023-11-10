import { generateRandomToken } from "@/utils/RandomToken";
import Users from "@/models/users";
import { setCookie } from "cookies-next";
import { connectMongoDB } from "@/db/mongoDB";

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        const { nis, password } = req.body;

        if (!nis || !password) {
            return res
                .status(400)
                .json({
                    error: true,
                    message: "NIS atau kata sandi tidak valid",
                });
        }

        if (nis.length !== 5 || password.length < 6 || password.length >= 10) {
            return res
                .status(400)
                .json({
                    error: true,
                    message: "NIS atau kata sandi tidak valid",
                });
        }

        const user = await Users.findOne({ name: nis, password });

        if (!user || !user.nis) {
            return res
                .status(400)
                .json({ error: true, message: "Pengguna tidak ditemukan" });
        }

        const token = generateRandomToken(10);

        setCookie("token", token, { res, maxAge: 60 * 60 * 24 * 30 });

        return res.status(200).json({ token });
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi masalah, harap hubungi pengembang",
        });
    }
}

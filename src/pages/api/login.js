import { generateRandomToken } from "@/utils/RandomToken";
import Users from "@/models/users";
import { getCookies, setCookie } from "cookies-next";
import { connectMongoDB } from "@/db/mongoDB";

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        const { nis, password, isKeepLogin } = req.body;

        if (!nis || !password) {
            return res
                .status(400)
                .json({ error: true, message: "NIS dan password diperlukan" });
        }

        if (nis.length !== 5) {
            return res
                .status(400)
                .json({ error: true, message: "NIS harus 5 karakter" });
        }

        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                error: true,
                message: "Password harus antara 6 dan 10 karakter",
            });
        }

        const user = await Users.findOne({ nis, password });

        if (!user || !user.nis) {
            return res
                .status(400)
                .json({ error: true, message: "User tidak ditemukan" });
        }

        const token = generateRandomToken(10);

        if (isKeepLogin) {
            setCookie("token", token, {
                req,
                res,
                maxAge: 60 * 60 * 24 * 30, // 1 bulan
            });
        } else {
            setCookie("token", token, { req, res });
        }

        await Users.findOneAndUpdate({ nis, password }, { token });

        res.status(200).json({ token, isKeepLogin: !!isKeepLogin });
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan, harap hubungi pengembang",
        });
    }
}

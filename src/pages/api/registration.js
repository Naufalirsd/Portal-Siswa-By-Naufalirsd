// api/registration.js

import Users from "@/models/users";
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
                .json({ error: true, message: "NIS dan password diperlukan" });
        }

        if (nis.length !== 5) {
            return res.status(400).json({
                error: true,
                message: "NIS harus 5 karakter",
            });
        }

        if (password.length < 6 || password.length >= 10) {
            return res.status(400).json({
                error: true,
                message: "Password harus antara 6 dan 10 karakter",
            });
        }

        const existingUser = await Users.findOne({ nis });

        if (existingUser) {
            return res.status(400).json({
                error: true,
                message: "Pengguna dengan NIS ini sudah ada",
            });
        }

        const newUser = new Users({
            nis,
            password,
        });

        await newUser.save();

        res.status(200).json({ message: "Registrasi berhasil" });
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan, harap hubungi pengembang",
        });
    }
}

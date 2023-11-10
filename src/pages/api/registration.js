import { v4 as uuid } from "uuid";
import Users from "@/models/users"; 
import { connectMongoDB } from "@/db/mongoDB";

connectMongoDB();

export default async function handler(req, res) {
    try {
        // pengecekan method
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "Method tidak diizinkan" });
        }

        const { name, password } = req.body;
        // validasi dari client (ada atau tidak)
        if (!name || !password) {
            return res
                .status(400)
                .json({
                    error: true,
                    message: "Nama dan password harus diisi",
                });
        }

        // validasi sesuai kreteria atau tidak
        if (name.length < 3 || name.length >= 20) {
            return res.status(400).json({
                error: true,
                message: "Nama harus di antara 3 sampai 20 karakter",
            });
        }

        if (password.length < 6 || password.length >= 10) {
            return res.status(400).json({
                error: true,
                message: "Password harus di antara 6 sampai 10 karakter",
            });
        }

        // cek apakah user dengan nama yang sama sudah terdaftar
        const existingUser = await Users.findOne({ name });

        if (existingUser) {
            // Memberikan pesan bahwa nama tersebut sudah terdaftar
            return res.status(400).json({
                error: true,
                message:
                    "Nama tersebut sudah terdaftar. Gunakan nama lain atau masuk dengan akun yang sudah ada.",
            });
        }

        // lengkapi data yang kurang
        const id = uuid();

        const data = { id, name, password };

        // jika sudah sesuai simpan
        const user = new Users(data);
        await user.save();

        // kasih tahu client (hanya data yang diperbolehkan)
        return res.status(201).json({ id: user.id, name: user.name });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi masalah, harap hubungi pengembang",
        });
    }
}

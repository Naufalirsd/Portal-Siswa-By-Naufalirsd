import { generateRandomToken } from "@/utils/RandomToken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    nis: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        default: "",
    },
});

const Users = mongoose.models.User || mongoose.model("User", userSchema);

const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://ppqita:santri@ppqitadb.9ybiiar.mongodb.net/portal-siswa",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { nis, password } = req.body;

            // Validasi nis dan password
            if (!nis || !password) {
                return res.status(400).json({
                    error: true,
                    message: "NIS dan password wajib diisi",
                });
            }

            // Cari user berdasarkan nis dan password
            const user = await Users.findOne({ nis, password });

            if (!user) {
                return res
                    .status(400)
                    .json({ error: true, message: "Login gagal" });
            }

            // Generate token
            const token = generateRandomToken(10);

            // Simpan token ke dalam database
            await Users.findOneAndUpdate({ nis, password }, { token });

            return res.status(200).json({ token });
        } else {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            error: true,
            message: "Ada masalah, harap hubungi developer",
        });
    }
}

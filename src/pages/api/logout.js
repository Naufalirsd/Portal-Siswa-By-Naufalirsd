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
    password: {
        type: String,
        require: true,
    },
    nis: {
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

export default async function logoutHandler(req, res) {
    try {
        if (req.method === "POST") {
            const { token } = req.body;

            // Validasi token
            if (!token) {
                return res.status(400).json({
                    error: true,
                    message: "Token wajib diisi",
                });
            }

            // Cari user berdasarkan token
            const user = await Users.findOne({ token });

            if (!user) {
                return res.status(400).json({
                    error: true,
                    message: "Token tidak valid atau sudah logout",
                });
            }

            // Hapus token dari user
            await Users.findOneAndUpdate({ nis: user.nis }, { token: "" });

            return res.status(200).json({
                error: false,
                message: "Berhasil logout",
            });
        } else {
            return res.status(405).json({
                error: true,
                message: "Metode tidak diizinkan",
            });
        }
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({
            error: true,
            message: "Ada masalah, harap hubungi developer",
        });
    }
}

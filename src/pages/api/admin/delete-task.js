import Tasks from "@/models/tasks";
import { connectMongoDB } from "@/db/mongoDB";
connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "DELETE") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        const taskId = req.query.id;
        if (!taskId) {
            return res
                .status(400)
                .json({ error: true, message: "ID tugas tidak diberikan" });
        }

        const deletedTask = await Tasks.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res
                .status(404)
                .json({ error: true, message: "Tugas tidak ditemukan" });
        }

        return res.status(200).json({ message: "Tugas berhasil dihapus" });
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json({ message: "Silahkan hubungi tim support" });
    }
}

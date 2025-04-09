import { app } from "./app";
import { connectDB } from "./config/mongoose";
import { env } from "./env";

async function main() {
	try {
		await connectDB();

		await app.listen({ port: env.PORT, host: "0.0.0.0" });
		console.log("Server running...");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}

main();

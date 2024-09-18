import * as dotenv from "dotenv";

dotenv.config();

import createServer from "./config/server.js";

// const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "8080";

const app = createServer();

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;

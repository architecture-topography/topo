require("../testSetup");

import server from "./server";

server
  .listen()
  .then(() => console.log("Server running at port http://localhost:4000"))
  .catch((err: any) => {
    console.error(err);
    process.exit(1);
  });

import "reflect-metadata";
import "@infra/typeorm/app";
import { server } from "./server";

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`);
});
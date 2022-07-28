import express from "express";
import { registerAdministratorRoute } from "./routes/administrator.routes";
import { registerPresenceRoute } from "./routes/presence.routes";
import { registerUserRoute } from "./routes/user.routes";

const app = express();

app.use(express.json());

registerUserRoute(app);
registerAdministratorRoute(app);
registerPresenceRoute(app);

export const server = app;
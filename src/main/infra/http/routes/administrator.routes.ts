import { AdministratorController } from "@application/controllers/AdministratorController";
import { container } from "@shared/dependencies/container";
import { Application, Router } from "express";

const userController = container.get(AdministratorController);

const router = Router();

router.post("/login", async function(request, response){
    const login = await userController.loginAdministrator(request.body.username);

    response.json({ login });
});

export const registerAdministratorRoute = (app: Application) => {
    app.use("/administrator", router);
};

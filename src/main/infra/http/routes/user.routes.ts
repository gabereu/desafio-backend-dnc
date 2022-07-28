import { UserController } from "@application/controllers/UserController";
import { container } from "@shared/dependencies/container";
import { Application, Router } from "express";

const userController = container.get(UserController);

const router = Router();

router.post("/login", async function(request, response){
    const login = await userController.loginUser(request.body.cpf);

    response.json({ login });
});

export const registerUserRoute = (app: Application) => {
    app.use("/user", router);
};

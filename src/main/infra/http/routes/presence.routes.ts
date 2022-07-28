import { PresenceController } from "@application/controllers/PresenceController";
import { container } from "@shared/dependencies/container";
import { Application, Router } from "express";

const presenceController = container.get(PresenceController);

const router = Router();

router.post("/user/:userId", async function(request, response){
    const presence = await presenceController.registerPresenceFromUser(request.params.userId);

    response.json({ presence });
});

router.post("/admin/:adminId/user/:userId", async function(request, response){
    const { userId,  adminId } = request.params;
    const { date } = request.body;

    let inDate: Date | null = null;

    if(!!date){
        inDate = new Date(date);
    }

    const presence = await presenceController.registerPresenceFromUserByAdmin(userId, inDate!, adminId);

    response.json({ presence });
});

router.get("/user/:userId", async function(request, response){
    const { userId } = request.params;
    const { fromDate, toDate } = request.body;
    const presences = await presenceController.findByUser({ userId, fromDate, toDate });

    response.json(presences);
});

router.get("/admin/:adminId", async function(request, response){
    const { adminId } = request.params;
    const { fromDate, toDate } = request.body;
    const presences = await presenceController.findAll({ adminId, fromDate, toDate });

    response.json(presences);
});

router.patch("/:presenceId", async function(request, response){
    const { presenceId } = request.params;
    const { adminId, toDate } = request.body;

    const presence = await presenceController.changePresence( adminId, presenceId, toDate);

    response.json(presence);
});

router.delete("/:presenceId", async function(request, response){
    const { presenceId } = request.params;
    const { adminId } = request.body;

    const presence = await presenceController.deletePresence( adminId, presenceId);

    response.json(presence);
});

export const registerPresenceRoute = (app: Application) => {
    app.use("/presence", router);
};

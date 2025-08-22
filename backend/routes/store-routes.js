import { Router } from "express";
import { addNewStore, getAllStores } from "../controllers/store-controller.js";
import { isAdmin, verifyToken } from "../middlewares/auth-middleware.js"; // Import verifyToken

const storeRouter = Router();

// This route must be protected by both middlewares
storeRouter.post("/addStores", verifyToken, isAdmin, addNewStore);

// Public route to get a list of all stores...
storeRouter.get("/", getAllStores);

export default storeRouter;
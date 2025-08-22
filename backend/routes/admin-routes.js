import { Router } from "express";
import { isAdmin, verifyToken } from "../middlewares/auth-middleware.js"; // Import verifyToken
import {
    getAdminDashboardData,
    addNewUser,
    getAllUsers,
    addNewStore,
    getAllStores,
} from "../controllers/admin-controller.js";

const adminRouter = Router();

// Dashboard Routes
adminRouter.get("/dashboard", verifyToken, isAdmin, getAdminDashboardData);

// User Management Routes
adminRouter.post("/add-user", verifyToken, isAdmin, addNewUser);
adminRouter.get("/users", verifyToken, isAdmin, getAllUsers);

// Store Management Routes
adminRouter.post("/add-store", verifyToken, isAdmin, addNewStore);
adminRouter.get("/stores", verifyToken, isAdmin, getAllStores);

export default adminRouter;
import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {userController} from "../controllers/UserController";
import {todoController} from "../controllers/TodoController";

const router = Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/refresh", userController.refresh);
router.post("/logout", authMiddleware, userController.logout);

router.get("/todo-lists", todoController.getAll);
router.get("/todo-lists/:id", todoController.getById);
router.get("/my-todo-lists", authMiddleware, todoController.getByUserId);
router.post("/todo-lists", authMiddleware,todoController.create);
router.put("/todo-lists/:id", authMiddleware, todoController.update);
router.delete("/todo-lists/:id", authMiddleware, todoController.delete);

export default router;

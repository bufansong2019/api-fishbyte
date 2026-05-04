import { Hono } from "hono";

const api = new Hono<{ Bindings: Env }>();

// API 根路径，返回服务状态
api.get("/", (c) => c.json({ status: "ok", message: "FishByte API" }));

export default api;

import crypto from "crypto";

export const generateToken = () => crypto.randomBytes(16).toString("hex");

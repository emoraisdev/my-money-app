import User from "./user.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Cadastrar usuário
export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: "Dados inválidos" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" });
        }
        if (password.length > 16) {
            return res.status(400).json({ error: "A senha não pode ter mais de 16 caracteres" });
        }

        const emailNormalized = email.toLowerCase();

        if (await User.findOne({ email: emailNormalized })) {
            return res.status(400).json({ error: "Usuário já existe" });
        }

        const hash = await argon2.hash(password);
        const user = await User.create({ name, email: emailNormalized, password: hash });

        return res.status(201).json({ message: "Usuário criado", userId: user._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
}

// Login
export async function login(req, res) {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Dados inválidos" });
        }

        const emailNormalized = email.toLowerCase();

        const user = await User.findOne({ email: emailNormalized });
        if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

        if (!(await argon2.verify(user.password, password))) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
}
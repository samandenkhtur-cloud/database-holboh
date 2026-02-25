const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
dotenv.config();


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// CREATE
app.post("/students", async (req, res) => {
  const { name, age } = req.body;
  const student = await prisma.student.create({
    data: { name, age }
  });
  res.status(201).json(student);
});

// READ ALL
app.get("/students", async (_req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

// READ ONE
app.get("/students/:id", async (req, res) => {
  const id = Number(req.params.id);
  const student = await prisma.student.findUnique({ where: { id } });
  res.json(student);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, age } = req.body;

  const updated = await prisma.student.update({
    where: { id },
    data: { name, age }
  });

  res.json(updated);
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.student.delete({ where: { id } });
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
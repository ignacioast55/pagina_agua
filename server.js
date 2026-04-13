console.log("🔥 ESTE ES MI SERVER REAL 🔥");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log("🔥 SERVER NUEVO FUNCIONANDO 🔥");

// conexión
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "venta_agua"
});

db.connect(err => {
  if (err) {
    console.log("❌ Error conexión:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// CREAR
app.post("/pedido", (req, res) => {
  const { nombre, direccion, bidones } = req.body;

  db.query(
    "INSERT INTO pedidos (nombre, direccion, bidones, estado) VALUES (?, ?, ?, 'pendiente')",
    [nombre, direccion, bidones],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ ok: true });
    }
  );
});

// OBTENER
app.get("/pedidos", (req, res) => {
  db.query("SELECT * FROM pedidos", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ELIMINAR
app.delete("/pedido/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM pedidos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ ok: true });
  });
});

// 🔥 ESTE ES EL QUE TE FALTABA O NO SE ESTÁ EJECUTANDO
app.put("/pedido/:id", (req, res) => {
  console.log("✅ PUT LLEGÓ");

  const { id } = req.params;

  db.query(
    "UPDATE pedidos SET estado = 'entregado' WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        console.log("❌ ERROR SQL:", err);
        return res.status(500).json(err);
      }

      console.log("🧠 RESULTADO:", result);

      res.json({ ok: true });
    }
  );
});
// INICIAR
app.listen(3000, () => {
  console.log("🚀 Servidor en http://localhost:3000");
});
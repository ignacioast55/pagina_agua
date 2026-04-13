<<<<<<< HEAD
console.log("🔥 SERVER NUEVO FUNCIONANDO 🔥");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
=======
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
>>>>>>> 5c9e4ba27accace8ee74e9e7357f0153b2a8b811

const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
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
  console.log("🗑️ DELETE LLEGÓ");

  const { id } = req.params;

  db.query("DELETE FROM pedidos WHERE id = ?", [id], (err, result) => {

    if (err) {
      console.log("❌ ERROR DELETE:", err);
      return res.status(500).json(err);
    }

    console.log("🧠 RESULT DELETE:", result);

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
      if (err) return res.status(500).json(err);
      res.json({ ok: true });
    }
  );
});

// INICIAR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
=======
// 🔥 SUPABASE
const supabase = createClient(
  "https://nbcpcghlorzgwsquwnqg.supabase.co",
  "sb_publishable_-hursTIXjI5D_AISJ7QOMg_QBW6CGum"
);

// ✅ CREAR
app.post("/pedido", async (req, res) => {
  const { nombre, direccion, bidones } = req.body;

  const { error } = await supabase
    .from("pedidos")
    .insert([{ nombre, direccion, bidones, estado: "pendiente" }]);

  if (error) return res.status(500).json(error);

  res.json({ ok: true });
});

// ✅ OBTENER
app.get("/pedidos", async (req, res) => {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ✅ ELIMINAR
app.delete("/pedido/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("pedidos")
    .delete()
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ ok: true });
});

// ✅ ACTUALIZAR
app.put("/pedido/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("pedidos")
    .update({ estado: "entregado" })
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ ok: true });
});

// 🚀 INICIAR SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
>>>>>>> 5c9e4ba27accace8ee74e9e7357f0153b2a8b811
});

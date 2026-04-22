// 👇 PRIMERO esto
const fetch = require("node-fetch");
global.fetch = fetch;


const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// SUPABASE
const supabase = createClient(
  "https://nbcpcghlorzgwsquwnqg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iY3BjZ2hsb3J6Z3dzcXV3bnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwOTE2NDksImV4cCI6MjA5MTY2NzY0OX0.0xqQ71WDt98jPaTysMs4QeIQoPvufA0VaI2KIvj6m80"
);

// CREAR PEDIDO
app.post("/pedido", async (req, res) => {
  const { nombre, direccion, bidones } = req.body;

  const { data, error } = await supabase
    .from("pedidos")
    .insert([{ nombre, direccion, bidones, estado: "pendiente" }]);

  if (error) {
    console.log("ERROR SUPABASE:", error); // ← agregá esto
    return res.status(500).json(error);
  }

  res.json({ ok: true });
});

// OBTENER PEDIDOS
app.get("/pedidos", async (req, res) => {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ELIMINAR PEDIDO
app.delete("/pedido/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("pedidos")
    .delete()
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ ok: true });
});

// ACTUALIZAR PEDIDO
app.put("/pedido/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("pedidos")
    .update({ estado: "entregado" })
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ ok: true });
});

// SERVER
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

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
});

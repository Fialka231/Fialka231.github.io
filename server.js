import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/ares", async (req, res) => {
  try {
    const ico = String(req.query.ico || "").replace(/\D/g, "");
    if (!/^\d{8}$/.test(ico)) {
      return res.status(400).json({ error: "Neplatné IČO. Očekáváno 8 číslic." });
    }
    const url = `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`;
    const up = await fetch(url, { headers: { Accept: "application/json" } });
    const txt = await up.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(up.status).send(txt);
  } catch (e) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: String(e) });
  }
});

app.listen(3000, () => console.log("ARES proxy běží na /api/ares"));

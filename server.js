// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = 3e3;
app.use(express.json());
var DATA_FILE = path.join(__dirname, "data.json");
var getInitialData = () => ({
  news: [
    {
      id: 1,
      title: "\u0997\u09BE\u099B\u09AC\u09BE\u09DC\u09BF\u09DF\u09BE \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0995\u09B2\u09C7\u099C \u09B6\u09BE\u0996\u09BE\u09B0 \u09AA\u09C2\u09B0\u09CD\u09A3\u09BE\u0999\u09CD\u0997 \u0995\u09AE\u09BF\u099F\u09BF \u0985\u09A4\u09BF \u09B6\u09C0\u0998\u09CD\u09B0\u0987 \u0998\u09CB\u09B7\u09A3\u09BE \u0995\u09B0\u09BE \u09B9\u09AC\u09C7, \u0987\u09A8\u09B6\u09BE\u0986\u09B2\u09CD\u09B2\u09BE\u09B9\u0964",
      content: "\u09AF\u09BE\u09B0\u09BE \u09B8\u09CD\u09AC\u09C7\u099A\u09CD\u099B\u09BE\u09DF \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09BE\u09AC\u09BF\u09A4 \u0995\u09AE\u09BF\u099F\u09BF\u09A4\u09C7 \u09A5\u09BE\u0995\u09A4\u09C7 \u0986\u0997\u09CD\u09B0\u09B9\u09C0, \u09A4\u09BE\u09B0\u09BE \u09A8\u09BF\u09AE\u09CD\u09A8\u09CB\u0995\u09CD\u09A4 \u09A8\u09AE\u09CD\u09AC\u09B0\u0997\u09C1\u09B2\u09CB\u09A4\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u0964",
      contacts: [
        { name: "\u09AE\u09CB\u0983 \u0987\u09AB\u09A4\u09C7\u0996\u09BE\u09B0 \u0987\u09AD\u09BE\u09A8", phone: "\u09E6\u09E7\u09EE\u09EA\u09E6\u09E6\u09EF\u09E9\u09EA\u09EE\u09EB" },
        { name: "\u09AE\u09BE\u0983 \u09AE\u09BE\u09AE\u09C1\u09A8\u09C1\u09B2 \u0987\u09B8\u09B2\u09BE\u09AE", phone: "\u09E6\u09E7\u09EE\u09EC\u09ED\u09ED\u09E6\u09EC\u09E9\u09EC\u09EB" }
      ],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ],
  events: []
});
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(getInitialData(), null, 2));
}
var getData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
var setData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
app.get("/api/data", (req, res) => {
  res.json(getData());
});
app.post("/api/news", (req, res) => {
  const { title, content, contacts, password } = req.body;
  if (password !== "habib1577") return res.status(401).json({ error: "Unauthorized" });
  const data = getData();
  const newPost = {
    id: Date.now(),
    title,
    content,
    contacts: contacts || [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  data.news.unshift(newPost);
  setData(data);
  res.json(newPost);
});
app.post("/api/events", (req, res) => {
  const { title, date, password } = req.body;
  if (password !== "habib1577") return res.status(401).json({ error: "Unauthorized" });
  const data = getData();
  const newEvent = {
    id: Date.now(),
    title,
    date,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  data.events.unshift(newEvent);
  setData(data);
  res.json(newEvent);
});
app.get("/admin.html", (req, res) => {
  res.redirect("/admin");
});
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

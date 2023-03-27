import expres from "express";

const app = expres();

app.get("/api", (req, res) => {
  res.json({ msg: "HI" });
});

app.listen(3000, () => {
  console.log("Server Listening On Port 3000");
});

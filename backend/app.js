let data = require("../frontend/data.json");
const express = require("express");
const _ = require("underscore");
const fs = require("fs");

const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/api/user", (req, res) => {
  res.json(data);
});

app.get("/", (req, res) => {
  fs.writeFile(
    "../frontend/data.json",
    JSON.stringify(data, null, 2), // JSON verisini biçimlendirilmiş şekilde kaydediyoruz
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing to file" });
      }
      res.json({
        message: "Users fetch successfully!",
        data: req.body,
      });
    }
  );
});

app.post("/api/user", (req, res) => {
  // let body = _.pick(req.body, "name", "price");
  // data.push(req.body);
  // data = [...data, req.body];
  data.push(req.body);

  fs.writeFile(
    "../frontend/data.json",
    JSON.stringify(data, null, 2), // JSON verisini biçimlendirilmiş şekilde kaydediyoruz
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing to file" });
      }
      res.json({
        message: "User created successfully!",
        data: req.body,
      });
    }
  );
});

app.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((product) => product.id === parseInt(id));

  if (index !== -1) {
    data.splice(index, 1);

    fs.writeFile(
      "../frontend/data.json",
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing to file" });
        }
        res.json({
          message: "Product deleted successfully!",
        });
      }
    );
  } else {
    res.status(404).json({ message: "Product not found!" });
  }
});

app.put("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const index = data.findIndex((product) => product.id === parseInt(id));

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedProduct };

    fs.writeFile(
      "../frontend/data.json",
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing to file" });
        }
        res.json({
          message: "Product updated successfully!",
          data: data[index],
        });
      }
    );
  } else {
    res.status(404).json({ message: "Product not found!" });
  }
});

app.listen(PORT, () => {
  console.log("backend running");
});

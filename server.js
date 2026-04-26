const fs = require('fs');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "swarajya@2021") {
    res.json({ token: "ok" });
  } else {
    res.send("Invalid login");
  }
});

// UPLOAD
app.post('/upload', upload.single('photo'), (req, res) => {
  res.send("Photo uploaded successfully");
});

// GET PHOTOS
app.get('/photos', (req, res) => {
  const fs = require('fs');
  const files = fs.readdirSync('./uploads');
  res.json(files);
});

// START SERVER

// DELETE PHOTO
app.delete('/delete/:name', (req, res) => {
  const fileName = req.params.name;

  fs.unlink('./uploads/' + fileName, (err) => {
    if (err) {
      res.send("Error deleting file");
    } else {
      res.send("Deleted successfully");
    }
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
const express = require('express');
const app = express();
const db = require('./models');
const { Komik } = db;
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

db.sequelize.sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log('Server Started');
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Selamat Datang di API Komik Perpustakaan 📚');
});


app.post('/komik', async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const komik = await Komik.create({ title, description, author });
    res.status(201).json(komik);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/komik', async (req, res) => {
  try {
    const komik = await Komik.findAll();
    res.json(komik);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/komik/:id', async (req, res) => {
  try {
    const komik = await Komik.findByPk(req.params.id);
    if (komik) {
      res.json(komik);
    } else {
      res.status(404).json({ message: 'Komik tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/komik/:id', async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const komik = await Komik.findByPk(req.params.id);

    if (komik) {
      await komik.update({ title, description, author });
      res.json({ message: 'Komik berhasil diperbarui', data: komik });
    } else {
      res.status(404).json({ message: 'Komik tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/komik/:id', async (req, res) => {
  try {
    const komik = await Komik.findByPk(req.params.id);

    if (komik) {
      await komik.destroy();
      res.json({ message: 'Komik berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Komik tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
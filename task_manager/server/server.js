const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path')

app.use(express.json());
app.use(cors());

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(3000, () => {
  console.log(`Server listening on port ${PORT}`);
});

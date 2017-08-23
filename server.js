const express = require('express');
const path = require('path');
const app = express();
const port = 3500;

app.use(express.static(path.join(__dirname, 'lottoApp/www')));
app.get('/', (request, respoonse) => {
  respoonse.sendFile('index.html')
});

app.listen(port, () => console.log(`App runnig at port ${port}`));

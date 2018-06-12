import app from './app';

const port = process.env.PORT || 9999;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);

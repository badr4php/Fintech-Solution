import express, { json } from 'express';

const app = express();

app.use(json())

const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "App works" })
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

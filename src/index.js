import express, { json } from 'express';
import dotenv from 'dotenv';
import users from "./routes/users";
import groups from "./routes/groups";
import collections from './routes/collections';
import items from './routes/items';
import login from './routes/login';
import auth from "./middleware/auth";

// get config vars
dotenv.config();

const app = express();

app.use(json())

const PORT = process.env.PORT || 8080;

app.use("/api/login", login);
app.use("/api/users", auth, users);
app.use("/api/groups", auth, groups);
app.use("/api/collections", auth, collections);
app.use("/api/items", auth, items);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

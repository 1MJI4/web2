import express from "express";
import usersRouter from "./routes/users";
import filmRouter from "./routes/films";


const app = express();
let compteurGet=0;
app.use((req,_res, next) => {
    if (req.method === 'GET') {
        compteurGet++;
      console.log(`Nombre de requêtes GET : ${compteurGet}`);
    }
    next(); // Passe à la prochaine étape (la route)
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/films", filmRouter);

export default app;

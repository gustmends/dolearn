import { app } from "./https";

const port = process.env.PORT || 3333;

app.listen(port, ()=> console.log("Iniciado na porta", port));
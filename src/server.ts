import express from 'express';
// chamar o diretorio ja vai para o index.
import routes from './routes';

const app = express();

app.use(routes);

const port = 8081;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
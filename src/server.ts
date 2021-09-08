import express from 'express';
// chamar o diretorio ja vai para o index.
import routes from './routes';
import path from 'path';

const app = express();
app.use(express.json());

app.use(routes);

app.use('/uploads', 
express.static(
    path.resolve(__dirname, '..', 'uploads')
    )
);
const port = 8081;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
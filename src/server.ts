import express from 'express';
// chamar o diretorio ja vai para o index.
import routes from './routes';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

/* 
* qualquer dominio pode acessar nosso dominio
app.use(cors());
outros ex:
app.use(cors(
    {
        origin: ['exemplo.com.br', '[...]', '[...]']
    }
));
*/
app.use(cors(
    {
        origin: ['exemplo.com.br', 'http://localhost:4200/backend']
    }
));

app.use(express.json());
app.use(routes);

app.use('/uploads', 
express.static(
    path.resolve(__dirname, '..', 'uploads')
    )
);

//na validação de requisição, exibe o erro ao usuario caso algum campo nao esteja correto.
app.use(errors());
const port = 8081;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
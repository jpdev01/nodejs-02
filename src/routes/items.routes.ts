import { Router } from 'express';
import knex from '../database/connection';

const itemsRouter = Router();

itemsRouter.get('/', async (request, response) => {
    const items = await knex('items').select('*');

    // serializar
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            name: item.name,
            image_url: `http://localhost:8081/uploads/${item.image}`
        }
    })
    return response.json(serializedItems);
});

export default itemsRouter;
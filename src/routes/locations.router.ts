import { response, Router } from 'express';
import knex from '../database/connection';
import multer from 'multer';
import multerConfig from '../config/multer';

const locationsRouter = Router();
const upload = multer(multerConfig);

locationsRouter.get('/', async (request, response) => {
    const { city, uf, items} = request.query;

    /* 
    * O usuario vai informar os items por uma string com virugula, separará os items
    */
    const parsedItems: Number[] = String(items).split(',').map(item =>
        Number(item.trim())
    );

    const locations = await knex('locations')
    /* 
    * 1- em que tabela?
    * 2- qual coluna da tabela princiapl?
    * 3- operador
    * 4- qual coluna da tabela do join?
    */
    .join('location_items', 'locations.id', '=', 'location_items.location_id')
    .whereIn('location_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    // nao quero que repita os valores trazidos.
    .distinct()
    // quero que traga todos os campos
    .select('locations.*');

    return response.json(locations);
});

locationsRouter.post('/', async (request, response) => {
    const { 
        name, 
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const location = {
        image: 'fake-image.png',
        name, 
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    }


    /*
    * ABRE TRANSAÇÃO
    * tudo abaixo estará na mesma transação. se der erro em um, fará rollback em tudo.
    */
    const transaction = await knex.transaction();
    const newIds = await transaction('locations').insert(location);

    const location_id = newIds[0];

    // as tabelas dependentes
    const locationItems = items.map(async (item_id: number) => {
        const selectedItem = await transaction('items').where('id', item_id).first();
        if(!selectedItem) {
            return response.status(400).json("Item" + item_id + " not found");
        }
        return {
            item_id,
            location_id
        }
    });
    await transaction('location_items').insert(locationItems);

    /*
    * Persiste no banco.
    */
    await transaction.commit();

    return response.json({
        id: location_id,
        // esses tres pontos fazem trazer todos os atributos de location. spred iterator
        ...location
    })

});

locationsRouter.get('/:id', async (request, response) => {
    const { id } = request.params;

    const location = await knex('locations').where('id', id).first();

    if(!location){
        return response.status(400).json("location " + id + " not found.");
    }

    const items = await knex('items')
    // relaciona o campo id da tabela items ao location_items
    .join('location_items', 'items.id', '=', 'location_items.item_id')
    .where('location_items.location_id', id)
    // quais campos quero selecionar?
    .select('title');

    return response.json({location, items});
});

/* 
* upload.single pq é só um arquivo por vez
*/
locationsRouter.put('/:id', upload.single, async (request, response) => {
    const { id } = request.params;

    const file = request.file?.filename;

    if(!file)
    {
        return response.status(400).json("file not found");
    }

    const location = await knex('locations').where('id', id).first();

    if(!location){
        return response.status(400).json("location not found");
    }

    const locationUpdated = {
        ...location,
        file
    }
    await knex('location').update(locationUpdated);

    return response.json(locationUpdated);
});

export default locationsRouter;
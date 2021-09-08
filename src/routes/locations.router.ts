import { Router } from 'express';
import knex from '../database/connection';

const locationsRouter = Router();

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
    const locationItems = items.map((item_id: number) => {
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
        id: locationId,
        // esses tres pontos fazem trazer todos os atributos de location. spred iterator
        ...location
    })

});

export default locationsRouter;
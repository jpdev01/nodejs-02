import { Knex } from "knex";

export async function seed(knex: Knex){
    await knex('items').insert([
        {
            title: "Papéis e Papelão",
            image: "papel.png"
        },
        {
            title: "Vidros e Lâmpadas",
            image: "vidro.png"
        }
    ]);
}
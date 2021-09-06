import { Knex } from "knex";

export async function seed(knex: Knex){
    await knex('items').insert([
        {
            name: "BMW x6",
            image: "bmwx6.jpg"
        },
        {
            name: "Chevrolet Camaro",
            image: "camaro.png"
        }
    ]);
}
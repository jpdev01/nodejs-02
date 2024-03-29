import { Knex } from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('location_items', table => {
        table.increments('id').primary();
        table.integer('location_id').unsigned();
        table.integer('item_id').unsigned();
        table.foreign('location_id')
            .references('id')
            .inTable('locations');
        table.foreign('item_id')
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('location_items');
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
        .createTable('products', (table) => {
            table.increments('id', {primaryKey: true});
            table.string('name').notNullable();
            table.double('price').notNullable();
            table.integer('storeId').unsigned();
            table.foreign('storeId').references('id').inTable('stores');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('products');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('stores', (table) => {
            table.increments('id', {primaryKey: true});
            table.string('name');
            table.string('address');
            table.integer('owner').unsigned();
            table.foreign('owner').references('id').inTable('users');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('stores');
};

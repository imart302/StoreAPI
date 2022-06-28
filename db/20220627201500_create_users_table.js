/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id', {
                primaryKey: true
            });
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('role').notNullable();
            table.string('password', 255).notNullable();
            table.boolean('deleted').defaultTo(false);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('users');
};

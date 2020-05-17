exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table
      .integer('category_id')
      .references('id')
      .inTable('categories')
      .notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('price').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};

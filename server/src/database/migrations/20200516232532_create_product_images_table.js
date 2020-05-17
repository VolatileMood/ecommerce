exports.up = function (knex) {
  return knex.schema.createTable('product_images', (table) => {
    table.increments();
    table.integer('product_id').references('id').inTable('products');
    table.string('image_url').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('product_images');
};

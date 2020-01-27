
exports.up = function(knex) {
  return knex.schema.createTable('subscription', table => {
    table.increments();
    table.string('email', 128).notNullable();
    table
      .boolean("status")
      .notNullable()
      .defaultTo(1);
    table
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.dropTableIfExists('subscription');
};

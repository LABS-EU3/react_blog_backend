
exports.up = function (knex) {
  return knex.schema.createTable("interests", table => {
    table.increments();
    table
      .string("name")
      .notNullable()
    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("interests");
};

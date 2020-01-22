exports.up = function(knex) {
  return knex.schema.createTable("covers", table => {
    table.increments();
    table.string("url", 500).notNullable();
    table
      .string("articleId")
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("covers");
};

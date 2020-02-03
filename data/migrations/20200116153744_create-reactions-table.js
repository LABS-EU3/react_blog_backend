
exports.up = function(knex) {
  return knex.schema.createTable("reactions", table => {
      table.increments();
      table.string("highlighted_text", 400).notNullable();
      table.string("emoji", 400).notNullable();
      table
        .integer("articleId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("articles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
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

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reactions");
  };
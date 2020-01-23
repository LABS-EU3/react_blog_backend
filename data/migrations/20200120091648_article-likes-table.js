exports.up = function(knex) {
  return knex.schema.createTable("articleLikes", table => {
    table.increments();
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
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("articleLikes");
};

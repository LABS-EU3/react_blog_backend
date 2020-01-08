
exports.up = function(knex) {
    return knex.schema.createTable("tags", table => {
        table.increments();
        table.string("name", 128).notNullable().unique();
        table.integer("articleId").unsigned().notNullable().references("id").inTable("articles").onUpdate("CASCADE").onDelete("CASCADE");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("tags");
  };
  
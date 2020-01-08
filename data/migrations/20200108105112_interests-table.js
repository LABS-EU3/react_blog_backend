
exports.up = function(knex) {
    return knex.schema.createTable("interests", table => {
        table.integer("tagId").unsigned().notNullable().references("id").inTable("tags").onUpdate("CASCADE").onDelete("CASCADE");
        table.integer("userId").unsigned().notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("interests");
  };
  
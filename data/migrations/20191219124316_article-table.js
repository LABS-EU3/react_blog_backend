
exports.up = function(knex) {
  return knex.schema.createTable("articles", table => {
      table.integer("id").notNullable().unique();
      table.string("title", 128).notNullable();
      table.integer("authorId").unsigned().notNullable().references('id').inTable("users").onUpdate('CASCADE').onDelete('CASCADE');
      table.text("body").notNullable();
      table.timestamp("createdAt").notNullable();
      table.timestamp("updatedAt").notNullable();
      table.boolean("isEditing").notNullable();
      table.boolean("isPublished").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("articles");
};

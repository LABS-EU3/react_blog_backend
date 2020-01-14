exports.up = function (knex) {
  return knex.schema.createTable("articles", table => {
    table
      .increments();
    table
      .string("custom_id", 170)
      .notNullable();
    table
      .string("title", 128)
      .notNullable();
    table
      .integer("authorId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .text("body")
      .notNullable();
    table
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .boolean("isEditing")
      .notNullable();
    table
      .boolean("isPublished")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("articles");
};

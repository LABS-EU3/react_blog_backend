exports.up = function(knex) {
  return knex.schema.createTable("notifications", table => {
    table.increments();
    table.string("type", 128).notNullable();
    table.text("content");
    table.boolean("isRead").notNullable();
    table
      .integer("actorId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("subjectId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("notifications");
};

exports.up = function(knex) {
    return knex.schema.createTable("users", table => {
      table.increments();
      table.string("firstName", 128);
      table.string("lastName", 128);
      table
        .string("email", 128)
        .notNullable()
        .unique();
      table
        .string("fullname", 128)
        .notNullable();
      table.string("password", 128).notNullable();
      table.string("jwt", 512);
      table
        .boolean("isVerified")
        .notNullable()
        .defaultTo(0);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
  };
  
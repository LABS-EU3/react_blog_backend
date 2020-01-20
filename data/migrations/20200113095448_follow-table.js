
exports.up = function (knex) {
    return knex.schema.createTable("follows", table => {
        table
            .increments();
        table
            .integer("followerId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("followingId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("follows")
};

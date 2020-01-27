
exports.up = function(knex) {
    return knex.schema.table("reactions", table => {
        table
            .text("highlighted_text").alter();
        table
            .integer("authorId", 400)
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("reactorId", 400)
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

    })
};

exports.down = function(knex) {
    return knex.schema.table("reactions", table => {
        table.dropColumn("highlighted_text");
        table.dropColumn("authorId");
        table.dropColumn("reactorId");
    })
};

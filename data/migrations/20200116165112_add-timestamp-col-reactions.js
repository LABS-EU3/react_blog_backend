
exports.up = function(knex) {
    return knex.schema.table("reactions", table => {
        table
            .timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.table("reactions", table => {
        table.dropColumn("createdAt");
    })
};

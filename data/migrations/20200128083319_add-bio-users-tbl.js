exports.up = function (knex) {
    return knex.schema.table("users", table => {
        table
            .string("bio", 128);
    })
};

exports.down = function (knex) {
    return knex.schema.table("users", table => {
        table.dropColumn("bio");
    })
};
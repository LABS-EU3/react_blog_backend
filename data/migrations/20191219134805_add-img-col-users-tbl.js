
exports.up = function (knex) {
    return knex.schema.table("users", table => {
        table
            .string("avatarUrl");
    })
};

exports.down = function (knex) {
    return knex.schema.table("users", table => {
        table.dropColumn("avatarUrl");
    })
};

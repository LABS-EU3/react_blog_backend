
exports.up = function (knex) {
    return knex.schema.createTable("articleTags", table => {
        table
            .increments();
        table
            .integer("articleId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("articles")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("tagId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tags")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("articleTags");
};

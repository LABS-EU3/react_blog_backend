exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {name: 'Business', articleId: 8},
        {name: 'Tech', articleId: 8},
        {name: 'Health & Wellbeing', articleId: 8},
        {name: 'Sport', articleId: 8},
        {name: 'Cooking', articleId: 8},
        {name: 'Cooking', articleId: 8},
        {name: 'Arts & Crafts', articleId: 8}
      ]);
    });
};
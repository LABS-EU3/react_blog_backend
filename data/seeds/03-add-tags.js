exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {name: 'Business', articleId: 1},
        {name: 'Tech', articleId: 2},
        {name: 'Health & Wellbeing', articleId: 3},
        {name: 'Sport', articleId: 4},
        {name: 'Cooking', articleId: 1},
        {name: 'Cooking', articleId: 1},
        {name: 'Arts & Crafts', articleId: 1}
      ]);
    });
};
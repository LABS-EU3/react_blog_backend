exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {name: 'Business', articleId: 15},
        {name: 'Tech', articleId: 15},
        {name: 'Health & Wellbeing', articleId: 15},
        {name: 'Sport', articleId: 15},
        {name: 'Cooking', articleId: 15},
        {name: 'Cooking', articleId: 15},
        {name: 'Arts & Crafts', articleId: 15}
      ]);
    });
};
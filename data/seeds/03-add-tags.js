exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1,  name: 'Business', articleId: 1},
        {id: 2,  name: 'Tech', articleId: 1},
        {id: 3,  name: 'Health & Wellbeing', articleId: 2},
        {id: 4,  name: 'Sport', articleId: 1},
        {id: 5,  name: 'Cooking', articleId: 2},
        {id: 6,  name: 'Cooking', articleId: 3},
        {id: 7,  name: 'Arts & Crafts', articleId: 3}
      ]);
    });
};
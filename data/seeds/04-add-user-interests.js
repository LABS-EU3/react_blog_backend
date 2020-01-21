exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('interests').del()
    .then(function () {
      // Inserts seed entries
      return knex('interests').insert([
        {id: 1, userId: 1, name: "Cooking"},
        {id: 2, userId: 1, name: "Arts & Crafts"},
        {id: 3, userId: 1, name: "Business"},
        {id: 4, userId: 1, name: "Tech"},
        {id: 5, userId: 2, name: "Business"},
        {id: 6, userId: 2, name: "Sport"}
      ]);
    });
};
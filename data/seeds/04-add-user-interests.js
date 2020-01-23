exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('interests').del()
    .then(function () {
      // Inserts seed entries
      return knex('interests').insert([
         { userId: 1, name: "Cooking"},
         { userId: 1, name: "Arts & Crafts"},
         { userId: 1, name: "Business"},
         { userId: 1, name: "Tech"},
         { userId: 2, name: "Business"},
         { userId: 2, name: "Sport"}
      ]);
    });
};
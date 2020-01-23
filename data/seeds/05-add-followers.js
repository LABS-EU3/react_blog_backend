exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('follows').del()
    .then(function () {
      // Inserts seed entries
      return knex('follows').insert([
        {id: 1, followerId: 2, followingId: 1}
      ]);
    });
};
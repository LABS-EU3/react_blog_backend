const _ = require("lodash");

function addToArray(val1, val2) {
  return _.isArray(val1) ? val1.concat(val2) : [val1].concat(val2);
}

function modifyObjs(a, b) {
  b.mutualInterest = addToArray(b.mutualInterest, a.mutualInterest);
  return true;
}

function predicateAndModifier(a, b) {
  return (
    a.id === b.id &&
    a.fullname === b.fullname &&
    a.bio === b.bio &&
    a.avatarUrl === b.avatarUrl &&
    modifyObjs(a, b)
  );
}

module.exports = {
  predicateAndModifier
};

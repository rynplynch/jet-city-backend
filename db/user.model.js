//Our data model for the table users
module.exports = (sequalize, Sequelize) => {
  const User = sequalize.define("users", {
    first_name: { type: Sequelize.TEXT },
    last_name: { type: Sequelize.TEXT },
    email: { type: Sequelize.TEXT },
  });

  return User;
};

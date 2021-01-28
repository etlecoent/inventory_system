exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username");
    table.string("password");
    table.string("email");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.unique("email");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

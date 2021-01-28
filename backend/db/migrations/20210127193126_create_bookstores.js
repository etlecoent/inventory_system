exports.up = function (knex) {
  return knex.schema.createTable("bookstores", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.unique("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookstores");
};

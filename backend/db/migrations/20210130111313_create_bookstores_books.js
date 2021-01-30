exports.up = function (knex) {
  return knex.schema.createTable("bookstores_books", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("book_id").unsigned().notNullable();
    table.integer("bookstore_id").unsigned().notNullable();
    table.integer("quantity").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table
      .foreign("bookstore_id")
      .references("id")
      .inTable("bookstores")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .foreign("book_id")
      .references("id")
      .inTable("books")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.unique(["book_id", "bookstore_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookstores_books");
};

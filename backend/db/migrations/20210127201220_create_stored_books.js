exports.up = function (knex) {
  return knex.schema.createTable("stored_books", (table) => {
    table.increments("id");
    table.integer("quantity").defaultTo(0);
    table.foreign("bookstore_id").references("bookstores.id");
    table.foreign("book_id").references("books.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("stored_books");
};

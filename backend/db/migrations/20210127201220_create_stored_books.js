exports.up = function (knex) {
  return knex.schema.createTable("stored_books", (table) => {
    table.increments("id");
    table.integer("book_id").unsigned().notNullable();
    table.integer("bookstore_id").unsigned().notNullable();
    table.integer("quantity").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.foreign("book_id").references("id").inTable("books");
    table.foreign("bookstore_id").references("id").inTable("bookstores");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("stored_books");
};

var host = process.env.HOST || '127.0.0.1';
var port = process.env.DBPORT || 3306;


var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: host,
    user: 'root', // 'sandworm-hr'
    password: '', // 'sandworm'
    database: 'sandworm',
    charset: 'utf8',
    port: port
  }
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('stocks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('stocks', function (stock) {
      stock.increments('id').primary();
      stock.integer('portfolio_id', 255).references('id').inTable('portfolios');
      stock.string('symbol', 20);
      stock.integer('amount', 255);
      stock.string('start_date', 10);
      stock.string('end_date', 10);
      stock.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('portfolios').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('portfolios', function (portfolio) {
      portfolio.increments('id').primary();
      portfolio.string('name', 100);
      portfolio.integer('user_id').references('id').inTable('users');
      portfolio.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
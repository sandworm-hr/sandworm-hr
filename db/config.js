var host = process.env.HOST || '127.0.0.1';
var port = process.env.DBPORT || 3306;
var dbname = process.env.DBNAME || 'sandworm';
var dbuser = process.env.DBUSER || 'root';
var dbpassword = process.env.DBPASSWORD || '';


var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: host,
    user: dbuser, // 'sandworm-hr'
    password: dbpassword, // 'sandworm'
    database: dbname,
    charset: 'utf8',
    port: port
  }
});
var db = require('bookshelf')(knex);

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

db.knex.schema.hasTable('portfolios').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('portfolios', function (portfolio) {
      portfolio.increments('id').primary();
      portfolio.string('name', 100);
      portfolio.integer('users_id').unsigned().references('id').inTable('users');
      portfolio.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('stocks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('stocks', function (stock) {
      stock.increments('id').primary();
      stock.integer('portfolios_id').unsigned().references('id').inTable('portfolios');
      stock.string('symbol', 20);
      stock.integer('amount', 255);
      stock.string('from', 10);
      stock.string('to', 10);
      stock.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE devices (
  ID SERIAL PRIMARY KEY,
  manufacturer VARCHAR,
  serial VARCHAR,
  model VARCHAR,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  optional VARCHAR,
  email VARCHAR,
  message VARCHAR,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);

INSERT INTO devices ( manufacturer, serial, model )
VALUES ( 'Samsung', 'ABCD12345', 'Model-Number' );

INSERT INTO devices ( manufacturer, serial, model )
VALUES ( 'Apple', 'DADKLDFSKJ', 'Model-Number' );

INSERT INTO devices ( manufacturer, serial, model )
VALUES ( 'Apple', 'LSKJ4389R34', 'Model-Number' );

INSERT INTO devices ( manufacturer, serial, model )
VALUES ( 'Samsung', 'LKSJ888KJS', 'Model-Number' );

INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Stephania_Christiansen', 'YWX4hGcCSe9qDa3', 'Vernie', 'Corwin', 'schemas', 'Jaeden_Zboncak74@example.net', 'cutting-edge synergize action-items' );
INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Braeden_Dach', 'eWzqn7sBvPPJWYx', 'Ezekiel', 'Haley', 'platforms', 'Jody.Kilback@example.com', 'cross-media streamline web-readiness' );
INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Daisy93', 'hLgrCTFUuFAYryw', 'Katlyn', 'Larkin', 'markets', 'Scotty27@example.net', 'sexy architect infrastructures' );
INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Samantha17', 'iuFZFvXJKi4KNPh', 'Adela', 'Green', 'bandwidth', 'Ramona_Cruickshank68@example.com', 'cross-platform scale niches' );
INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Gerald_Littel39', 'X8bRZKT903_Nlv1', 'Annetta', 'Schultz', 'convergence', 'Lisa23@example.org', 'customized repurpose infomediaries' );
INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Geo.Klein', 'eoWSq3ZrfPmomF0', 'Chesley', 'Haley', 'platforms', 'Robert_Dickens33@example.net', 'rich redefine networks' );
INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Germaine_McKenzie19', 'najL1zWd3h0xeAY', 'River', 'Romaguera', 'networks', 'Kaya.Heathcote@example.net', 'transparent unleash communities' );
INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'Kaleigh74', 'jzcHEM6PnTOXqqg', 'Allen', 'Wisozk', 'bandwidth', 'Amya57@example.com', 'back-end facilitate web services' );

INSERT INTO users ( username, password, first_name, last_name, optional, email, message )
VALUES ( 'killbill', '$2a$10$dbnjt3x9vj4brOcq0qyxyOmhw6XZJV3o5SdFDtDkFs4t1X4KhW46m', 'Kill', 'Bill', 'option1', 'killbill@example.org', '$2a$10$dbnjt3x9vj4brOcq0qyxyOmhw6XZJV3o5SdFDtDkFs4t1X4KhW46m' );


---------------------------------------------------------------------------

DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE devices (
  ID SERIAL PRIMARY KEY,
  manufacturer VARCHAR,
  serial VARCHAR,
  model VARCHAR,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,  
  first_name VARCHAR,
  last_name VARCHAR,
  optional VARCHAR,
  email VARCHAR,
  message VARCHAR,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);

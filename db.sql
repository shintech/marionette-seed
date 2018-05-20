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

INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Fredrick', 'Mayer', 'ROI', 'Aron12@example.com', 'vertical embrace web-readiness' );
INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Jean', 'Altenwerth', 'e-services', 'Trevor_Emard14@example.com', 'robust unleash niches' );
INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Nadia', 'Tromp', 'e-services', 'Wyman72@example.net', 'plug-and-play productize platforms' );
INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Rebecca', 'Feil', 'systems', 'Jackeline91@example.org', 'frictionless evolve functionalities' );
INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Jarred', 'Prohaska', 'markets', 'Linda18@example.net', 'synergistic whiteboard metrics' );
INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Muriel', 'Carter', 'web services', 'Thaddeus30@example.com', 'killer visualize systems' );
INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Lizzie', 'Ward', 'metrics', 'Matteo.Mosciski@example.com', 'end-to-end monetize schemas' );
INSERT INTO users ( first_name, last_name, optional, email, message )
VALUES ( 'Kill', 'Bill', 'option1', 'killbill@example.org', '$2a$10$dbnjt3x9vj4brOcq0qyxyOmhw6XZJV3o5SdFDtDkFs4t1X4KhW46m' );


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
  first_name VARCHAR,
  last_name VARCHAR,
  optional VARCHAR,
  email VARCHAR,
  message VARCHAR,
  created_at TIMESTAMP without time zone default (now() at time zone 'utc')
);

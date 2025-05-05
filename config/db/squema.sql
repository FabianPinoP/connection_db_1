CREATE TABLE viajes (
  id SERIAL, 
  destino VARCHAR(50) NOT NULL, 
  presupuesto INT NOT NULL
);

CREATE TABLE usuarios (
  id SERIAL, 
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
  );

  ALTER TABLE usuarios ADD stripe_customer_id VARCHAR(100);
  ALTER TABLE usuarios ADD COLUMN avatar_url VARCHAR, ADD COLUMN avatar_id VARCHAR;
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
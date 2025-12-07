import { Pool } from "pg";
import config from ".";

//!---creating db with pool for db connecton----
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

//!---creating table in Neon db-----
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) NOT NULL UNIQUE CHECK (email = LOWER(email)),
          password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
          phone VARCHAR(20) NOT NULL,
          role VARCHAR(20) NOT NULL CHECK (role IN ('admin','customer'))
          ); 
        `);


    await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles(
              id SERIAL PRIMARY KEY,
              vehicle_name VARCHAR(100) NOT NULL,
              type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
              registration_number VARCHAR(50) NOT NULL UNIQUE,
              daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
              availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
            )
            `);



        await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings(
              id SERIAL PRIMARY KEY,
              customer_id INT NOT NULL,
              vehicle_id INT NOT NULL,
              rent_start_date DATE NOT NULL,
              rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
              total_price NUMERIC(10,2),
              status VARCHAR(20) NOT NULL CHECK (status IN ('active','cancelled','returned')),
              FOREIGN KEY (customer_id) REFERENCES users(id),
              FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
            )
            `);

        await pool.query(`
          DROP FUNCTION IF EXISTS calculate_total_price() CASCADE;
          CREATE OR REPLACE FUNCTION calculate_total_price()
          RETURNS TRIGGER AS $$
          BEGIN
            SELECT (daily_rent_price * (NEW.rent_end_date - NEW.rent_start_date))
            INTO NEW.total_price
            FROM vehicles
            WHERE vehicles.id = NEW.vehicle_id;
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
      `);


    await pool.query(`
      DROP TRIGGER IF EXISTS trg_calculate_total_price ON bookings;
      CREATE TRIGGER trg_calculate_total_price
      BEFORE INSERT OR UPDATE ON bookings
      FOR EACH ROW
      EXECUTE FUNCTION calculate_total_price();
    `);




};

export default initDB;

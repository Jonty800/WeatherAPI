import * as Knex from "knex";

export default async function initDb(knex: Knex.Knex) {
  const hasTable = await knex.schema
    .hasTable("weather_data")
    .catch((err: Error) => {
      console.log(err);
    });
  if (!hasTable) {
    //if table doesn't exist
    await knex.schema //create table
      .createTable("weather_data", (table: Knex.Knex.TableBuilder) => {
        table.increments(); //id column (primary key)
        table.string("postcode").notNullable();
        table.integer("date").notNullable();
        table.string("maxtempC").notNullable();
        table.string("maxtempF").notNullable();
        table.string("mintempC").notNullable();
        table.string("mintempF").notNullable();
        table.string("avgtempC").notNullable();
        table.string("avgtempF").notNullable();
        table.string("location").nullable();
        table.string("totalSnow_cm").nullable();
        table.string("sunHour").nullable();
        table.string("uvIndex").nullable();
      })
      .then(() => {
        //add an index to the postcode column
        return knex.raw(
          "CREATE INDEX weather_data_postcode_index ON weather_data (postcode)"
        );
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
}

import * as Knex from "knex";

export async function initDb(knex: Knex.Knex) {
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

export async function insertOrUpdateIntoDb(data: any, knex: Knex.Knex) {
  const entry: any = await knex("weather_data")
    .where({ date: data.date, postcode: data.postcode })
    .limit(1);

  if (entry.length === 0) {
    //insert
    await knex("weather_data").insert(data);
  } else {
    //update
    await knex("weather_data")
      .update(data)
      .where({ date: data.date, postcode: data.postcode });
  }
}

export const dropTable = (knex: Knex.Knex) => {
  return knex.schema.dropTableIfExists("weather_data");
};

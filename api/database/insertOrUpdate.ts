import * as Knex from "knex";

export default async function insertOrUpdate(data: any, knex: Knex.Knex) {
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

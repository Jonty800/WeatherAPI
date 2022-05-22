import * as Knex from "knex";
import log from "../utils/logger/logger";
import { LogLevel } from "../utils/logger/LogLevel";
import { TABLE_NAME } from "./constants";

export default async function initDatabase(knex: Knex.Knex) {
  const hasTable = await knex.schema
    .hasTable(TABLE_NAME)
    .catch((err: Error) => {
      log(err, LogLevel.error);
    });
  if (!hasTable) {
    //if table doesn't exist
    await knex.schema //create table
      .createTable(TABLE_NAME, (table: Knex.Knex.TableBuilder) => {
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
        return knex.schema.alterTable(
          TABLE_NAME,
          (table: Knex.Knex.TableBuilder) => {
            table.index("postcode");
          }
        );
      })
      .catch((err: Error) => {
        log(err, LogLevel.error);
      });
  }
}

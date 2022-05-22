import { TABLE_NAME } from "./constants";
import database from "./index";

export default async function insertOrUpdate(data: any) {
  const entry: any = await database
    .connection(TABLE_NAME)
    .where({ date: data.date, postcode: data.postcode })
    .limit(1);

  if (entry.length === 0) {
    //insert
    await database.connection(TABLE_NAME).insert(data);
  } else {
    //update
    await database
      .connection(TABLE_NAME)
      .update(data)
      .where({ date: data.date, postcode: data.postcode });
  }
}

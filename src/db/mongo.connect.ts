import { connection, connections, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongo: string = process.env.MONGO || "";
export const mongoTest: string = process.env.MONGOTEST || "";

export function mongoConnect(test: boolean) {
  connection;
  // .on("error", (error) => {
  //   console.log("ERROR: Connection to MongoDB failed", error);
  // })

  // .on("close", () => {
  //   console.log("Connection to MongoDB ended");
  //   process.exit();
  // })

  // .once("open", () => {
  //   const infos = connections;

  //   infos.map((info) =>
  //     console.log(
  //       `Connected to ${info.host}:${info.port}/${info.name} mongo Database`
  //     )
  //   );
  // });

  if (test === true) {
    connect(mongoTest);
  } else {
    connect(mongo);
  }
}

export async function mongoDisconnect() {
  await connection.close();
}

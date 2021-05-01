import Config from "../../config.json";
import { MongoClient } from "mongodb";
import GuildWarsReport from "../reports/model/GuildWarsReport";

const client = new MongoClient(Config.mongoUri);

async function sendGuildWarsReport(report: GuildWarsReport) {
  try {
    console.log(`Storing ${report} in database`);
    await client.connect();
    let db = client.db(Config.db);
    db.collection(Config.collection).insertOne(report, (err, res) => {
      if (err) {
        throw err;
      }
      console.log("1 document inserted", res.ops, report);
    });
  } finally {
    await client.close();
  }
}

export { sendGuildWarsReport };

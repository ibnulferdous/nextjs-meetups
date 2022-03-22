import { MongoClient } from "mongodb";

async function addNewMeetup(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dh7kk.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`
    );
    const db = client.db("nextjs_meetups");

    const meetupCollections = db.collection("meetups-list");
    const result = await meetupCollections.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup added successfully!" });
  }
}

export default addNewMeetup;

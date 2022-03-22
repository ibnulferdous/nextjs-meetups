import { MongoClient } from "mongodb";

async function addNewMeetup(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://ibnul1:Q9T8kE1rfkMKWe5W@cluster0.dh7kk.mongodb.net/nextjs_meetups?retryWrites=true&w=majority"
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

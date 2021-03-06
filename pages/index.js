import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const Home = (props) => {
  return (
    <>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
};

export async function getStaticProps() {
  // Fetch data from an API
  const client = await MongoClient.connect(
    `mongodb+srv://ibnul1:Q9T8kE1rfkMKWe5W@cluster0.dh7kk.mongodb.net/nextjs_meetups?retryWrites=true&w=majority`
  );
  const db = client.db("nextjs_meetups");

  const meetupCollections = db.collection("meetups-list");
  const allMeetups = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: allMeetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 5,
  };
}

export default Home;

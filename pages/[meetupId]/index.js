import { MongoClient, ObjectId } from "mongodb";

import { useRouter } from "next/router";

import Meta from "../../components/layout/Meta";
import MeetupDetails from "../../components/meetups/MeetupDetails";

const Home = ({ meetupData }) => {
  return (
    <>
      <Meta title={`Next.JS Meetups- ${meetupData.title}`} />
      <MeetupDetails meetupData={meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  // Fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://ibnul1:Q9T8kE1rfkMKWe5W@cluster0.dh7kk.mongodb.net/nextjs_meetups?retryWrites=true&w=majority"
  );
  const db = client.db("nextjs_meetups");

  const meetupCollections = db.collection("meetups-list");
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // Fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://ibnul1:Q9T8kE1rfkMKWe5W@cluster0.dh7kk.mongodb.net/nextjs_meetups?retryWrites=true&w=majority"
  );
  const db = client.db("nextjs_meetups");

  const meetupCollections = db.collection("meetups-list");
  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default Home;

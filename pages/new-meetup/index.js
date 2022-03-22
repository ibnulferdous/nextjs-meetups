import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Meta from "../../components/layout/Meta";

const Home = () => {
  const router = useRouter();

  const handleAddMeetup = async (enteredMeetupData) => {
    const response = await fetch("/api/add-new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace("/");
  };

  return (
    <>
      <Meta
        title={`Next.JS Meetups- Add new meetup`}
        description={
          "Add your own meetups and create networking opportunities..."
        }
      />
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
};

export default Home;

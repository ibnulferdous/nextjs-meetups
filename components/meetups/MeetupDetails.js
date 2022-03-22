import styles from "./MeetupDetails.module.css";

const MeetupDetails = ({ meetupData }) => {
  return (
    <section className={styles.details}>
      <img src={meetupData.image} alt={meetupData.title} />
      <h1>{meetupData.title}</h1>
      <address>{meetupData.address}</address>
      <p>{meetupData.description}</p>
    </section>
  );
};

export default MeetupDetails;

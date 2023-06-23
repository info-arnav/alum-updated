import LoggedIn from '@/app/loggedIn';
import Applicants from './applicants';

export default function Status({ params }) {
  const data = LoggedIn();
  // console.log(data);

  return (
    <>
      <Applicants email={data.data.email} id={params.id}></Applicants>
    </>
  );
}

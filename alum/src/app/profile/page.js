import LoggedIn from '../loggedIn';
import UserProfile from './userProfile';

export default function Profile() {
  const data = LoggedIn();
  return <UserProfile data={data} link={process.env.LINK}></UserProfile>;
}

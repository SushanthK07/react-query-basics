import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { isLoading: isUserDataLoading, data: user } = useQuery(
    ["user", email],
    () => fetchUserByEmail(email)
  );
  const channelId = user?.data?.channelId;
  console.log({ channelId });

  const { isLoading: isCoursesDataLoding, data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    { enabled: !!channelId }
  );
  console.log({ courses });

  return (
    <>
      <h2>Courses</h2>
      {isUserDataLoading && <h4>Loading user data...</h4>}
      {isCoursesDataLoding && <h4>Loading courses...</h4>}
      {courses?.data?.courses.map((course) => {
        return <div key={course}>{course}</div>;
      })}
    </>
  );
};

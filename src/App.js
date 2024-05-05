import React, { useState, useEffect } from 'react';
import JobCard from './components/JobCard';

const App = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const body = JSON.stringify({
          limit: 10,
          offset: 0
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body
        };

        const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        setJobs(data.jdList); // Update state with the array of job objects from jdList
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobs();
  }, []);

  console.log('Jobs state:', jobs); // Log the jobs state

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {Array.isArray(jobs) && jobs.length > 0 && jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default App;

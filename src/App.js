import React, { useState, useEffect } from 'react';
import JobCard from './components/JobCard';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [companyNameSearch, setCompanyNameSearch] = useState('');
  const [jobRoleSearch, setJobRoleSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [minExperienceFilter, setMinExperienceFilter] = useState(null);
  const [minSalaryFilter, setMinSalaryFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true); // Track whether more data is available

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const body = JSON.stringify({
          limit: 10,
          offset: (page - 1) * 10
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
        // console.log('Fetched data:', data); 
        if (data.jdList.length === 0) {
          // If no more data available, set hasMoreData to false
          setHasMoreData(false);
        } else {
          setJobs(prevJobs => [...prevJobs, ...data.jdList]);
          setPage(prevPage => prevPage + 1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (hasMoreData) {
      fetchJobs();
    }
  }, [page, hasMoreData]); // Fetch data only if there's more data to load

  useEffect(() => {
    setPage(1); // Reset page when any search query changes
    setJobs([]); // Reset jobs array when any search query changes
    setHasMoreData(true); // Reset hasMoreData flag when any search query changes
  }, [companyNameSearch, jobRoleSearch, locationSearch]);

  const handleCompanyNameSearchChange = e => {
    setCompanyNameSearch(e.target.value);
  };

  const handleJobRoleSearchChange = e => {
    setJobRoleSearch(e.target.value);
  };

  const handleLocationSearchChange = e => {
    setLocationSearch(e.target.value);
  };

  const handleExperienceChange = e => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setMinExperienceFilter(value);
    }
  };

  const handleSalaryChange = e => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setMinSalaryFilter(value);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const { companyName = '', jobRole = '', location = '', minExp, maxJdSalary } = job; // Add null checks and default values
    const lowerCaseCompanyNameSearch = companyNameSearch.toLowerCase();
    const lowerCaseJobRoleSearch = jobRoleSearch.toLowerCase();
    const lowerCaseLocationSearch = locationSearch.toLowerCase();
    return (
      (lowerCaseCompanyNameSearch.length === 0 || companyName.toLowerCase().includes(lowerCaseCompanyNameSearch)) &&
      (lowerCaseJobRoleSearch.length === 0 || jobRole.toLowerCase().includes(lowerCaseJobRoleSearch)) &&
      (lowerCaseLocationSearch.length === 0 || location.toLowerCase().includes(lowerCaseLocationSearch)) &&
      (!minExperienceFilter || (minExp !== null && minExp <= minExperienceFilter)) &&
      (!minSalaryFilter || (maxJdSalary !== null && maxJdSalary >= minSalaryFilter))
    );
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container"> 
      <div className="input-container">
        <input
          type="text"
          placeholder="Search by Company Name..."
          value={companyNameSearch}
          onChange={handleCompanyNameSearchChange}
          className="search-box"
        />
        <input
          type="text"
          placeholder="Search by Job Role..."
          value={jobRoleSearch}
          onChange={handleJobRoleSearchChange}
          className="search-box"
        />
        <input
          type="text"
          placeholder="Search by Location..."
          value={locationSearch}
          onChange={handleLocationSearchChange}
          className="search-box"
        />
        <input
          type="number"
          placeholder="Minimum experience..."
          value={minExperienceFilter || ""}
          onChange={handleExperienceChange}
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Minimum salary..."
          value={minSalaryFilter || ""}
          onChange={handleSalaryChange}
          className="filter-input"
        />
      </div>
      <div className="job-cards-container"> {/* Apply CSS class for job cards */}
        {filteredJobs.length === 0 && !loading && <div>No matching jobs found.</div>}
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default App;

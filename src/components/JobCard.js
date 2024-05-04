import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  // Extracting jobDescription, minExp, minJdSalary, maxJdSalary, and salaryCurrencyCode from job object
  const { jobDetailsFromCompany: jobDescription, minExp, minJdSalary, maxJdSalary, salaryCurrencyCode } = job;

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h6">{job.jobTitle}</Typography>
        <Typography variant="subtitle1">{job.companyName}</Typography>
        <Typography variant="subtitle2">{job.location}</Typography>
        <Typography variant="body2">
          {jobDescription ? ( // Check if jobDescription exists
            expanded ? jobDescription : `${jobDescription.slice(0, 100)}...`
          ) : (
            "No description available" // Provide a default message if jobDescription is undefined
          )}
          <Button onClick={toggleDescription}>
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
        </Typography>
        <Typography variant="body2">Experience: {minExp}</Typography> {/* Use minExp for experience */}
        <Typography variant="body2">
          Salary: {minJdSalary && maxJdSalary ? `${minJdSalary} - ${maxJdSalary} ${salaryCurrencyCode}` : "Not specified"}
        </Typography> {/* Display salary range and currency code */}
        <Button variant="contained" color="primary" href={job.applyLink} target="_blank">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;

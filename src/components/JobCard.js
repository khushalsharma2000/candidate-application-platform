import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardMedia } from '@material-ui/core';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  // Extracting jobDescription, minExp, minJdSalary, maxJdSalary, salaryCurrencyCode, and logoUrl from job object
  const { jobDetailsFromCompany: jobDescription, minExp, minJdSalary, maxJdSalary, salaryCurrencyCode, jobRole, companyName, location, logoUrl } = job;

  return (
    <Card style={{ width: '30%', margin: '10px', display: 'inline-block', verticalAlign: 'top', position: 'relative' }}>
      {logoUrl && <CardMedia component="img" image={logoUrl} style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '20px', marginTop: '20px', position: 'absolute', top: '10%', transform: 'translateY(-50%)' }} />}
      <CardContent style={{ paddingLeft: '60px', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">{job.jobTitle}</Typography>
        <Typography variant="subtitle1">{companyName}</Typography>
        <Typography variant="body2">Job Role: {jobRole}</Typography> 
        <Typography variant="subtitle2">{location}</Typography>
        <Typography variant="body2">
          Estimated Salary: {minJdSalary && maxJdSalary ? `${minJdSalary} - ${maxJdSalary} ${salaryCurrencyCode}` : "Not specified"}
        </Typography> {/* Display salary range and currency code */}
        <Typography variant="body2">About Company:</Typography> {/* About Company on a new line */}
        <Typography variant="body2">
          {jobDescription ? ( // Check if jobDescription exists
            expanded ? jobDescription : `${jobDescription.slice(0, 100)}...`
          ) : (
            "No description available" // Provide a default message if jobDescription is undefined
          )}
        </Typography>
        <Button onClick={toggleDescription} style={{ alignSelf: 'center' }}>
          {expanded ? 'Read Less' : 'Read More'}
        </Button>
        <Typography variant="body2">Experience: {minExp}</Typography> {/* Use minExp for experience */}
        <Button variant="contained" color="primary" href={job.applyLink} target="_blank">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;

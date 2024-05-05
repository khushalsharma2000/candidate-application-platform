import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardMedia } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const {
    jobDetailsFromCompany: jobDescription,
    minExp,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode,
    jobRole,
    companyName,
    location,
    logoUrl,
    applyLink
  } = job;

  return (
    <Card  className = "card-container" >
      {logoUrl && (
        <CardMedia
          component="img"
          image={logoUrl}
          alt="Company Logo"
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            marginRight: '20px',
            marginTop: '20px',
            position: 'absolute',
            top: '10%',
            transform: 'translateY(-50%)'
          }}
        />
      )}
      <CardContent style={{ 
        paddingLeft: '60px', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <Typography variant="h6">{job.jobTitle}</Typography>
        {companyName && (
          <Typography variant="subtitle1" style={{ color: 'grey' }}>
            {companyName.charAt(0).toUpperCase() + companyName.slice(1)}
          </Typography>
        )}
        {jobRole && (
          <Typography variant="body2">
            Job Role: {jobRole.charAt(0).toUpperCase() + jobRole.slice(1)}
          </Typography>
        )}
        {location && (
          <Typography variant="subtitle2" style={{ fontWeight: '800' }}>
            {location.charAt(0).toUpperCase() + location.slice(1)}
          </Typography>
        )}

        {minJdSalary !== null && maxJdSalary !== null && (
          <Typography variant="body2" style={{ display: 'flex', alignItems: 'center', color: '#4D5DC4' }}>
            Estimated Salary: {minJdSalary}k - {maxJdSalary}k {salaryCurrencyCode}PA

            {salaryCurrencyCode === 'USD' && <CheckIcon style={{ marginLeft: '5px', color: 'green' }} />}
          </Typography>
        )}
        {minJdSalary !== null && maxJdSalary === null && (
          <Typography variant="body2" style={{ display: 'flex', alignItems: 'center', color: '#4D5DC4' }}>
            Estimated Salary: {minJdSalary}k {salaryCurrencyCode}PA
            {salaryCurrencyCode === 'USD' && <CheckIcon style={{ marginLeft: '5px',color: 'green' }} />}
          </Typography>
        )}

        {minJdSalary === null && maxJdSalary !== null && (
          <Typography variant="body2" style={{ display: 'flex', alignItems: 'center', color: '#4D5DC4' }}>
            Estimated Salary: {maxJdSalary}k {salaryCurrencyCode}PA
            {salaryCurrencyCode === 'USD' && <CheckIcon style={{ marginLeft: '5px', color: 'green' }} />}
          </Typography>
        )}

        {jobDescription && <Typography variant="body2" style={{ fontWeight: '500' }}>About Company:</Typography>}
        {jobDescription && <Typography variant="body2" style={{ fontWeight: '800' }}>About us</Typography>}
        <Typography variant="body2">
          {jobDescription && (
            expanded ? jobDescription : `${jobDescription.slice(0, 100)}...`
          )}
          {jobDescription && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={toggleDescription} style={{ color: '#4D5DC4' }}>
                {expanded ? 'View less' : 'View job'}
              </Button>
            </div>
          )}
        </Typography>
        {minExp && (
          <Typography variant="body2" style={{ color: 'grey' }}>
            Minimum Experience: {minExp} years 
          </Typography>
        )}

        <Button variant="contained" style={{ backgroundColor: '#5DEBD3', color: 'black' }} href={applyLink} target="_blank">
        <FlashOnIcon style={{color:'yellow'}}/>Easy Apply 
        </Button>

      </CardContent>
    </Card>
  );
};

export default JobCard;

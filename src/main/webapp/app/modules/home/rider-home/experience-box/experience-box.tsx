import React, { useEffect, useState } from 'react';
import './experience-box.scss';
import { useAppSelector } from 'app/config/store';
import { handleLevelOfExperience } from 'app/shared/util/experience-level-convertor';

const ExperienceBox = () => {
  const rider = useAppSelector(state => state.rider.entity);
  const [boxOpen, setBoxOpen] = useState(true);

  useEffect(() => {}, [boxOpen]);

  return (
    <div className="experienceBox" style={boxOpen ? null : { height: '72px' }}>
      <div className="headerContainer">
        <h1 className="fsPrimaryHeading">Experience</h1>
        <div className="circleContainer" onClick={() => setBoxOpen(!boxOpen)}>
          <div className="greyCircle" />
          <div className={boxOpen ? `upArrow` : `downArrow`} />
        </div>
      </div>
      <div className={`contentContainer ${boxOpen ? '' : 'closed'}`}>
        <div className="rowContainer">
          <p className="rowName">Years of experience: </p>
          <p className="rowValue">{rider?.yearsExperience ? rider?.yearsExperience : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Years of competition: </p>
          <p className="rowValue">{rider?.yearsCompitition ? rider?.yearsCompitition : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Level: </p>
          <p className="rowValue">{handleLevelOfExperience(rider?.levelExperience)}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Riding days in a week: </p>
          <p className="rowValue">{rider?.expectedWeekRiding ? rider?.expectedWeekRiding : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Reference: </p>
          <p className="rowValue">{rider?.referenceName ? rider?.referenceName : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Reference phone number: </p>
          <p className="rowValue">{rider?.referencePhoneNumber ? rider?.referencePhoneNumber : 'unknown'}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceBox;

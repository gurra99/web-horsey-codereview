import React from 'react';
import './rider-home.scss';
import ExperienceBox from 'app/modules/home/rider-home/experience-box/experience-box';
import BookingsBox from 'app/modules/home/rider-home/booking-box/booking-box';
import TopBox from 'app/modules/home/rider-home/top-box/top-box';

const RiderHome = () => {
  return (
    <div className="riderHome">
      <TopBox />
      <div className="boxContainer">
        <ExperienceBox />
        <BookingsBox />
      </div>
    </div>
  );
};

export default RiderHome;

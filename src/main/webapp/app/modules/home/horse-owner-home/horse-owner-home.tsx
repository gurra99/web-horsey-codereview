import React from 'react';
import './horse-owner-home.scss';
import OwnerInformationBox from 'app/modules/home/horse-owner-home/owner-information-box/owner-information-box';
import HorseOwnerManagementBox from 'app/modules/home/horse-owner-home/horse-owner-management-box/horse-owner-management-box';
import HorseOwnerBookingBox from 'app/modules/home/horse-owner-home/horse-owner-booking-box/horse-owner-booking-box';

const HorseOwnerHome = () => {
  return (
    <div className="horseOwnerHome">
      <OwnerInformationBox />
      <div className="boxContainer">
        <HorseOwnerManagementBox />
        <HorseOwnerBookingBox />
      </div>
    </div>
  );
};

export default HorseOwnerHome;

import React, { useEffect } from 'react';
import './top-box-profile.scss';
import { useAppDispatch, useAppSelector } from "app/config/store";
import { getOwnerId, getRiderId } from "app/modules/administration/user-management/user-management.reducer";
import { getHorseOwner } from "app/entities/horse-owner/horse-owner.reducer";

interface TopBoxProfileI {
  horseOwnerId: string;
}

const TopBoxProfile = (props: TopBoxProfileI) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const horseOwner = useAppSelector(state => state.horseOwner.entity);

  useEffect(() => {
    dispatch(getHorseOwner(props.horseOwnerId));
  }, []);

  useEffect(() => {
    if (account.id) {
      dispatch(getRiderId(account.id));
      dispatch(getOwnerId(account.id));
    }
  }, [account.id]);

  return (
    <div className="topBoxProfile">
      <img className={"profileImage"} src="../../../../../content/images/johaug.png" />
      <div className="infoContainer">
        <p className="fullName">
          {horseOwner?.firstName}
        </p>

        <div className="rowContainer">
          <p className="rowName">Age: </p>
          <p className="rowValue">{horseOwner?.age ? horseOwner?.age : 'unknown'}</p>
        </div>

        <div className="rowContainer">
          <p className="rowName">Email: </p>
          <p className="rowValue">{horseOwner ? 'unknown' : 'unknown'}</p>
        </div>

        <div className="rowContainer">
          <p className="rowName">Phone number: </p>
          <p className="rowValue">{horseOwner?.phoneNumber ? horseOwner?.phoneNumber : 'unknown'}</p>
        </div>

        <div className="rowContainer">
          <p className="rowName">Years of experience: </p>
          <p className="rowValue">{horseOwner?.yearsExperience ? horseOwner?.yearsExperience : 'unknown'}</p>
        </div>

        <div className="rowContainer">
          <p className="rowName">Description: </p>
          <p className="rowValue">{horseOwner?.description ? horseOwner?.description : 'unknown'}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBoxProfile;

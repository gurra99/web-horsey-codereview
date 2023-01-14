import React, {useEffect} from 'react';
import './top-box.scss';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getRiderByUserId } from "app/entities/rider/rider.reducer";

const TopBox = () => {
  const account = useAppSelector(state => state.authentication.account);
  const riderId = useAppSelector(state => state.userManagement.riderId);
  const rider = useAppSelector(state => state.rider.entity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (account.id) {
      dispatch(getRiderByUserId(account.id));
    }
  }, [account.id]);

  return (
    <div className="topBox">
      <img className={"profileImage"} src="../../../../../content/images/maya.png" />
      <div className="personalInfoContainer">
        <h2 className="fsSecondaryHeading">
        {account?.firstName ? account?.firstName : ""} {account?.lastName ? account?.lastName : ""}
        </h2>
        <div className="rowContainer">
          <p className="rowName">Age: </p>
          <p className="rowValue">{rider?.age ? rider?.age : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Email: </p>
          <p className="rowValue">{rider?.email ? account?.email : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Phone number: </p>
          <p className="rowValue">unknown</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Height: </p>
          <p className="rowValue">{rider?.height ? rider?.height + ' cm' : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Weight: </p>
          <p className="rowValue">{rider?.weight ? rider?.weight + ' kg' : 'unknown'}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Description: </p>
          <p className="rowValue">{rider?.description ? rider?.description : 'unknown'}</p>
        </div>
      </div>
      <Button className="editProfile" tag={Link} to={`/rider/${riderId}`} color="primary" size="sm" data-cy="entityEditButton">
        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit Profile</span>
      </Button>
      <Button className="editAccount" tag={Link} to={`/account/settings`} color="info" size="sm" data-cy="entityEditButton">
        <FontAwesomeIcon icon="wrench" /> <span className="d-none d-md-inline">Edit Account</span>
      </Button>
    </div>
  );
};

export default TopBox;

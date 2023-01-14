import React, { useEffect } from 'react';
import './home.scss';
import UserPath from 'app/modules/home/user-path/user-path';
import HorseOwnerHome from 'app/modules/home/horse-owner-home/horse-owner-home';
import RiderHome from 'app/modules/home/rider-home/rider-home';
import LoginInfo from 'app/modules/home/login-info/login-info';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { reset as resetUser } from 'app/modules/administration/user-management/user-management.reducer';
import { getRiderId } from 'app/modules/administration/user-management/user-management.reducer';
import { getOwnerId } from 'app/modules/administration/user-management/user-management.reducer';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const riderId = useAppSelector(state => state.rider.riderId);
  const ownerId = useAppSelector(state => state.horseOwner.ownerId);
  const loading = useAppSelector(state => state.userManagement.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(resetUser);
  }, []);

  useEffect(() => {
    if (account.id) {
      dispatch(getRiderId(account.id));
      dispatch(getOwnerId(account.id));
    }
  }, [account.id]);

  return (
    <div className="home">
      {!loading && (
        <div className="homeContainer">
          {account?.login ? (
            <div>
              {!(ownerId || riderId) ? <UserPath /> : riderId ? <RiderHome /> : <HorseOwnerHome />}
            </div>
          ) : (
            <LoginInfo />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

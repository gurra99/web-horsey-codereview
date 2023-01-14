import React, { useEffect } from 'react';
import './booking-page.scss';
import { Button } from 'reactstrap';
import { IBooking } from 'app/shared/model/booking.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getBooking, getEntity as getBookings, updateEntity as updateBooking } from 'app/entities/booking/booking.reducer';
import { getEntity as getRider } from 'app/entities/rider/rider.reducer';
import { getRiderId } from 'app/modules/administration/user-management/user-management.reducer';
import { getOwnerId } from 'app/modules/administration/user-management/user-management.reducer';

const BookingPage = props => {
  const account = useAppSelector(state => state.authentication.account);
  const booking = useAppSelector(state => state.booking.booking);
  const riderId = useAppSelector(state => state.rider.riderId);
  const ownerId = useAppSelector(state => state.horseOwner.ownerId);
  const rider = useAppSelector(state => state.rider.entity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooking(props.match.params.id));
    dispatch(getBookings(props.match.params.id));
  }, []);

  useEffect(() => {
    if (account.id) {
      dispatch(getRiderId(account.id));
      dispatch(getOwnerId(account.id));
    }
  }, [account.id]);

  useEffect(() => {
    if(riderId) {
      dispatch(getRider(riderId));
    }
  }, [riderId]);

  const handleUpdateBooking = () => {
    const entity: IBooking = {
      ...booking,
      rider: rider,
    };
    dispatch(updateBooking(entity));
    props.history.goBack();
  };

  return (
    <div className="bookingPage">
      <h2 className="title">Booking</h2>
      <div className="infoContainer">
        <div className="rowContainer">
          <p className="rowName">Title:</p>
          <p className="rowValue">{booking?.title}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Start:</p>
          <p className="rowValue">
            {new Date(booking?.start).toLocaleDateString(['sv-SE'], {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="rowContainer">
          <p className="rowName">End:</p>
          <p className="rowValue">
            {new Date(booking?.end).toLocaleDateString(['sv-SE'], {
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Description:</p>
          <p className="rowValue">{booking?.description}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Price:</p>
          <p className="rowValue">{booking?.price}</p>
        </div>
        <div className="rowContainer">
          <p className="rowName">Appropriate Level Experience:</p>
          <p className="rowValue">{booking?.appropriateLevelExperience}</p>
        </div>
      </div>
      <div className="buttonContainer">
        <Button onClick={() => props.history.goBack()} color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp; &nbsp;
        <Button onClick={() => handleUpdateBooking()} color="primary" disabled={booking?.rider?.id || ownerId ? true : false}>
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Book</span>
        </Button>
      </div>
    </div>
  );
};

export default BookingPage;

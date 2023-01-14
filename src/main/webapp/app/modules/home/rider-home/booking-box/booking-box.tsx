import React, { useEffect, useState } from 'react';
import './booking-box.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getBookings } from 'app/entities/booking/booking.reducer';

const BookingsBox = () => {
  const bookingList = useAppSelector(state => state.booking.entities);
  const riderId = useAppSelector(state => state.userManagement.riderId);
  const [boxOpen, setBoxOpen] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getBookings({
        page: null,
        size: null,
        sort: null,
        id: riderId ? 'rider' : 'owner',
      })
    );
  }, []);

  useEffect(() => {}, [boxOpen]);

  return (
    <div className="bookingBox" style={boxOpen ? null : { height: '72px' }}>
      <div className="headerContainer">
          <h1 className="fsPrimaryHeading">Bookings</h1>
          <div className="circleContainer" onClick={() => setBoxOpen(!boxOpen)}>
          <div className="greyCircle" />
          <div className={boxOpen ? `upArrow` : `downArrow`} />
        </div>
      </div>
      <div className={`bookingCardContainer ${boxOpen ? '' : 'closed'}`}>
        {bookingList.length >= 1
          ? bookingList.map((bookingItem, bookingIndex) => {
              return (
                <Link className="bookingCard" to={`/home/booking/${bookingItem?.id}`} color="link" key={bookingIndex}>
                  <p className="fullName">{bookingItem?.title}</p>
                  <div className="dateContainer">
                    <div className="blueBox">
                      {new Date(bookingItem?.start).toLocaleDateString(['sv-SE'], {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="blueBox">
                      {new Date(bookingItem?.start).toLocaleTimeString(['sv-SE'], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      -
                      {new Date(bookingItem?.end).toLocaleTimeString(['sv-SE'], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className="greenBox">{bookingItem?.horse.fullName}</div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default BookingsBox;

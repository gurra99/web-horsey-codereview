import React from 'react';
import './backdrop.scss';
import { setIsNewBookingState } from "app/entities/booking/booking.reducer";
import { useAppDispatch } from "app/config/store";

const Backdrop = props => {
  const dispatch = useAppDispatch();

  return (
    <>
      {props.showModal ? (
        <div
          className="backdrop"
          onClick={() => {
            props.closeBackdrop();
            dispatch(setIsNewBookingState(true));
          }}
        />
      ) : null}
    </>
  );
};

export default Backdrop;

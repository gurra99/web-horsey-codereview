import React, {useEffect} from 'react';
import './modal.scss';
import Backdrop from 'app/modules/booking-manager/modal/backdrop/backdrop';
import ModalContent from 'app/modules/booking-manager/modal/modal-content/modal-content';
import { useAppSelector } from "app/config/store";

const Modal = props => {
  const isNewBooking = useAppSelector(state => state.booking.isNewBooking);
  useEffect(() => {}, [props.showModal, isNewBooking]);

  return (
    <>
      <Backdrop showModal={props.showModal} closeBackdrop={props.closeBackdrop} />
      <div className="modalBookingPlanner">
        <ModalContent showModal={props.showModal} closeBackdrop={props.closeBackdrop} newBooking={props.newBooking} />
      </div>
    </>
  );
};

export default Modal;

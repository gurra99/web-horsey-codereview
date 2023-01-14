import React, { useEffect, useState } from 'react';
import './booking-manager.scss';
import CalendarSidebar from 'app/modules/booking-manager/calendar-sidebar/calendar-sidebar';
import BookingCalendar from 'app/modules/booking-manager/booking-calendar/booking-calendar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { IHorse } from 'app/shared/model/horse.model';
import { getEntities as getBookings, getEntitiesByHorseId as getBookingsByHorseId } from 'app/entities/booking/booking.reducer';
import { getEntities as getHorses } from 'app/entities/horse/horse.reducer';

const BookingManager = () => {
  const dispatch = useAppDispatch();
  const allBookingsList = useAppSelector(state => state.booking.entities);
  const allHorsesList = useAppSelector(state => state.horse.entities);
  const bookingsByHorseList = useAppSelector(state => state.booking.bookingsByHorseId);

  const [calendarBookingList, setCalendarBookingList] = useState([] as []);
  const [horseBookingItem, setHorseBookingItem] = useState({} as IHorse);
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    dispatch(getBookings({}));
    dispatch(getHorses({}));
  }, []);

  useEffect(() => {
    dispatch(getBookingsByHorseId(horseBookingItem?.id?.toString()));
  }, [horseBookingItem]);

  useEffect(() => {
    if (horseBookingItem) {
      setCalendarBookingList(bookingsByHorseList);
    } else {
      setCalendarBookingList(allBookingsList);
    }
  }, [allBookingsList, bookingsByHorseList]);

  return (
    <div className="bookingManager">
      <div className="headerContainer">
        <h1 className="fsPrimaryHeading">Booking Planner</h1>
        <div className="dropdownContainer">
          <Dropdown isOpen={dropDownOpen} toggle={toggle}>
            <DropdownToggle caret>{horseBookingItem ? horseBookingItem?.fullName : 'All horses'}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  setCalendarBookingList(allBookingsList);
                  setHorseBookingItem({});
                }}
              >
                All horses
              </DropdownItem>
              {allHorsesList.map((item, index) => {
                return (
                  <DropdownItem onClick={() => setHorseBookingItem(item)} key={index}>
                    {item.fullName}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="contentContainer">
        <CalendarSidebar calendarBookingList={calendarBookingList} />
        <BookingCalendar calendarBookingList={calendarBookingList} />
      </div>
    </div>
  );
};

export default BookingManager;

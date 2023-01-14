import React, { useEffect } from 'react';
import './horse-page.scss';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/config/store';
import InformationBox from 'app/modules/horse-page/information-box/information-box';
import TopBox from 'app/modules/horse-page/top-box/top-box';
import BookingBox from 'app/modules/horse-page/booking-box/booking-box';
import { getHorse } from 'app/entities/horse/horse.reducer';

const HorsePage = props => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHorse(props.match.params.id));
  }, []);

  return (
    <div className="horsePage">
      <TopBox />
      <div className="boxContainer">
        <InformationBox />
        <BookingBox />
      </div>
      <Button style={{ marginTop: '30px' }} onClick={() => props.history.goBack()} color="info" data-cy="entityDetailsBackButton">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
      </Button>
    </div>
  );
};

export default HorsePage;

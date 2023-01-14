import React from 'react';
import './horse-owner-page.scss';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopBoxProfile from 'app/modules/horse-owner-page/top-box-profile/top-box-profile';
import HorseBox from 'app/modules/horse-owner-page/horse-box/horse-box';

const HorseOwnerPage = props => {

  return (
    <div className="horseOwnerPage">
      <TopBoxProfile horseOwnerId={props.match.params.id} />
      <div className="contentContainer">
        <HorseBox horseOwnerId={props.match.params.id} />
      </div>
      <Button style={{ marginTop: '30px' }} onClick={() => props.history.goBack()} color="info" data-cy="entityDetailsBackButton">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
      </Button>
    </div>
  );
};

export default HorseOwnerPage;

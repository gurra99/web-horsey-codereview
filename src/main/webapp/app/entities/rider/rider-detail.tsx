import React, { useEffect } from 'react';
import './rider.scss';
import { Button } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './rider.reducer';

export const RiderDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const riderEntity = useAppSelector(state => state.rider.entity);

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  return (
    <div className="riderDetail">
      <h2 className="header">Rider</h2>
      <div className="informationContainer">
        <div className="left">
          <div className="rowContainer">
            <p className="rowName">Social Security Number:</p>
            <p className="rowValue">{riderEntity.socialSecurityNumber}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Age:</p>
            <p className="rowValue">{riderEntity.age}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Weight:</p>
            <p className="rowValue">{riderEntity.weight}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Height:</p>
            <p className="rowValue">{riderEntity.height}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Description:</p>
            <p className="rowValue">{riderEntity.description}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Expected Week Riding:</p>
            <p className="rowValue">{riderEntity.expectedWeekRiding}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Expected Year Riding:</p>
            <p className="rowValue">{riderEntity.expectedYearRiding}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Level Experience:</p>
            <p className="rowValue">{riderEntity.levelExperience}</p>
          </div>
        </div>
        <div className="right">
          <div className="rowContainer">
            <p className="rowName">Years Experience:</p>
            <p className="rowValue">{riderEntity.yearsExperience}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Years Compitition:</p>
            <p className="rowValue">{riderEntity.yearsCompitition}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Mail Visible:</p>
            <p className="rowValue">{riderEntity.mailVisible ? 'true' : 'false'}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Phone Visible:</p>
            <p className="rowValue">{riderEntity.phoneVisible ? 'true' : 'false'}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Name Visible:</p>
            <p className="rowValue">{riderEntity.nameVisible ? 'true' : 'false'}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Gender:</p>
            <p className="rowValue">{riderEntity.gender}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Reference Name:</p>
            <p className="rowValue">{riderEntity.referenceName}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Reference Phone Number:</p>
            <p className="rowValue">{riderEntity.referencePhoneNumber}</p>
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <Button onClick={() => props.history.goBack()} color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rider/${riderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </div>
    </div>
  );
};

export default RiderDetail;

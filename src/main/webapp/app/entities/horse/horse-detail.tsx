import React, { useEffect } from 'react';
import './horse.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './horse.reducer';
import { getOwnerId, getRiderId } from 'app/modules/administration/user-management/user-management.reducer';
import {imageFileNameFormatter} from "app/shared/util/image-file-name-formatter";
import {getRiderByUserId} from "app/entities/rider/rider.reducer";
import {getOwnerByUserId} from "app/entities/horse-owner/horse-owner.reducer";

export const HorseDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const horseEntity = useAppSelector(state => state.horse.entity);
  const rider = useAppSelector(state => state.rider.entity);
  const horseOwner = useAppSelector(state => state.horseOwner.entity);
  const ownerId = useAppSelector(state => state.userManagement.ownerId);
  const riderId = useAppSelector(state => state.userManagement.riderId);
  const darkMode = (rider?.darkmode || horseOwner?.darkmode);

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    dispatch(getOwnerId(account.id));
    dispatch(getRiderId(account.id));
  }, []);

  useEffect(() => {
    dispatch(getRiderId(account.id));
    dispatch(getOwnerId(account.id));
  }, []);

  useEffect(() => {
    if(riderId) {
      dispatch(getRiderByUserId(account.id));
    }
    if(ownerId) {
      dispatch(getOwnerByUserId(account.id));
    }
  }, [riderId, ownerId]);

  return (
    <div className="horseDetail">
      <div className="imageContainer">
        <img
          className={darkMode ? "horseImage darkMode" : "horseImage"}
          src={ imageFileNameFormatter(horseEntity?.photo) }/>
        <div className="fullNameContainer">
          <h1 className="fsPrimaryHeading">Full Name:</h1>
          <p className="fsPrimaryHeading">{horseEntity.fullName}</p>
        </div>
      </div>

      <div className="informationContainer">
        <div className="left">
          {!(ownerId || riderId) && (
            <>
              <div className="rowContainer">
                <p className="rowName">ID:</p>
                <p className="rowValue">{horseEntity.id}</p>
              </div>
              <div className="rowContainer">
                <p className="rowName">Image:</p>
                <p className="rowValue">{horseEntity.image}</p>
              </div>
            </>
          )}
          <div className="rowContainer">
            <p className="rowName">Age:</p>
            <p className="rowValue">{horseEntity.age}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Height:</p>
            <p className="rowValue">{horseEntity.height}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Weight:</p>
            <p className="rowValue">{horseEntity.weight}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Breed:</p>
            <p className="rowValue">{horseEntity.breed}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Years Been Ridden:</p>
            <p className="rowValue">{horseEntity.yearsBeenRidden}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Color:</p>
            <p className="rowValue">{horseEntity.color}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Description:</p>
            <p className="rowValue">{horseEntity.description}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Appropriate Level Experience:</p>
            <p className="rowValue">{horseEntity.appropriateLevelExperience}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Rider Accepted Age:</p>
            <p className="rowValue">{horseEntity.riderAcceptedAge}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Rate:</p>
            <p className="rowValue">{horseEntity.rate}</p>
          </div>
        </div>
        <div className="right">
          <div className="rowContainer">
            <p className="rowName">Rider Accepted Weight:</p>
            <p className="rowValue">{horseEntity.riderAcceptedWeight}</p>
          </div>

          <div className="rowContainer">
            <p className="rowName">Rider Accepted Height:</p>
            <p className="rowValue">{horseEntity.riderAcceptedHeight}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Riding Equipment Included:</p>
            <p className="rowValue">{horseEntity.ridingEquipmentIncluded ? 'true' : 'false'}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Gender:</p>
            <p className="rowValue">{horseEntity.gender}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Temperament:</p>
            <p className="rowValue">{horseEntity.temperament}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Horse Type:</p>
            <p className="rowValue">{horseEntity.horseType}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Knowledge Before Ride:</p>
            <p className="rowValue">{horseEntity.knowledgeBeforeRide}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Insurance:</p>
            <p className="rowValue">{horseEntity.insurance ? 'true' : 'false'}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Address:</p>
            <p className="rowValue">{horseEntity.address ? horseEntity.address.id : ''}</p>
          </div>
          <div className="rowContainer">
            <p className="rowName">Fears:</p>
            <p className="rowValue">{horseEntity.fears ? horseEntity.fears.id : ''}</p>
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <Button onClick={() => props.history.goBack()} color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/horse/${horseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default HorseDetail;

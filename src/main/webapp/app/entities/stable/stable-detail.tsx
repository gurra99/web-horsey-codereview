import React, { useEffect } from 'react';
import './stable.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './stable.reducer';
import { getOwnerId, getRiderId } from 'app/modules/administration/user-management/user-management.reducer';

export const StableDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const stableEntity = useAppSelector(state => state.stable.entity);
  const account = useAppSelector(state => state.authentication.account);
  const ownerId = useAppSelector(state => state.userManagement.ownerId);
  const riderId = useAppSelector(state => state.userManagement.riderId);

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    dispatch(getOwnerId(account.id));
    dispatch(getRiderId(account.id));
  }, []);

  return (
    <div className="stableDetail">
      <Col md="8">
        <h2 data-cy="stableDetailsHeading">
          <Translate contentKey="horseyApp.stable.detail.title">Stable</Translate>
        </h2>
        <dl className="jh-entity-details">
          {!(riderId || ownerId) && (
            <>
              <dt>
                <span id="id">
                  <Translate contentKey="global.field.id">ID</Translate>
                </span>
              </dt>
              <dd>{stableEntity.id}</dd>
            </>
          )}
          <dt>
            <span id="photo">
              <Translate contentKey="horseyApp.stable.photo">Photo</Translate>
            </span>
          </dt>
          <dd>{stableEntity.photo}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="horseyApp.stable.name">Name</Translate>
            </span>
          </dt>
          <dd>{stableEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="horseyApp.stable.description">Description</Translate>
            </span>
          </dt>
          <dd>{stableEntity.description}</dd>
          <dt>
            <span id="buildYear">
              <Translate contentKey="horseyApp.stable.buildYear">Build Year</Translate>
            </span>
          </dt>
          <dd>{stableEntity.buildYear}</dd>
          <dt>
            <span id="ridingEquipment">
              <Translate contentKey="horseyApp.stable.ridingEquipment">Riding Equipment</Translate>
            </span>
          </dt>
          <dd>{stableEntity.ridingEquipment}</dd>
          <dt>
            <span id="showInPublic">
              <Translate contentKey="horseyApp.stable.showInPublic">Show In Public</Translate>
            </span>
          </dt>
          <dd>{stableEntity.showInPublic ? 'true' : 'false'}</dd>
          {!(riderId || ownerId) && (
            <>
              <dt>
                <Translate contentKey="horseyApp.stable.courtyard">Courtyard</Translate>
              </dt>
              <dd>{stableEntity.courtyard ? stableEntity.courtyard.id : ''}</dd>
            </>
          )}
        </dl>
        <div className="buttonContainer">
          <Button onClick={() => props.history.goBack()} color="info" data-cy="entityDetailsBackButton">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/stable/${stableEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </div>
      </Col>
    </div>
  );
};

export default StableDetail;

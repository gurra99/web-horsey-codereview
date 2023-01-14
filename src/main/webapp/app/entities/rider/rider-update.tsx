import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './rider.reducer';

export const RiderUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector(state => state.userManagement.users);
  const riderEntity = useAppSelector(state => state.rider.entity);
  const loading = useAppSelector(state => state.rider.loading);
  const updating = useAppSelector(state => state.rider.updating);
  const updateSuccess = useAppSelector(state => state.rider.updateSuccess);
  const ownerId = useAppSelector(state => state.userManagement.ownerId);
  const riderId = useAppSelector(state => state.userManagement.riderId);

  const handleClose = () => {
    props.history.push('/rider' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...riderEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...riderEntity,
          user: riderEntity?.user?.id,
        };

  return (
    <div className="riderUpdate">
      <Row>
        <Col md="8">
          <h2 className="title" id="horseyApp.rider.home.createOrEditLabel" data-cy="RiderCreateUpdateHeading">
            <Translate contentKey="horseyApp.rider.home.createOrEditLabel">Create or edit a Rider</Translate>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && riderId && ownerId ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="rider-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('horseyApp.rider.photo')}
                id="rider-photo"
                name="photo"
                data-cy="photo"
                type="text"
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.phoneNumber')}
                id="rider-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.socialSecurityNumber')}
                id="rider-socialSecurityNumber"
                name="socialSecurityNumber"
                data-cy="socialSecurityNumber"
                type="text"
                validate={{
                  max: { value: 3000000000000, message: translate('entity.validation.max', { max: 3000000000000 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.age')}
                id="rider-age"
                name="age"
                data-cy="age"
                type="text"
                validate={{
                  max: { value: 150, message: translate('entity.validation.max', { max: 150 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.weight')}
                id="rider-weight"
                name="weight"
                data-cy="weight"
                type="text"
                validate={{
                  max: { value: 99999, message: translate('entity.validation.max', { max: 99999 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.height')}
                id="rider-height"
                name="height"
                data-cy="height"
                type="text"
                validate={{
                  max: { value: 99999, message: translate('entity.validation.max', { max: 99999 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.description')}
                id="rider-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 1500, message: translate('entity.validation.maxlength', { max: 1500 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.gender')}
                id="rider-gender"
                name="gender"
                data-cy="gender"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.expectedWeekRiding')}
                id="rider-expectedWeekRiding"
                name="expectedWeekRiding"
                data-cy="expectedWeekRiding"
                type="text"
                validate={{
                  max: { value: 99, message: translate('entity.validation.max', { max: 99 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.searchLocationLatitude')}
                id="rider-searchLocationLatitude"
                name="searchLocationLatitude"
                data-cy="searchLocationLatitude"
                type="text"
                validate={{
                  max: { value: 91000000000000000, message: translate('entity.validation.max', { max: 91000000000000000 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.searchLocationLongitude')}
                id="rider-searchLocationLongitude"
                name="searchLocationLongitude"
                data-cy="searchLocationLongitude"
                type="text"
                validate={{
                  max: { value: 91000000000000000, message: translate('entity.validation.max', { max: 91000000000000000 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.levelExperience')}
                id="rider-levelExperience"
                name="levelExperience"
                data-cy="levelExperience"
                type="range"
                max="3"
                validate={{
                  max: { value: 20, message: translate('entity.validation.max', { max: 20 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.yearsExperience')}
                id="rider-yearsExperience"
                name="yearsExperience"
                data-cy="yearsExperience"
                type="text"
                validate={{
                  max: { value: 150, message: translate('entity.validation.max', { max: 150 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.yearsCompitition')}
                id="rider-yearsCompitition"
                name="yearsCompitition"
                data-cy="yearsCompitition"
                type="text"
                validate={{
                  max: { value: 99, message: translate('entity.validation.max', { max: 99 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
                <ValidatedField
                  label={translate('horseyApp.rider.darkmode')}
                  id="rider-darkmode"
                  name="darkmode"
                  data-cy="darkmode"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.rider.mailVisible')}
                  id="rider-mailVisible"
                  name="mailVisible"
                  data-cy="mailVisible"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.rider.phoneVisible')}
                  id="rider-phoneVisible"
                  name="phoneVisible"
                  data-cy="phoneVisible"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.rider.nameVisible')}
                  id="rider-nameVisible"
                  name="nameVisible"
                  data-cy="nameVisible"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.rider.showInPublic')}
                  id="rider-showInPublic"
                  name="showInPublic"
                  data-cy="showInPublic"
                  check
                  type="checkbox"
                />

              <ValidatedField
                label={translate('horseyApp.rider.referenceName')}
                id="rider-referenceName"
                name="referenceName"
                data-cy="referenceName"
                type="text"
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.rider.referencePhoneNumber')}
                id="rider-referencePhoneNumber"
                name="referencePhoneNumber"
                data-cy="referencePhoneNumber"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                hidden={!!(riderId || ownerId)}
                id="rider-user"
                name="user"
                data-cy="user"
                label={translate('horseyApp.rider.user')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <div className="buttonContainer">
                <Button tag={Link} onClick={() => props.history.goBack()} id="cancel-save" data-cy="entityCreateCancelButton" color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  onClick={() => props.history.goBack()}
                  color="primary"
                  id="save-entity"
                  data-cy="entityCreateSaveButton"
                  type="submit"
                  disabled={updating}
                >
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </div>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default RiderUpdate;

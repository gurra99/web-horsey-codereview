import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getBookings } from 'app/entities/booking/booking.reducer';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { getEntities as getFears } from 'app/entities/fears/fears.reducer';
import { getEntities as getHorseOwners } from 'app/entities/horse-owner/horse-owner.reducer';
import { getEntities as getBoxes } from 'app/entities/box/box.reducer';
import { getEntity, updateEntity, reset, createHorse } from './horse.reducer';
import { getOwnerId, getRiderId } from 'app/modules/administration/user-management/user-management.reducer';

export const HorseUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const addresses = useAppSelector(state => state.address.entities);
  const fears = useAppSelector(state => state.fears.entities);
  const horseOwners = useAppSelector(state => state.horseOwner.entities);
  const boxes = useAppSelector(state => state.box.entities);
  const horseEntity = useAppSelector(state => state.horse.entity);
  const loading = useAppSelector(state => state.horse.loading);
  const updating = useAppSelector(state => state.horse.updating);
  const updateSuccess = useAppSelector(state => state.horse.updateSuccess);
  const account = useAppSelector(state => state.authentication.account);
  const ownerId = useAppSelector(state => state.userManagement.ownerId);
  const riderId = useAppSelector(state => state.userManagement.riderId);

  const handleClose = () => {
    props.history.push('/horse' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAddresses({}));
    dispatch(getFears({}));
    dispatch(getBookings({}));
    dispatch(getHorseOwners({}));
    dispatch(getBoxes({}));
    dispatch(getOwnerId(account.id));
    dispatch(getRiderId(account.id));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const horse = {
      ...horseEntity,
      ...values,
      address: addresses.find(it => it.id.toString() === values.address.toString()),
      fears: fears.find(it => it.id.toString() === values.fears.toString()),
      horseOwner: horseOwners.find(it => it.id.toString() === values.horseOwner.toString()),
      box: boxes.find(it => it.id.toString() === values.box.toString()),
    };

    if (isNew) {
      horse.photo = 1;
      dispatch(createHorse({ horse, ownerId }));
    } else {
      dispatch(updateEntity(horse));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...horseEntity,
          address: horseEntity?.address?.id,
          fears: horseEntity?.fears?.id,
          horseOwner: horseEntity?.horseOwner?.id,
          box: horseEntity?.box?.id,
        };

  return (
    <div className="horseUpdate">
      <Row>
        <Col md="8">
          <h2 className="title" id="horseyApp.horse.home.createOrEditLabel" data-cy="HorseCreateUpdateHeading">
            <Translate contentKey="horseyApp.horse.home.createOrEditLabel">Create or edit a Horse</Translate>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  hidden={!!(riderId || ownerId)}
                  name="id"
                  required
                  readOnly
                  id="horse-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('horseyApp.horse.fullName')}
                id="horse-fullName"
                name="fullName"
                data-cy="fullName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.photo')}
                id="horse-photo"
                name="photo"
                data-cy="photo"
                type="text"
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.phoneNumber')}
                id="horse-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.email')}
                id="horse-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.age')}
                id="horse-age"
                name="age"
                data-cy="age"
                type="text"
                validate={{
                  max: { value: 150, message: translate('entity.validation.max', { max: 150 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.height')}
                id="horse-height"
                name="height"
                data-cy="height"
                type="text"
                validate={{
                  max: { value: 99999, message: translate('entity.validation.max', { max: 99999 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.weight')}
                id="horse-weight"
                name="weight"
                data-cy="weight"
                type="text"
                validate={{
                  max: { value: 99999, message: translate('entity.validation.max', { max: 99999 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.breed')}
                id="horse-breed"
                name="breed"
                data-cy="breed"
                type="text"
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.yearsBeenRidden')}
                id="horse-yearsBeenRidden"
                name="yearsBeenRidden"
                data-cy="yearsBeenRidden"
                type="text"
                validate={{
                  max: { value: 99, message: translate('entity.validation.max', { max: 99 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.color')}
                id="horse-color"
                name="color"
                data-cy="color"
                type="text"
                validate={{
                  maxLength: { value: 60, message: translate('entity.validation.maxlength', { max: 60 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.description')}
                id="horse-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 1500, message: translate('entity.validation.maxlength', { max: 1500 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.appropriateLevelExperience')}
                id="horse-appropriateLevelExperience"
                name="appropriateLevelExperience"
                data-cy="appropriateLevelExperience"
                type="text"
                validate={{
                  max: { value: 20, message: translate('entity.validation.max', { max: 20 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.riderAcceptedAge')}
                id="horse-riderAcceptedAge"
                name="riderAcceptedAge"
                data-cy="riderAcceptedAge"
                type="text"
                validate={{
                  max: { value: 99, message: translate('entity.validation.max', { max: 99 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.riderAcceptedWeight')}
                id="horse-riderAcceptedWeight"
                name="riderAcceptedWeight"
                data-cy="riderAcceptedWeight"
                type="text"
                validate={{
                  max: { value: 99999, message: translate('entity.validation.max', { max: 99999 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.riderAcceptedHeight')}
                id="horse-riderAcceptedHeight"
                name="riderAcceptedHeight"
                data-cy="riderAcceptedHeight"
                type="text"
                validate={{
                  max: { value: 99999, message: translate('entity.validation.max', { max: 99999 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.rate')}
                id="horse-rate"
                name="rate"
                data-cy="rate"
                type="text"
                validate={{
                  max: { value: 9000, message: translate('entity.validation.max', { max: 9000 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.gender')}
                id="horse-gender"
                name="gender"
                data-cy="gender"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.temperament')}
                id="horse-temperament"
                name="temperament"
                data-cy="temperament"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.horseType')}
                id="horse-horseType"
                name="horseType"
                data-cy="horseType"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.horse.knowledgeBeforeRide')}
                id="horse-knowledgeBeforeRide"
                name="knowledgeBeforeRide"
                data-cy="knowledgeBeforeRide"
                type="text"
                validate={{
                  maxLength: { value: 999, message: translate('entity.validation.maxlength', { max: 999 }) },
                }}
              />
              <div className="checkboxContainer">
                <ValidatedField
                  label={translate('horseyApp.horse.insurance')}
                  id="horse-insurance"
                  name="insurance"
                  data-cy="insurance"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.horse.showOwner')}
                  id="horse-showOwner"
                  name="showOwner"
                  data-cy="showOwner"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.horse.showInPublic')}
                  id="horse-showInPublic"
                  name="showInPublic"
                  data-cy="showInPublic"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.horse.showPicturesInBank')}
                  id="horse-showPicturesInBank"
                  name="showPicturesInBank"
                  data-cy="showPicturesInBank"
                  check
                  type="checkbox"
                />
                <ValidatedField
                  label={translate('horseyApp.horse.ridingEquipmentIncluded')}
                  id="horse-ridingEquipmentIncluded"
                  name="ridingEquipmentIncluded"
                  data-cy="ridingEquipmentIncluded"
                  check
                  type="checkbox"
                />
              </div>
              <ValidatedField
                hidden={!!(riderId || ownerId)}
                id="horse-address"
                name="address"
                data-cy="address"
                label={translate('horseyApp.horse.address')}
                type="select"
              >
                <option value="" key="0" />
                {addresses
                  ? addresses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                hidden={!!(riderId || ownerId)}
                id="horse-fears"
                name="fears"
                data-cy="fears"
                label={translate('horseyApp.horse.fears')}
                type="select"
              >
                <option value="" key="0" />
                {fears
                  ? fears.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="horse-horseOwner"
                name="horseOwner"
                data-cy="horseOwner"
                label={translate('horseyApp.horse.horseOwner')}
                type="select"
                hidden={!!(ownerId || riderId)}
              >
                <option value="" key="0" />
                {horseOwners
                  ? horseOwners.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                hidden={!!(ownerId || riderId)}
                id="horse-box"
                name="box"
                data-cy="box"
                label={translate('horseyApp.horse.box')}
                type="select"
              >
                <option value="" key="0" />
                {boxes
                  ? boxes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <div className="buttonContainer">
                <Button onClick={() => props.history.goBack()} id="cancel-save" data-cy="entityCreateCancelButton" color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
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

export default HorseUpdate;

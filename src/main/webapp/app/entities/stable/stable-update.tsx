import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCourtyards } from 'app/entities/courtyard/courtyard.reducer';
import { getEntity, updateEntity, createEntity, reset } from './stable.reducer';
import { getOwnerId, getRiderId } from 'app/modules/administration/user-management/user-management.reducer';

export const StableUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const courtyards = useAppSelector(state => state.courtyard.entities);
  const stableEntity = useAppSelector(state => state.stable.entity);
  const loading = useAppSelector(state => state.stable.loading);
  const updating = useAppSelector(state => state.stable.updating);
  const updateSuccess = useAppSelector(state => state.stable.updateSuccess);
  const ownerId = useAppSelector(state => state.userManagement.ownerId);
  const account = useAppSelector(state => state.authentication.account);
  const riderId = useAppSelector(state => state.userManagement.ownerId);

  const handleClose = () => {
    props.history.push('/stable' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCourtyards({}));
    dispatch(getOwnerId(account.id));
    dispatch(getRiderId(account.id));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...stableEntity,
      ...values,
      courtyard: courtyards.find(it => it.id.toString() === values.courtyard.toString()),
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
          ...stableEntity,
          courtyard: stableEntity?.courtyard?.id,
        };

  return (
    <div className="stableUpdate">
      <Row>
        <Col md="8">
          <h2 className="title" id="horseyApp.stable.home.createOrEditLabel" data-cy="StableCreateUpdateHeading">
            <Translate contentKey="horseyApp.stable.home.createOrEditLabel">Create or edit a Stable</Translate>
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
                  id="stable-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('horseyApp.stable.name')}
                id="stable-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.stable.photo')}
                id="stable-photo"
                name="photo"
                data-cy="photo"
                type="text"
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.stable.description')}
                id="stable-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 999, message: translate('entity.validation.maxlength', { max: 999 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.stable.buildYear')}
                id="stable-buildYear"
                name="buildYear"
                data-cy="buildYear"
                type="text"
                validate={{
                  max: { value: 9000, message: translate('entity.validation.max', { max: 9000 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('horseyApp.stable.ridingEquipment')}
                id="stable-ridingEquipment"
                name="ridingEquipment"
                data-cy="ridingEquipment"
                type="text"
                validate={{
                  maxLength: { value: 999, message: translate('entity.validation.maxlength', { max: 999 }) },
                }}
              />
              <ValidatedField
                label={translate('horseyApp.stable.showInPublic')}
                id="stable-showInPublic"
                name="showInPublic"
                data-cy="showInPublic"
                check
                type="checkbox"
              />
              <ValidatedField
                id="stable-courtyard"
                name="courtyard"
                data-cy="courtyard"
                label={translate('horseyApp.stable.courtyard')}
                type="select"
                required
              >
                <option value="" key="0" />
                {courtyards
                  ? courtyards.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              {/*     <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>*/}
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

export default StableUpdate;

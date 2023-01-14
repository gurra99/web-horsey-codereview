import React, { useEffect } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/courtyard/courtyard.reducer';

export interface IHeaderProps {
  isAdmin: boolean;
}

const EntitiesMenu = (props: IHeaderProps) => {
  const courtyard = useAppSelector(state => state.courtyard.entities);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getEntities({
        page: null,
        size: null,
        sort: null,
      })
    );
  }, []);

  return (
    <>
      {/* prettier-ignore */}

      <MenuItem icon="asterisk" to="/horse">
        <Translate contentKey="global.menu.entities.horse" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/booking">
        <Translate contentKey="global.menu.entities.booking" />
      </MenuItem>

      <MenuItem icon="asterisk" to="/courtyard">
        <Translate contentKey="global.menu.entities.courtyard" />
      </MenuItem>

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/rider">
          <Translate contentKey="global.menu.entities.rider" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/horse-owner">
          <Translate contentKey="global.menu.entities.horseOwner" />
        </MenuItem>
      )}

      {courtyard.length > 0 && (
        <MenuItem icon="asterisk" to="/stable">
          <Translate contentKey="global.menu.entities.stable" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/box">
          <Translate contentKey="global.menu.entities.box" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/address">
          <Translate contentKey="global.menu.entities.address" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/riding-wishes">
          <Translate contentKey="global.menu.entities.ridingWishes" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/fears">
          <Translate contentKey="global.menu.entities.fears" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/event-type">
          <Translate contentKey="global.menu.entities.eventType" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/activity-type">
          <Translate contentKey="global.menu.entities.activityType" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/competition-type">
          <Translate contentKey="global.menu.entities.competitionType" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/lesson-type">
          <Translate contentKey="global.menu.entities.lessonType" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/image">
          <Translate contentKey="global.menu.entities.image" />
        </MenuItem>
      )}
      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/city">
          <Translate contentKey="global.menu.entities.city" />
        </MenuItem>
      )}

      {props.isAdmin && (
        <MenuItem icon="asterisk" to="/breed">
          <Translate contentKey="global.menu.entities.breed" />
        </MenuItem>
      )}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;

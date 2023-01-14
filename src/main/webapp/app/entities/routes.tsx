import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Rider from './rider';
import HorseOwner from './horse-owner';
import Courtyard from './courtyard';
import Horse from './horse';
import Booking from './booking';
import Stable from './stable';
import Box from './box';
import Address from './address';
import RidingWishes from './riding-wishes';
import Fears from './fears';
import EventType from './event-type';
import ActivityType from './activity-type';
import CompetitionType from './competition-type';
import LessonType from './lesson-type';
import Image from './image';
import City from './city';
import Breed from './breed';

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}rider`} component={Rider} />
        <ErrorBoundaryRoute path={`${match.url}horse-owner`} component={HorseOwner} />
        <ErrorBoundaryRoute path={`${match.url}courtyard`} component={Courtyard} />
        <ErrorBoundaryRoute path={`${match.url}horse`} component={Horse} />
        <ErrorBoundaryRoute path={`${match.url}booking`} component={Booking} />
        <ErrorBoundaryRoute path={`${match.url}stable`} component={Stable} />
        <ErrorBoundaryRoute path={`${match.url}box`} component={Box} />
        <ErrorBoundaryRoute path={`${match.url}address`} component={Address} />
        <ErrorBoundaryRoute path={`${match.url}riding-wishes`} component={RidingWishes} />
        <ErrorBoundaryRoute path={`${match.url}fears`} component={Fears} />
        <ErrorBoundaryRoute path={`${match.url}event-type`} component={EventType} />
        <ErrorBoundaryRoute path={`${match.url}activity-type`} component={ActivityType} />
        <ErrorBoundaryRoute path={`${match.url}competition-type`} component={CompetitionType} />
        <ErrorBoundaryRoute path={`${match.url}lesson-type`} component={LessonType} />
        <ErrorBoundaryRoute path={`${match.url}image`} component={Image} />
        <ErrorBoundaryRoute path={`${match.url}city`} component={City} />
        <ErrorBoundaryRoute path={`${match.url}breed`} component={Breed} />
      </Switch>
    </div>
  );
};

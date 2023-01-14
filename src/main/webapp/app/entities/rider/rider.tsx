import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './rider.reducer';

export const Rider = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const riderList = useAppSelector(state => state.rider.entities);
  const loading = useAppSelector(state => state.rider.loading);
  const totalItems = useAppSelector(state => state.rider.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div className="rider">
      <h1 className="fsPrimaryHeading" data-cy="RiderHeading">
      <Translate contentKey="horseyApp.rider.home.title">Riders</Translate>
        <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
          <FontAwesomeIcon icon="sync" spin={loading} />{' '}
          <Translate contentKey="horseyApp.rider.home.refreshListLabel">Refresh List</Translate>
        </Button>
        <Link to="/rider/new" className="btn btn-primary" data-cy="entityCreateButton">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="horseyApp.rider.home.createLabel">Create new Rider</Translate>
        </Link>
      </h1>
      <div className="tableResponsive">
        {riderList && riderList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="horseyApp.rider.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photo')}>
                  <Translate contentKey="horseyApp.rider.photo">Photo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneNumber')}>
                  <Translate contentKey="horseyApp.rider.phoneNumber">Phone Number</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('socialSecurityNumber')}>
                  <Translate contentKey="horseyApp.rider.socialSecurityNumber">Social Security Number</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('age')}>
                  <Translate contentKey="horseyApp.rider.age">Age</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('weight')}>
                  <Translate contentKey="horseyApp.rider.weight">Weight</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('height')}>
                  <Translate contentKey="horseyApp.rider.height">Height</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="horseyApp.rider.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  <Translate contentKey="horseyApp.rider.gender">Gender</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('expectedWeekRiding')}>
                  <Translate contentKey="horseyApp.rider.expectedWeekRiding">Expected Week Riding</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('searchLocationLatitude')}>
                  <Translate contentKey="horseyApp.rider.searchLocationLatitude">Search Location Latitude</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('searchLocationLongitude')}>
                  <Translate contentKey="horseyApp.rider.searchLocationLongitude">Search Location Longitude</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('levelExperience')}>
                  <Translate contentKey="horseyApp.rider.levelExperience">Level Experience</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('yearsExperience')}>
                  <Translate contentKey="horseyApp.rider.yearsExperience">Years Experience</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('yearsCompitition')}>
                  <Translate contentKey="horseyApp.rider.yearsCompitition">Years Compitition</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mailVisible')}>
                  <Translate contentKey="horseyApp.rider.mailVisible">Mail Visible</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneVisible')}>
                  <Translate contentKey="horseyApp.rider.phoneVisible">Phone Visible</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nameVisible')}>
                  <Translate contentKey="horseyApp.rider.nameVisible">Name Visible</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('referenceName')}>
                  <Translate contentKey="horseyApp.rider.referenceName">Reference Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('referencePhoneNumber')}>
                  <Translate contentKey="horseyApp.rider.referencePhoneNumber">Reference Phone Number</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('showInPublic')}>
                  <Translate contentKey="horseyApp.rider.showInPublic">Show In Public</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('darkmode')}>
                  <Translate contentKey="horseyApp.rider.darkmode">Darkmode</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="horseyApp.rider.user">User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {riderList.map((rider, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/rider/${rider.id}`} color="link" size="sm">
                      {rider.id}
                    </Button>
                  </td>
                  <td>{rider.photo}</td>
                  <td>{rider.phoneNumber}</td>
                  <td>{rider.socialSecurityNumber}</td>
                  <td>{rider.age}</td>
                  <td>{rider.weight}</td>
                  <td>{rider.height}</td>
                  <td>{rider.description}</td>
                  <td>{rider.gender}</td>
                  <td>{rider.expectedWeekRiding}</td>
                  <td>{rider.searchLocationLatitude}</td>
                  <td>{rider.searchLocationLongitude}</td>
                  <td>{rider.levelExperience}</td>
                  <td>{rider.yearsExperience}</td>
                  <td>{rider.yearsCompitition}</td>
                  <td>{rider.mailVisible ? 'true' : 'false'}</td>
                  <td>{rider.phoneVisible ? 'true' : 'false'}</td>
                  <td>{rider.nameVisible ? 'true' : 'false'}</td>
                  <td>{rider.referenceName}</td>
                  <td>{rider.referencePhoneNumber}</td>
                  <td>{rider.showInPublic ? 'true' : 'false'}</td>
                  <td>{rider.darkmode ? 'true' : 'false'}</td>
                  <td>{rider.user ? rider.user.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/rider/${rider.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/rider/${rider.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/rider/${rider.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="horseyApp.rider.home.notFound">No Riders found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={riderList && riderList.length > 0 ? '' : 'd-none'}>
          <div>
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div>
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Rider;

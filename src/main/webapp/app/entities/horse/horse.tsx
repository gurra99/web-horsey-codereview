import React, { useState, useEffect } from 'react';
import './horse.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './horse.reducer';

export const Horse = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const horseList = useAppSelector(state => state.horse.entities);
  const loading = useAppSelector(state => state.horse.loading);
  const totalItems = useAppSelector(state => state.horse.totalItems);

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
    <div className="horse">
      <h1 className="fsPrimaryHeading" data-cy="HorseHeading">
      <Translate contentKey="horseyApp.horse.home.title">Horses</Translate>
        <div>
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="horseyApp.horse.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/horse/new" className="btn btn-primary" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="horseyApp.horse.home.createLabel">Create new Horse</Translate>
          </Link>
        </div>
      </h1>
      <div className="table-responsive">
        {horseList && horseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="horseyApp.horse.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photo')}>
                  <Translate contentKey="horseyApp.horse.photo">Photo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fullName')}>
                  <Translate contentKey="horseyApp.horse.fullName">Full Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneNumber')}>
                  <Translate contentKey="horseyApp.horse.phoneNumber">Phone Number</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="horseyApp.horse.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('age')}>
                  <Translate contentKey="horseyApp.horse.age">Age</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('height')}>
                  <Translate contentKey="horseyApp.horse.height">Height</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('weight')}>
                  <Translate contentKey="horseyApp.horse.weight">Weight</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('breed')}>
                  <Translate contentKey="horseyApp.horse.breed">Breed</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('yearsBeenRidden')}>
                  <Translate contentKey="horseyApp.horse.yearsBeenRidden">Years Been Ridden</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('color')}>
                  <Translate contentKey="horseyApp.horse.color">Color</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="horseyApp.horse.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('appropriateLevelExperience')}>
                  <Translate contentKey="horseyApp.horse.appropriateLevelExperience">Appropriate Level Experience</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('riderAcceptedAge')}>
                  <Translate contentKey="horseyApp.horse.riderAcceptedAge">Rider Accepted Age</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('riderAcceptedWeight')}>
                  <Translate contentKey="horseyApp.horse.riderAcceptedWeight">Rider Accepted Weight</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('riderAcceptedHeight')}>
                  <Translate contentKey="horseyApp.horse.riderAcceptedHeight">Rider Accepted Height</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('rate')}>
                  <Translate contentKey="horseyApp.horse.rate">Rate</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('ridingEquipmentIncluded')}>
                  <Translate contentKey="horseyApp.horse.ridingEquipmentIncluded">Riding Equipment Included</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  <Translate contentKey="horseyApp.horse.gender">Gender</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('temperament')}>
                  <Translate contentKey="horseyApp.horse.temperament">Temperament</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('horseType')}>
                  <Translate contentKey="horseyApp.horse.horseType">Horse Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('knowledgeBeforeRide')}>
                  <Translate contentKey="horseyApp.horse.knowledgeBeforeRide">Knowledge Before Ride</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('insurance')}>
                  <Translate contentKey="horseyApp.horse.insurance">Insurance</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('showOwner')}>
                  <Translate contentKey="horseyApp.horse.showOwner">Show Owner</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('showInPublic')}>
                  <Translate contentKey="horseyApp.horse.showInPublic">Show In Public</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('showPicturesInBank')}>
                  <Translate contentKey="horseyApp.horse.showPicturesInBank">Show Pictures In Bank</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="horseyApp.horse.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="horseyApp.horse.fears">Fears</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="horseyApp.horse.horseOwner">Horse Owner</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="horseyApp.horse.box">Box</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {horseList.map((horse, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/horse/${horse.id}`} color="link" size="sm">
                      {horse.id}
                    </Button>
                  </td>
                  <td>{horse.photo}</td>
                  <td>{horse.fullName}</td>
                  <td>{horse.phoneNumber}</td>
                  <td>{horse.email}</td>
                  <td>{horse.age}</td>
                  <td>{horse.height}</td>
                  <td>{horse.weight}</td>
                  <td>{horse.breed}</td>
                  <td>{horse.yearsBeenRidden}</td>
                  <td>{horse.color}</td>
                  <td>{horse.description}</td>
                  <td>{horse.appropriateLevelExperience}</td>
                  <td>{horse.riderAcceptedAge}</td>
                  <td>{horse.riderAcceptedWeight}</td>
                  <td>{horse.riderAcceptedHeight}</td>
                  <td>{horse.rate}</td>
                  <td>{horse.ridingEquipmentIncluded ? 'true' : 'false'}</td>
                  <td>{horse.gender}</td>
                  <td>{horse.temperament}</td>
                  <td>{horse.horseType}</td>
                  <td>{horse.knowledgeBeforeRide}</td>
                  <td>{horse.insurance ? 'true' : 'false'}</td>
                  <td>{horse.showOwner ? 'true' : 'false'}</td>
                  <td>{horse.showInPublic ? 'true' : 'false'}</td>
                  <td>{horse.showPicturesInBank ? 'true' : 'false'}</td>
                  <td>{horse.address ? <Link to={`/address/${horse.address.id}`}>{horse.address.id}</Link> : ''}</td>
                  <td>{horse.fears ? <Link to={`/fears/${horse.fears.id}`}>{horse.fears.id}</Link> : ''}</td>
                  <td>{horse.horseOwner ? <Link to={`/horse-owner/${horse.horseOwner.id}`}>{horse.horseOwner.id}</Link> : ''}</td>
                  <td>{horse.box ? <Link to={`/box/${horse.box.id}`}>{horse.box.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/horse/${horse.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/horse/${horse.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`/horse/${horse.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="horseyApp.horse.home.notFound">No Horses found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={horseList && horseList.length > 0 ? '' : 'd-none'}>
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

export default Horse;

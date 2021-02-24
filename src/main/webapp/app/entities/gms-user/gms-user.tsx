import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './gms-user.reducer';
import { IGMSUser } from 'app/shared/model/gms-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGMSUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const GMSUser = (props: IGMSUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { gMSUserList, match, loading } = props;
  return (
    <div>
      <h2 id="gms-user-heading">
        <Translate contentKey="gmsApp.gMSUser.home.title">GMS Users</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gmsApp.gMSUser.home.createLabel">Create new GMS User</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {gMSUserList && gMSUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.gMSUser.userID">User ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.gMSUser.firstNames">First Names</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.gMSUser.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.gMSUser.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.gMSUser.emailAdress">Email Adress</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.gMSUser.telephoneNumber">Telephone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.gMSUser.dateOfBirth">Date Of Birth</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {gMSUserList.map((gMSUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${gMSUser.id}`} color="link" size="sm">
                      {gMSUser.id}
                    </Button>
                  </td>
                  <td>{gMSUser.userID}</td>
                  <td>{gMSUser.firstNames}</td>
                  <td>{gMSUser.lastName}</td>
                  <td>
                    <Translate contentKey={`gmsApp.Gender.${gMSUser.gender}`} />
                  </td>
                  <td>{gMSUser.emailAdress}</td>
                  <td>{gMSUser.telephoneNumber}</td>
                  <td>{gMSUser.dateOfBirth ? <TextFormat type="date" value={gMSUser.dateOfBirth} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${gMSUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gMSUser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gMSUser.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gmsApp.gMSUser.home.notFound">No GMS Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ gMSUser }: IRootState) => ({
  gMSUserList: gMSUser.entities,
  loading: gMSUser.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GMSUser);

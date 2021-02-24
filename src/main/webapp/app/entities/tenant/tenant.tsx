import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tenant.reducer';
import { ITenant } from 'app/shared/model/tenant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITenantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Tenant = (props: ITenantProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tenantList, match, loading } = props;
  return (
    <div>
      <h2 id="tenant-heading">
        <Translate contentKey="gmsApp.tenant.home.title">Tenants</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gmsApp.tenant.home.createLabel">Create new Tenant</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tenantList && tenantList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.tenant.residentialProperty">Residential Property</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tenantList.map((tenant, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tenant.id}`} color="link" size="sm">
                      {tenant.id}
                    </Button>
                  </td>
                  <td>{tenant.userID}</td>
                  <td>{tenant.userID ? <Link to={`gms-user/${tenant.userID.id}`}>{tenant.userID.id}</Link> : ''}</td>
                  <td>{tenant.userID ? <Link to={`residential-property/${tenant.userID.id}`}>{tenant.userID.id}</Link> : ''}</td>
                  <td>
                    {tenant.residentialProperty ? (
                      <Link to={`residential-property/${tenant.residentialProperty.id}`}>{tenant.residentialProperty.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tenant.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenant.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tenant.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gmsApp.tenant.home.notFound">No Tenants found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tenant }: IRootState) => ({
  tenantList: tenant.entities,
  loading: tenant.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tenant);

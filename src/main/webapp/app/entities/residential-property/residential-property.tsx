import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './residential-property.reducer';
import { IResidentialProperty } from 'app/shared/model/residential-property.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResidentialPropertyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ResidentialProperty = (props: IResidentialPropertyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { residentialPropertyList, match, loading } = props;
  return (
    <div>
      <h2 id="residential-property-heading">
        <Translate contentKey="gmsApp.residentialProperty.home.title">Residential Properties</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gmsApp.residentialProperty.home.createLabel">Create new Residential Property</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {residentialPropertyList && residentialPropertyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.residentialPropertyID">Residential Property ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.ownerID">Owner ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.houseNumber">House Number</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.block">Block</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.apartmentName">Apartment Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.streetName">Street Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.country">Country</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.residentialProperty.ownerID">Owner ID</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {residentialPropertyList.map((residentialProperty, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${residentialProperty.id}`} color="link" size="sm">
                      {residentialProperty.id}
                    </Button>
                  </td>
                  <td>{residentialProperty.residentialPropertyID}</td>
                  <td>
                    <Translate contentKey={`gmsApp.ResidentialPropertyType.${residentialProperty.type}`} />
                  </td>
                  <td>{residentialProperty.ownerID}</td>
                  <td>{residentialProperty.houseNumber}</td>
                  <td>{residentialProperty.block}</td>
                  <td>{residentialProperty.apartmentName}</td>
                  <td>{residentialProperty.streetName}</td>
                  <td>{residentialProperty.city}</td>
                  <td>
                    <Translate contentKey={`gmsApp.Countries.${residentialProperty.country}`} />
                  </td>
                  <td>
                    {residentialProperty.ownerIDS
                      ? residentialProperty.ownerIDS.map((val, j) => (
                          <span key={j}>
                            <Link to={`owner/${val.id}`}>{val.id}</Link>
                            {j === residentialProperty.ownerIDS.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${residentialProperty.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${residentialProperty.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${residentialProperty.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gmsApp.residentialProperty.home.notFound">No Residential Properties found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ residentialProperty }: IRootState) => ({
  residentialPropertyList: residentialProperty.entities,
  loading: residentialProperty.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResidentialProperty);

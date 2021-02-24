import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invite-data.reducer';
import { IInviteData } from 'app/shared/model/invite-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInviteDataProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InviteData = (props: IInviteDataProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { inviteDataList, match, loading } = props;
  return (
    <div>
      <h2 id="invite-data-heading">
        <Translate contentKey="gmsApp.inviteData.home.title">Invite Data</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gmsApp.inviteData.home.createLabel">Create new Invite Data</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {inviteDataList && inviteDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.stop">Stop</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.propertyType">Property Type</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.houseNumber">House Number</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.block">Block</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.apartmentName">Apartment Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.streetName">Street Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.stop">Stop</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.houseNumber">House Number</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.block">Block</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.apartmentName">Apartment Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.inviteData.streetName">Street Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {inviteDataList.map((inviteData, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${inviteData.id}`} color="link" size="sm">
                      {inviteData.id}
                    </Button>
                  </td>
                  <td>{inviteData.start ? <TextFormat type="date" value={inviteData.start} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{inviteData.stop ? <TextFormat type="date" value={inviteData.stop} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`gmsApp.ResidentialPropertyType.${inviteData.propertyType}`} />
                  </td>
                  <td>{inviteData.houseNumber}</td>
                  <td>{inviteData.block}</td>
                  <td>{inviteData.apartmentName}</td>
                  <td>{inviteData.streetName}</td>
                  <td>{inviteData.start ? <Link to={`invite/${inviteData.start.id}`}>{inviteData.start.id}</Link> : ''}</td>
                  <td>{inviteData.stop ? <Link to={`invite/${inviteData.stop.id}`}>{inviteData.stop.id}</Link> : ''}</td>
                  <td>
                    {inviteData.houseNumber ? <Link to={`invite/${inviteData.houseNumber.id}`}>{inviteData.houseNumber.id}</Link> : ''}
                  </td>
                  <td>{inviteData.block ? <Link to={`invite/${inviteData.block.id}`}>{inviteData.block.id}</Link> : ''}</td>
                  <td>
                    {inviteData.apartmentName ? (
                      <Link to={`invite/${inviteData.apartmentName.id}`}>{inviteData.apartmentName.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{inviteData.streetName ? <Link to={`invite/${inviteData.streetName.id}`}>{inviteData.streetName.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${inviteData.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${inviteData.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${inviteData.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gmsApp.inviteData.home.notFound">No Invite Data found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ inviteData }: IRootState) => ({
  inviteDataList: inviteData.entities,
  loading: inviteData.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InviteData);

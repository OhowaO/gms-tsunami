import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invite.reducer';
import { IInvite } from 'app/shared/model/invite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInviteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Invite = (props: IInviteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { inviteList, match, loading } = props;
  return (
    <div>
      <h2 id="invite-heading">
        <Translate contentKey="gmsApp.invite.home.title">Invites</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gmsApp.invite.home.createLabel">Create new Invite</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {inviteList && inviteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.invite.host">Host</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.invite.guest">Guest</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.invite.validFrom">Valid From</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.invite.validTo">Valid To</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.invite.inviteStatus">Invite Status</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.invite.host">Host</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.invite.guest">Guest</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {inviteList.map((invite, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invite.id}`} color="link" size="sm">
                      {invite.id}
                    </Button>
                  </td>
                  <td>{invite.host}</td>
                  <td>{invite.guest}</td>
                  <td>{invite.validFrom ? <TextFormat type="date" value={invite.validFrom} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{invite.validTo ? <TextFormat type="date" value={invite.validTo} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`gmsApp.InviteStatus.${invite.inviteStatus}`} />
                  </td>
                  <td>{invite.host ? <Link to={`tenant/${invite.host.id}`}>{invite.host.id}</Link> : ''}</td>
                  <td>{invite.guest ? <Link to={`gms-user/${invite.guest.id}`}>{invite.guest.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invite.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invite.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invite.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gmsApp.invite.home.notFound">No Invites found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ invite }: IRootState) => ({
  inviteList: invite.entities,
  loading: invite.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Invite);

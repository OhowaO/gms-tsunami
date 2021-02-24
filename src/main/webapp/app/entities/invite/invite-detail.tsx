import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invite.reducer';
import { IInvite } from 'app/shared/model/invite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInviteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InviteDetail = (props: IInviteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { inviteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gmsApp.invite.detail.title">Invite</Translate> [<b>{inviteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="host">
              <Translate contentKey="gmsApp.invite.host">Host</Translate>
            </span>
          </dt>
          <dd>{inviteEntity.host}</dd>
          <dt>
            <span id="guest">
              <Translate contentKey="gmsApp.invite.guest">Guest</Translate>
            </span>
          </dt>
          <dd>{inviteEntity.guest}</dd>
          <dt>
            <span id="validFrom">
              <Translate contentKey="gmsApp.invite.validFrom">Valid From</Translate>
            </span>
          </dt>
          <dd>{inviteEntity.validFrom ? <TextFormat value={inviteEntity.validFrom} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="validTo">
              <Translate contentKey="gmsApp.invite.validTo">Valid To</Translate>
            </span>
          </dt>
          <dd>{inviteEntity.validTo ? <TextFormat value={inviteEntity.validTo} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="inviteStatus">
              <Translate contentKey="gmsApp.invite.inviteStatus">Invite Status</Translate>
            </span>
          </dt>
          <dd>{inviteEntity.inviteStatus}</dd>
          <dt>
            <Translate contentKey="gmsApp.invite.host">Host</Translate>
          </dt>
          <dd>{inviteEntity.host ? inviteEntity.host.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.invite.guest">Guest</Translate>
          </dt>
          <dd>{inviteEntity.guest ? inviteEntity.guest.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invite" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invite/${inviteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invite }: IRootState) => ({
  inviteEntity: invite.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InviteDetail);

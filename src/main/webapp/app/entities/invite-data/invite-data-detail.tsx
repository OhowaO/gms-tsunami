import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invite-data.reducer';
import { IInviteData } from 'app/shared/model/invite-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInviteDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InviteDataDetail = (props: IInviteDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { inviteDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gmsApp.inviteData.detail.title">InviteData</Translate> [<b>{inviteDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="start">
              <Translate contentKey="gmsApp.inviteData.start">Start</Translate>
            </span>
          </dt>
          <dd>{inviteDataEntity.start ? <TextFormat value={inviteDataEntity.start} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="stop">
              <Translate contentKey="gmsApp.inviteData.stop">Stop</Translate>
            </span>
          </dt>
          <dd>{inviteDataEntity.stop ? <TextFormat value={inviteDataEntity.stop} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="propertyType">
              <Translate contentKey="gmsApp.inviteData.propertyType">Property Type</Translate>
            </span>
          </dt>
          <dd>{inviteDataEntity.propertyType}</dd>
          <dt>
            <span id="houseNumber">
              <Translate contentKey="gmsApp.inviteData.houseNumber">House Number</Translate>
            </span>
          </dt>
          <dd>{inviteDataEntity.houseNumber}</dd>
          <dt>
            <span id="block">
              <Translate contentKey="gmsApp.inviteData.block">Block</Translate>
            </span>
          </dt>
          <dd>{inviteDataEntity.block}</dd>
          <dt>
            <span id="apartmentName">
              <Translate contentKey="gmsApp.inviteData.apartmentName">Apartment Name</Translate>
            </span>
          </dt>
          <dd>{inviteDataEntity.apartmentName}</dd>
          <dt>
            <span id="streetName">
              <Translate contentKey="gmsApp.inviteData.streetName">Street Name</Translate>
            </span>
          </dt>
          <dd>{inviteDataEntity.streetName}</dd>
          <dt>
            <Translate contentKey="gmsApp.inviteData.start">Start</Translate>
          </dt>
          <dd>{inviteDataEntity.start ? inviteDataEntity.start.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.inviteData.stop">Stop</Translate>
          </dt>
          <dd>{inviteDataEntity.stop ? inviteDataEntity.stop.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.inviteData.houseNumber">House Number</Translate>
          </dt>
          <dd>{inviteDataEntity.houseNumber ? inviteDataEntity.houseNumber.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.inviteData.block">Block</Translate>
          </dt>
          <dd>{inviteDataEntity.block ? inviteDataEntity.block.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.inviteData.apartmentName">Apartment Name</Translate>
          </dt>
          <dd>{inviteDataEntity.apartmentName ? inviteDataEntity.apartmentName.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.inviteData.streetName">Street Name</Translate>
          </dt>
          <dd>{inviteDataEntity.streetName ? inviteDataEntity.streetName.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invite-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invite-data/${inviteDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ inviteData }: IRootState) => ({
  inviteDataEntity: inviteData.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InviteDataDetail);

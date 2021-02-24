import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gms-user.reducer';
import { IGMSUser } from 'app/shared/model/gms-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGMSUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GMSUserDetail = (props: IGMSUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gMSUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gmsApp.gMSUser.detail.title">GMSUser</Translate> [<b>{gMSUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userID">
              <Translate contentKey="gmsApp.gMSUser.userID">User ID</Translate>
            </span>
          </dt>
          <dd>{gMSUserEntity.userID}</dd>
          <dt>
            <span id="firstNames">
              <Translate contentKey="gmsApp.gMSUser.firstNames">First Names</Translate>
            </span>
          </dt>
          <dd>{gMSUserEntity.firstNames}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="gmsApp.gMSUser.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{gMSUserEntity.lastName}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="gmsApp.gMSUser.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{gMSUserEntity.gender}</dd>
          <dt>
            <span id="emailAdress">
              <Translate contentKey="gmsApp.gMSUser.emailAdress">Email Adress</Translate>
            </span>
          </dt>
          <dd>{gMSUserEntity.emailAdress}</dd>
          <dt>
            <span id="telephoneNumber">
              <Translate contentKey="gmsApp.gMSUser.telephoneNumber">Telephone Number</Translate>
            </span>
          </dt>
          <dd>{gMSUserEntity.telephoneNumber}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="gmsApp.gMSUser.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {gMSUserEntity.dateOfBirth ? <TextFormat value={gMSUserEntity.dateOfBirth} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/gms-user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gms-user/${gMSUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ gMSUser }: IRootState) => ({
  gMSUserEntity: gMSUser.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GMSUserDetail);

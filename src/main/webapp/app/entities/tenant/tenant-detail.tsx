import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tenant.reducer';
import { ITenant } from 'app/shared/model/tenant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITenantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TenantDetail = (props: ITenantDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tenantEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gmsApp.tenant.detail.title">Tenant</Translate> [<b>{tenantEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userID">
              <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
            </span>
          </dt>
          <dd>{tenantEntity.userID}</dd>
          <dt>
            <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
          </dt>
          <dd>{tenantEntity.userID ? tenantEntity.userID.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
          </dt>
          <dd>{tenantEntity.userID ? tenantEntity.userID.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.tenant.residentialProperty">Residential Property</Translate>
          </dt>
          <dd>{tenantEntity.residentialProperty ? tenantEntity.residentialProperty.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/tenant" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tenant/${tenantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tenant }: IRootState) => ({
  tenantEntity: tenant.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TenantDetail);

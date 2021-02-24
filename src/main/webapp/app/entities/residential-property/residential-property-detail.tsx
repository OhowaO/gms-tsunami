import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './residential-property.reducer';
import { IResidentialProperty } from 'app/shared/model/residential-property.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResidentialPropertyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResidentialPropertyDetail = (props: IResidentialPropertyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { residentialPropertyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gmsApp.residentialProperty.detail.title">ResidentialProperty</Translate> [
          <b>{residentialPropertyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="residentialPropertyID">
              <Translate contentKey="gmsApp.residentialProperty.residentialPropertyID">Residential Property ID</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.residentialPropertyID}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="gmsApp.residentialProperty.type">Type</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.type}</dd>
          <dt>
            <span id="ownerID">
              <Translate contentKey="gmsApp.residentialProperty.ownerID">Owner ID</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.ownerID}</dd>
          <dt>
            <span id="houseNumber">
              <Translate contentKey="gmsApp.residentialProperty.houseNumber">House Number</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.houseNumber}</dd>
          <dt>
            <span id="block">
              <Translate contentKey="gmsApp.residentialProperty.block">Block</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.block}</dd>
          <dt>
            <span id="apartmentName">
              <Translate contentKey="gmsApp.residentialProperty.apartmentName">Apartment Name</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.apartmentName}</dd>
          <dt>
            <span id="streetName">
              <Translate contentKey="gmsApp.residentialProperty.streetName">Street Name</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.streetName}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="gmsApp.residentialProperty.city">City</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.city}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="gmsApp.residentialProperty.country">Country</Translate>
            </span>
          </dt>
          <dd>{residentialPropertyEntity.country}</dd>
          <dt>
            <Translate contentKey="gmsApp.residentialProperty.ownerID">Owner ID</Translate>
          </dt>
          <dd>
            {residentialPropertyEntity.ownerIDS
              ? residentialPropertyEntity.ownerIDS.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {residentialPropertyEntity.ownerIDS && i === residentialPropertyEntity.ownerIDS.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/residential-property" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/residential-property/${residentialPropertyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ residentialProperty }: IRootState) => ({
  residentialPropertyEntity: residentialProperty.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResidentialPropertyDetail);

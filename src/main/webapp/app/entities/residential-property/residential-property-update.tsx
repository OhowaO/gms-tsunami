import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOwner } from 'app/shared/model/owner.model';
import { getEntities as getOwners } from 'app/entities/owner/owner.reducer';
import { getEntity, updateEntity, createEntity, reset } from './residential-property.reducer';
import { IResidentialProperty } from 'app/shared/model/residential-property.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IResidentialPropertyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResidentialPropertyUpdate = (props: IResidentialPropertyUpdateProps) => {
  const [idsownerID, setIdsownerID] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { residentialPropertyEntity, owners, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/residential-property');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOwners();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...residentialPropertyEntity,
        ...values,
        ownerIDS: mapIdList(values.ownerIDS),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gmsApp.residentialProperty.home.createOrEditLabel">
            <Translate contentKey="gmsApp.residentialProperty.home.createOrEditLabel">Create or edit a ResidentialProperty</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : residentialPropertyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="residential-property-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="residential-property-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="residentialPropertyIDLabel" for="residential-property-residentialPropertyID">
                  <Translate contentKey="gmsApp.residentialProperty.residentialPropertyID">Residential Property ID</Translate>
                </Label>
                <AvField
                  id="residential-property-residentialPropertyID"
                  type="string"
                  className="form-control"
                  name="residentialPropertyID"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="residential-property-type">
                  <Translate contentKey="gmsApp.residentialProperty.type">Type</Translate>
                </Label>
                <AvInput
                  id="residential-property-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && residentialPropertyEntity.type) || 'HOUSE'}
                >
                  <option value="HOUSE">{translate('gmsApp.ResidentialPropertyType.HOUSE')}</option>
                  <option value="APARTMENTS">{translate('gmsApp.ResidentialPropertyType.APARTMENTS')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="ownerIDLabel" for="residential-property-ownerID">
                  <Translate contentKey="gmsApp.residentialProperty.ownerID">Owner ID</Translate>
                </Label>
                <AvField
                  id="residential-property-ownerID"
                  type="string"
                  className="form-control"
                  name="ownerID"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="houseNumberLabel" for="residential-property-houseNumber">
                  <Translate contentKey="gmsApp.residentialProperty.houseNumber">House Number</Translate>
                </Label>
                <AvField
                  id="residential-property-houseNumber"
                  type="text"
                  name="houseNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="blockLabel" for="residential-property-block">
                  <Translate contentKey="gmsApp.residentialProperty.block">Block</Translate>
                </Label>
                <AvField id="residential-property-block" type="text" name="block" />
              </AvGroup>
              <AvGroup>
                <Label id="apartmentNameLabel" for="residential-property-apartmentName">
                  <Translate contentKey="gmsApp.residentialProperty.apartmentName">Apartment Name</Translate>
                </Label>
                <AvField id="residential-property-apartmentName" type="text" name="apartmentName" />
              </AvGroup>
              <AvGroup>
                <Label id="streetNameLabel" for="residential-property-streetName">
                  <Translate contentKey="gmsApp.residentialProperty.streetName">Street Name</Translate>
                </Label>
                <AvField
                  id="residential-property-streetName"
                  type="text"
                  name="streetName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="residential-property-city">
                  <Translate contentKey="gmsApp.residentialProperty.city">City</Translate>
                </Label>
                <AvField
                  id="residential-property-city"
                  type="text"
                  name="city"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="residential-property-country">
                  <Translate contentKey="gmsApp.residentialProperty.country">Country</Translate>
                </Label>
                <AvInput
                  id="residential-property-country"
                  type="select"
                  className="form-control"
                  name="country"
                  value={(!isNew && residentialPropertyEntity.country) || 'KENYA'}
                >
                  <option value="KENYA">{translate('gmsApp.Countries.KENYA')}</option>
                  <option value="OTHER">{translate('gmsApp.Countries.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="residential-property-ownerID">
                  <Translate contentKey="gmsApp.residentialProperty.ownerID">Owner ID</Translate>
                </Label>
                <AvInput
                  id="residential-property-ownerID"
                  type="select"
                  multiple
                  className="form-control"
                  name="ownerIDS"
                  value={residentialPropertyEntity.ownerIDS && residentialPropertyEntity.ownerIDS.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {owners
                    ? owners.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/residential-property" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  owners: storeState.owner.entities,
  residentialPropertyEntity: storeState.residentialProperty.entity,
  loading: storeState.residentialProperty.loading,
  updating: storeState.residentialProperty.updating,
  updateSuccess: storeState.residentialProperty.updateSuccess,
});

const mapDispatchToProps = {
  getOwners,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResidentialPropertyUpdate);

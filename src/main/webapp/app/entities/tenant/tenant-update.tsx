import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGMSUser } from 'app/shared/model/gms-user.model';
import { getEntities as getGMsUsers } from 'app/entities/gms-user/gms-user.reducer';
import { IResidentialProperty } from 'app/shared/model/residential-property.model';
import { getEntities as getResidentialProperties } from 'app/entities/residential-property/residential-property.reducer';
import { IInvite } from 'app/shared/model/invite.model';
import { getEntities as getInvites } from 'app/entities/invite/invite.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tenant.reducer';
import { ITenant } from 'app/shared/model/tenant.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITenantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TenantUpdate = (props: ITenantUpdateProps) => {
  const [userIDId, setUserIdId] = useState('0');
  const [userIDId, setUserIdId] = useState('0');
  const [residentialPropertyId, setResidentialPropertyId] = useState('0');
  const [userIDId, setUserIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tenantEntity, gMSUsers, residentialProperties, invites, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tenant');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getGMsUsers();
    props.getResidentialProperties();
    props.getInvites();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...tenantEntity,
        ...values,
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
          <h2 id="gmsApp.tenant.home.createOrEditLabel">
            <Translate contentKey="gmsApp.tenant.home.createOrEditLabel">Create or edit a Tenant</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tenantEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="tenant-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="tenant-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userIDLabel" for="tenant-userID">
                  <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
                </Label>
                <AvField
                  id="tenant-userID"
                  type="string"
                  className="form-control"
                  name="userID"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="tenant-userID">
                  <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
                </Label>
                <AvInput id="tenant-userID" type="select" className="form-control" name="userID.id">
                  <option value="" key="0" />
                  {gMSUsers
                    ? gMSUsers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="tenant-userID">
                  <Translate contentKey="gmsApp.tenant.userID">User ID</Translate>
                </Label>
                <AvInput id="tenant-userID" type="select" className="form-control" name="userID.id">
                  <option value="" key="0" />
                  {residentialProperties
                    ? residentialProperties.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="tenant-residentialProperty">
                  <Translate contentKey="gmsApp.tenant.residentialProperty">Residential Property</Translate>
                </Label>
                <AvInput id="tenant-residentialProperty" type="select" className="form-control" name="residentialProperty.id">
                  <option value="" key="0" />
                  {residentialProperties
                    ? residentialProperties.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/tenant" replace color="info">
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
  gMSUsers: storeState.gMSUser.entities,
  residentialProperties: storeState.residentialProperty.entities,
  invites: storeState.invite.entities,
  tenantEntity: storeState.tenant.entity,
  loading: storeState.tenant.loading,
  updating: storeState.tenant.updating,
  updateSuccess: storeState.tenant.updateSuccess,
});

const mapDispatchToProps = {
  getGMsUsers,
  getResidentialProperties,
  getInvites,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TenantUpdate);

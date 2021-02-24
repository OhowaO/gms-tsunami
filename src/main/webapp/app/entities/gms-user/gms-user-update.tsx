import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBaseEntity } from 'app/shared/model/base-entity.model';
import { getEntities as getBaseEntities } from 'app/entities/base-entity/base-entity.reducer';
import { ITenant } from 'app/shared/model/tenant.model';
import { getEntities as getTenants } from 'app/entities/tenant/tenant.reducer';
import { IOwner } from 'app/shared/model/owner.model';
import { getEntities as getOwners } from 'app/entities/owner/owner.reducer';
import { IInvite } from 'app/shared/model/invite.model';
import { getEntities as getInvites } from 'app/entities/invite/invite.reducer';
import { getEntity, updateEntity, createEntity, reset } from './gms-user.reducer';
import { IGMSUser } from 'app/shared/model/gms-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGMSUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GMSUserUpdate = (props: IGMSUserUpdateProps) => {
  const [userIDId, setUserIdId] = useState('0');
  const [userIDId, setUserIdId] = useState('0');
  const [userIDId, setUserIdId] = useState('0');
  const [userIDId, setUserIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { gMSUserEntity, baseEntities, tenants, owners, invites, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/gms-user');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBaseEntities();
    props.getTenants();
    props.getOwners();
    props.getInvites();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateOfBirth = convertDateTimeToServer(values.dateOfBirth);

    if (errors.length === 0) {
      const entity = {
        ...gMSUserEntity,
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
          <h2 id="gmsApp.gMSUser.home.createOrEditLabel">
            <Translate contentKey="gmsApp.gMSUser.home.createOrEditLabel">Create or edit a GMSUser</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : gMSUserEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="gms-user-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="gms-user-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userIDLabel" for="gms-user-userID">
                  <Translate contentKey="gmsApp.gMSUser.userID">User ID</Translate>
                </Label>
                <AvField
                  id="gms-user-userID"
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
                <Label id="firstNamesLabel" for="gms-user-firstNames">
                  <Translate contentKey="gmsApp.gMSUser.firstNames">First Names</Translate>
                </Label>
                <AvField
                  id="gms-user-firstNames"
                  type="text"
                  name="firstNames"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="gms-user-lastName">
                  <Translate contentKey="gmsApp.gMSUser.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="gms-user-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="gms-user-gender">
                  <Translate contentKey="gmsApp.gMSUser.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="gms-user-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && gMSUserEntity.gender) || 'MALE'}
                >
                  <option value="MALE">{translate('gmsApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('gmsApp.Gender.FEMALE')}</option>
                  <option value="OTHER">{translate('gmsApp.Gender.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailAdressLabel" for="gms-user-emailAdress">
                  <Translate contentKey="gmsApp.gMSUser.emailAdress">Email Adress</Translate>
                </Label>
                <AvField
                  id="gms-user-emailAdress"
                  type="text"
                  name="emailAdress"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneNumberLabel" for="gms-user-telephoneNumber">
                  <Translate contentKey="gmsApp.gMSUser.telephoneNumber">Telephone Number</Translate>
                </Label>
                <AvField
                  id="gms-user-telephoneNumber"
                  type="text"
                  name="telephoneNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="gms-user-dateOfBirth">
                  <Translate contentKey="gmsApp.gMSUser.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvInput
                  id="gms-user-dateOfBirth"
                  type="datetime-local"
                  className="form-control"
                  name="dateOfBirth"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.gMSUserEntity.dateOfBirth)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/gms-user" replace color="info">
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
  baseEntities: storeState.baseEntity.entities,
  tenants: storeState.tenant.entities,
  owners: storeState.owner.entities,
  invites: storeState.invite.entities,
  gMSUserEntity: storeState.gMSUser.entity,
  loading: storeState.gMSUser.loading,
  updating: storeState.gMSUser.updating,
  updateSuccess: storeState.gMSUser.updateSuccess,
});

const mapDispatchToProps = {
  getBaseEntities,
  getTenants,
  getOwners,
  getInvites,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GMSUserUpdate);

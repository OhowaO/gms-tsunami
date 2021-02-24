import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITenant } from 'app/shared/model/tenant.model';
import { getEntities as getTenants } from 'app/entities/tenant/tenant.reducer';
import { IGMSUser } from 'app/shared/model/gms-user.model';
import { getEntities as getGMsUsers } from 'app/entities/gms-user/gms-user.reducer';
import { IInviteData } from 'app/shared/model/invite-data.model';
import { getEntities as getInviteData } from 'app/entities/invite-data/invite-data.reducer';
import { getEntity, updateEntity, createEntity, reset } from './invite.reducer';
import { IInvite } from 'app/shared/model/invite.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInviteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InviteUpdate = (props: IInviteUpdateProps) => {
  const [hostId, setHostId] = useState('0');
  const [guestId, setGuestId] = useState('0');
  const [validFromId, setValidFromId] = useState('0');
  const [validToId, setValidToId] = useState('0');
  const [residentialPropertyId, setResidentialPropertyId] = useState('0');
  const [residentialPropertyId, setResidentialPropertyId] = useState('0');
  const [residentialPropertyId, setResidentialPropertyId] = useState('0');
  const [residentialPropertyId, setResidentialPropertyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { inviteEntity, tenants, gMSUsers, inviteData, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/invite');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTenants();
    props.getGMsUsers();
    props.getInviteData();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.validFrom = convertDateTimeToServer(values.validFrom);
    values.validTo = convertDateTimeToServer(values.validTo);

    if (errors.length === 0) {
      const entity = {
        ...inviteEntity,
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
          <h2 id="gmsApp.invite.home.createOrEditLabel">
            <Translate contentKey="gmsApp.invite.home.createOrEditLabel">Create or edit a Invite</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : inviteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invite-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="invite-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="hostLabel" for="invite-host">
                  <Translate contentKey="gmsApp.invite.host">Host</Translate>
                </Label>
                <AvField
                  id="invite-host"
                  type="text"
                  name="host"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="guestLabel" for="invite-guest">
                  <Translate contentKey="gmsApp.invite.guest">Guest</Translate>
                </Label>
                <AvField
                  id="invite-guest"
                  type="text"
                  name="guest"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="validFromLabel" for="invite-validFrom">
                  <Translate contentKey="gmsApp.invite.validFrom">Valid From</Translate>
                </Label>
                <AvInput
                  id="invite-validFrom"
                  type="datetime-local"
                  className="form-control"
                  name="validFrom"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.inviteEntity.validFrom)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="validToLabel" for="invite-validTo">
                  <Translate contentKey="gmsApp.invite.validTo">Valid To</Translate>
                </Label>
                <AvInput
                  id="invite-validTo"
                  type="datetime-local"
                  className="form-control"
                  name="validTo"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.inviteEntity.validTo)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="inviteStatusLabel" for="invite-inviteStatus">
                  <Translate contentKey="gmsApp.invite.inviteStatus">Invite Status</Translate>
                </Label>
                <AvInput
                  id="invite-inviteStatus"
                  type="select"
                  className="form-control"
                  name="inviteStatus"
                  value={(!isNew && inviteEntity.inviteStatus) || 'PENDING'}
                >
                  <option value="PENDING">{translate('gmsApp.InviteStatus.PENDING')}</option>
                  <option value="ACCEPTED">{translate('gmsApp.InviteStatus.ACCEPTED')}</option>
                  <option value="EXPIRED">{translate('gmsApp.InviteStatus.EXPIRED')}</option>
                  <option value="CANCELLED">{translate('gmsApp.InviteStatus.CANCELLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invite-host">
                  <Translate contentKey="gmsApp.invite.host">Host</Translate>
                </Label>
                <AvInput id="invite-host" type="select" className="form-control" name="host.id">
                  <option value="" key="0" />
                  {tenants
                    ? tenants.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invite-guest">
                  <Translate contentKey="gmsApp.invite.guest">Guest</Translate>
                </Label>
                <AvInput id="invite-guest" type="select" className="form-control" name="guest.id">
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
              <Button tag={Link} id="cancel-save" to="/invite" replace color="info">
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
  tenants: storeState.tenant.entities,
  gMSUsers: storeState.gMSUser.entities,
  inviteData: storeState.inviteData.entities,
  inviteEntity: storeState.invite.entity,
  loading: storeState.invite.loading,
  updating: storeState.invite.updating,
  updateSuccess: storeState.invite.updateSuccess,
});

const mapDispatchToProps = {
  getTenants,
  getGMsUsers,
  getInviteData,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InviteUpdate);

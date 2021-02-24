import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInvite } from 'app/shared/model/invite.model';
import { getEntities as getInvites } from 'app/entities/invite/invite.reducer';
import { getEntity, updateEntity, createEntity, reset } from './invite-data.reducer';
import { IInviteData } from 'app/shared/model/invite-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInviteDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InviteDataUpdate = (props: IInviteDataUpdateProps) => {
  const [startId, setStartId] = useState('0');
  const [stopId, setStopId] = useState('0');
  const [houseNumberId, setHouseNumberId] = useState('0');
  const [blockId, setBlockId] = useState('0');
  const [apartmentNameId, setApartmentNameId] = useState('0');
  const [streetNameId, setStreetNameId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { inviteDataEntity, invites, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/invite-data');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInvites();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.start = convertDateTimeToServer(values.start);
    values.stop = convertDateTimeToServer(values.stop);

    if (errors.length === 0) {
      const entity = {
        ...inviteDataEntity,
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
          <h2 id="gmsApp.inviteData.home.createOrEditLabel">
            <Translate contentKey="gmsApp.inviteData.home.createOrEditLabel">Create or edit a InviteData</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : inviteDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invite-data-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="invite-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startLabel" for="invite-data-start">
                  <Translate contentKey="gmsApp.inviteData.start">Start</Translate>
                </Label>
                <AvInput
                  id="invite-data-start"
                  type="datetime-local"
                  className="form-control"
                  name="start"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.inviteDataEntity.start)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="stopLabel" for="invite-data-stop">
                  <Translate contentKey="gmsApp.inviteData.stop">Stop</Translate>
                </Label>
                <AvInput
                  id="invite-data-stop"
                  type="datetime-local"
                  className="form-control"
                  name="stop"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.inviteDataEntity.stop)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="propertyTypeLabel" for="invite-data-propertyType">
                  <Translate contentKey="gmsApp.inviteData.propertyType">Property Type</Translate>
                </Label>
                <AvInput
                  id="invite-data-propertyType"
                  type="select"
                  className="form-control"
                  name="propertyType"
                  value={(!isNew && inviteDataEntity.propertyType) || 'HOUSE'}
                >
                  <option value="HOUSE">{translate('gmsApp.ResidentialPropertyType.HOUSE')}</option>
                  <option value="APARTMENTS">{translate('gmsApp.ResidentialPropertyType.APARTMENTS')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="houseNumberLabel" for="invite-data-houseNumber">
                  <Translate contentKey="gmsApp.inviteData.houseNumber">House Number</Translate>
                </Label>
                <AvField
                  id="invite-data-houseNumber"
                  type="text"
                  name="houseNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="blockLabel" for="invite-data-block">
                  <Translate contentKey="gmsApp.inviteData.block">Block</Translate>
                </Label>
                <AvField id="invite-data-block" type="text" name="block" />
              </AvGroup>
              <AvGroup>
                <Label id="apartmentNameLabel" for="invite-data-apartmentName">
                  <Translate contentKey="gmsApp.inviteData.apartmentName">Apartment Name</Translate>
                </Label>
                <AvField id="invite-data-apartmentName" type="text" name="apartmentName" />
              </AvGroup>
              <AvGroup>
                <Label id="streetNameLabel" for="invite-data-streetName">
                  <Translate contentKey="gmsApp.inviteData.streetName">Street Name</Translate>
                </Label>
                <AvField
                  id="invite-data-streetName"
                  type="text"
                  name="streetName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="invite-data-start">
                  <Translate contentKey="gmsApp.inviteData.start">Start</Translate>
                </Label>
                <AvInput id="invite-data-start" type="select" className="form-control" name="start.id">
                  <option value="" key="0" />
                  {invites
                    ? invites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invite-data-stop">
                  <Translate contentKey="gmsApp.inviteData.stop">Stop</Translate>
                </Label>
                <AvInput id="invite-data-stop" type="select" className="form-control" name="stop.id">
                  <option value="" key="0" />
                  {invites
                    ? invites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invite-data-houseNumber">
                  <Translate contentKey="gmsApp.inviteData.houseNumber">House Number</Translate>
                </Label>
                <AvInput id="invite-data-houseNumber" type="select" className="form-control" name="houseNumber.id">
                  <option value="" key="0" />
                  {invites
                    ? invites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invite-data-block">
                  <Translate contentKey="gmsApp.inviteData.block">Block</Translate>
                </Label>
                <AvInput id="invite-data-block" type="select" className="form-control" name="block.id">
                  <option value="" key="0" />
                  {invites
                    ? invites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invite-data-apartmentName">
                  <Translate contentKey="gmsApp.inviteData.apartmentName">Apartment Name</Translate>
                </Label>
                <AvInput id="invite-data-apartmentName" type="select" className="form-control" name="apartmentName.id">
                  <option value="" key="0" />
                  {invites
                    ? invites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invite-data-streetName">
                  <Translate contentKey="gmsApp.inviteData.streetName">Street Name</Translate>
                </Label>
                <AvInput id="invite-data-streetName" type="select" className="form-control" name="streetName.id">
                  <option value="" key="0" />
                  {invites
                    ? invites.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/invite-data" replace color="info">
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
  invites: storeState.invite.entities,
  inviteDataEntity: storeState.inviteData.entity,
  loading: storeState.inviteData.loading,
  updating: storeState.inviteData.updating,
  updateSuccess: storeState.inviteData.updateSuccess,
});

const mapDispatchToProps = {
  getInvites,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InviteDataUpdate);

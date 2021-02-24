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
import { getEntity, updateEntity, createEntity, reset } from './owner.reducer';
import { IOwner } from 'app/shared/model/owner.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOwnerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OwnerUpdate = (props: IOwnerUpdateProps) => {
  const [userIDId, setUserIdId] = useState('0');
  const [ownerIDId, setOwnerIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ownerEntity, gMSUsers, residentialProperties, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/owner');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getGMsUsers();
    props.getResidentialProperties();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ownerEntity,
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
          <h2 id="gmsApp.owner.home.createOrEditLabel">
            <Translate contentKey="gmsApp.owner.home.createOrEditLabel">Create or edit a Owner</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ownerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="owner-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="owner-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userIDLabel" for="owner-userID">
                  <Translate contentKey="gmsApp.owner.userID">User ID</Translate>
                </Label>
                <AvField
                  id="owner-userID"
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
                <Label for="owner-userID">
                  <Translate contentKey="gmsApp.owner.userID">User ID</Translate>
                </Label>
                <AvInput id="owner-userID" type="select" className="form-control" name="userID.id">
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
              <Button tag={Link} id="cancel-save" to="/owner" replace color="info">
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
  ownerEntity: storeState.owner.entity,
  loading: storeState.owner.loading,
  updating: storeState.owner.updating,
  updateSuccess: storeState.owner.updateSuccess,
});

const mapDispatchToProps = {
  getGMsUsers,
  getResidentialProperties,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OwnerUpdate);

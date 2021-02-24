import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGMSUser } from 'app/shared/model/gms-user.model';
import { getEntities as getGMsUsers } from 'app/entities/gms-user/gms-user.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './identification-document.reducer';
import { IIdentificationDocument } from 'app/shared/model/identification-document.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIdentificationDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IdentificationDocumentUpdate = (props: IIdentificationDocumentUpdateProps) => {
  const [uniqueDocumentIDId, setUniqueDocumentIdId] = useState('0');
  const [gMSUserId, setGMsUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { identificationDocumentEntity, gMSUsers, loading, updating } = props;

  const { photo1, photo1ContentType, photo2, photo2ContentType } = identificationDocumentEntity;

  const handleClose = () => {
    props.history.push('/identification-document');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getGMsUsers();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateOfIssue = convertDateTimeToServer(values.dateOfIssue);
    values.dateOfExpiry = convertDateTimeToServer(values.dateOfExpiry);

    if (errors.length === 0) {
      const entity = {
        ...identificationDocumentEntity,
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
          <h2 id="gmsApp.identificationDocument.home.createOrEditLabel">
            <Translate contentKey="gmsApp.identificationDocument.home.createOrEditLabel">Create or edit a IdentificationDocument</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : identificationDocumentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="identification-document-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="identification-document-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idTypeLabel" for="identification-document-idType">
                  <Translate contentKey="gmsApp.identificationDocument.idType">Id Type</Translate>
                </Label>
                <AvInput
                  id="identification-document-idType"
                  type="select"
                  className="form-control"
                  name="idType"
                  value={(!isNew && identificationDocumentEntity.idType) || 'NationalID'}
                >
                  <option value="NationalID">{translate('gmsApp.IDType.NationalID')}</option>
                  <option value="Passport">{translate('gmsApp.IDType.Passport')}</option>
                  <option value="ResidencePermit">{translate('gmsApp.IDType.ResidencePermit')}</option>
                  <option value="DrivingLicense">{translate('gmsApp.IDType.DrivingLicense')}</option>
                  <option value="SchoolID">{translate('gmsApp.IDType.SchoolID')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="uniqueDocumentIDLabel" for="identification-document-uniqueDocumentID">
                  <Translate contentKey="gmsApp.identificationDocument.uniqueDocumentID">Unique Document ID</Translate>
                </Label>
                <AvField
                  id="identification-document-uniqueDocumentID"
                  type="text"
                  name="uniqueDocumentID"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfIssueLabel" for="identification-document-dateOfIssue">
                  <Translate contentKey="gmsApp.identificationDocument.dateOfIssue">Date Of Issue</Translate>
                </Label>
                <AvInput
                  id="identification-document-dateOfIssue"
                  type="datetime-local"
                  className="form-control"
                  name="dateOfIssue"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.identificationDocumentEntity.dateOfIssue)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="issueingCountryLabel" for="identification-document-issueingCountry">
                  <Translate contentKey="gmsApp.identificationDocument.issueingCountry">Issueing Country</Translate>
                </Label>
                <AvInput
                  id="identification-document-issueingCountry"
                  type="select"
                  className="form-control"
                  name="issueingCountry"
                  value={(!isNew && identificationDocumentEntity.issueingCountry) || 'KENYA'}
                >
                  <option value="KENYA">{translate('gmsApp.Countries.KENYA')}</option>
                  <option value="OTHER">{translate('gmsApp.Countries.OTHER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dateOfExpiryLabel" for="identification-document-dateOfExpiry">
                  <Translate contentKey="gmsApp.identificationDocument.dateOfExpiry">Date Of Expiry</Translate>
                </Label>
                <AvInput
                  id="identification-document-dateOfExpiry"
                  type="datetime-local"
                  className="form-control"
                  name="dateOfExpiry"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.identificationDocumentEntity.dateOfExpiry)}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photo1Label" for="photo1">
                    <Translate contentKey="gmsApp.identificationDocument.photo1">Photo 1</Translate>
                  </Label>
                  <br />
                  {photo1 ? (
                    <div>
                      {photo1ContentType ? (
                        <a onClick={openFile(photo1ContentType, photo1)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {photo1ContentType}, {byteSize(photo1)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('photo1')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_photo1" type="file" onChange={onBlobChange(false, 'photo1')} />
                  <AvInput
                    type="hidden"
                    name="photo1"
                    value={photo1}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photo2Label" for="photo2">
                    <Translate contentKey="gmsApp.identificationDocument.photo2">Photo 2</Translate>
                  </Label>
                  <br />
                  {photo2 ? (
                    <div>
                      {photo2ContentType ? (
                        <a onClick={openFile(photo2ContentType, photo2)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {photo2ContentType}, {byteSize(photo2)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('photo2')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_photo2" type="file" onChange={onBlobChange(false, 'photo2')} />
                  <AvInput type="hidden" name="photo2" value={photo2} />
                </AvGroup>
              </AvGroup>
              <AvGroup check>
                <Label id="verifiedLabel">
                  <AvInput id="identification-document-verified" type="checkbox" className="form-check-input" name="verified" />
                  <Translate contentKey="gmsApp.identificationDocument.verified">Verified</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="identification-document-uniqueDocumentID">
                  <Translate contentKey="gmsApp.identificationDocument.uniqueDocumentID">Unique Document ID</Translate>
                </Label>
                <AvInput id="identification-document-uniqueDocumentID" type="select" className="form-control" name="uniqueDocumentID.id">
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
                <Label for="identification-document-gMSUser">
                  <Translate contentKey="gmsApp.identificationDocument.gMSUser">G MS User</Translate>
                </Label>
                <AvInput id="identification-document-gMSUser" type="select" className="form-control" name="gMSUser.id">
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
              <Button tag={Link} id="cancel-save" to="/identification-document" replace color="info">
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
  identificationDocumentEntity: storeState.identificationDocument.entity,
  loading: storeState.identificationDocument.loading,
  updating: storeState.identificationDocument.updating,
  updateSuccess: storeState.identificationDocument.updateSuccess,
});

const mapDispatchToProps = {
  getGMsUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IdentificationDocumentUpdate);

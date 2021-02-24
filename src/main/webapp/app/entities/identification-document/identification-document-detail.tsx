import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './identification-document.reducer';
import { IIdentificationDocument } from 'app/shared/model/identification-document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIdentificationDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IdentificationDocumentDetail = (props: IIdentificationDocumentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { identificationDocumentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gmsApp.identificationDocument.detail.title">IdentificationDocument</Translate> [
          <b>{identificationDocumentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idType">
              <Translate contentKey="gmsApp.identificationDocument.idType">Id Type</Translate>
            </span>
          </dt>
          <dd>{identificationDocumentEntity.idType}</dd>
          <dt>
            <span id="uniqueDocumentID">
              <Translate contentKey="gmsApp.identificationDocument.uniqueDocumentID">Unique Document ID</Translate>
            </span>
          </dt>
          <dd>{identificationDocumentEntity.uniqueDocumentID}</dd>
          <dt>
            <span id="dateOfIssue">
              <Translate contentKey="gmsApp.identificationDocument.dateOfIssue">Date Of Issue</Translate>
            </span>
          </dt>
          <dd>
            {identificationDocumentEntity.dateOfIssue ? (
              <TextFormat value={identificationDocumentEntity.dateOfIssue} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="issueingCountry">
              <Translate contentKey="gmsApp.identificationDocument.issueingCountry">Issueing Country</Translate>
            </span>
          </dt>
          <dd>{identificationDocumentEntity.issueingCountry}</dd>
          <dt>
            <span id="dateOfExpiry">
              <Translate contentKey="gmsApp.identificationDocument.dateOfExpiry">Date Of Expiry</Translate>
            </span>
          </dt>
          <dd>
            {identificationDocumentEntity.dateOfExpiry ? (
              <TextFormat value={identificationDocumentEntity.dateOfExpiry} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="photo1">
              <Translate contentKey="gmsApp.identificationDocument.photo1">Photo 1</Translate>
            </span>
          </dt>
          <dd>
            {identificationDocumentEntity.photo1 ? (
              <div>
                {identificationDocumentEntity.photo1ContentType ? (
                  <a onClick={openFile(identificationDocumentEntity.photo1ContentType, identificationDocumentEntity.photo1)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {identificationDocumentEntity.photo1ContentType}, {byteSize(identificationDocumentEntity.photo1)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="photo2">
              <Translate contentKey="gmsApp.identificationDocument.photo2">Photo 2</Translate>
            </span>
          </dt>
          <dd>
            {identificationDocumentEntity.photo2 ? (
              <div>
                {identificationDocumentEntity.photo2ContentType ? (
                  <a onClick={openFile(identificationDocumentEntity.photo2ContentType, identificationDocumentEntity.photo2)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {identificationDocumentEntity.photo2ContentType}, {byteSize(identificationDocumentEntity.photo2)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="verified">
              <Translate contentKey="gmsApp.identificationDocument.verified">Verified</Translate>
            </span>
          </dt>
          <dd>{identificationDocumentEntity.verified ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="gmsApp.identificationDocument.uniqueDocumentID">Unique Document ID</Translate>
          </dt>
          <dd>{identificationDocumentEntity.uniqueDocumentID ? identificationDocumentEntity.uniqueDocumentID.id : ''}</dd>
          <dt>
            <Translate contentKey="gmsApp.identificationDocument.gMSUser">G MS User</Translate>
          </dt>
          <dd>{identificationDocumentEntity.gMSUser ? identificationDocumentEntity.gMSUser.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/identification-document" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/identification-document/${identificationDocumentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ identificationDocument }: IRootState) => ({
  identificationDocumentEntity: identificationDocument.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IdentificationDocumentDetail);

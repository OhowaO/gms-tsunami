import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './identification-document.reducer';
import { IIdentificationDocument } from 'app/shared/model/identification-document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIdentificationDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const IdentificationDocument = (props: IIdentificationDocumentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { identificationDocumentList, match, loading } = props;
  return (
    <div>
      <h2 id="identification-document-heading">
        <Translate contentKey="gmsApp.identificationDocument.home.title">Identification Documents</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gmsApp.identificationDocument.home.createLabel">Create new Identification Document</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {identificationDocumentList && identificationDocumentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.idType">Id Type</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.uniqueDocumentID">Unique Document ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.dateOfIssue">Date Of Issue</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.issueingCountry">Issueing Country</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.dateOfExpiry">Date Of Expiry</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.photo1">Photo 1</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.photo2">Photo 2</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.verified">Verified</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.uniqueDocumentID">Unique Document ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.identificationDocument.gMSUser">G MS User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {identificationDocumentList.map((identificationDocument, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${identificationDocument.id}`} color="link" size="sm">
                      {identificationDocument.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`gmsApp.IDType.${identificationDocument.idType}`} />
                  </td>
                  <td>{identificationDocument.uniqueDocumentID}</td>
                  <td>
                    {identificationDocument.dateOfIssue ? (
                      <TextFormat type="date" value={identificationDocument.dateOfIssue} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`gmsApp.Countries.${identificationDocument.issueingCountry}`} />
                  </td>
                  <td>
                    {identificationDocument.dateOfExpiry ? (
                      <TextFormat type="date" value={identificationDocument.dateOfExpiry} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {identificationDocument.photo1 ? (
                      <div>
                        {identificationDocument.photo1ContentType ? (
                          <a onClick={openFile(identificationDocument.photo1ContentType, identificationDocument.photo1)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {identificationDocument.photo1ContentType}, {byteSize(identificationDocument.photo1)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {identificationDocument.photo2 ? (
                      <div>
                        {identificationDocument.photo2ContentType ? (
                          <a onClick={openFile(identificationDocument.photo2ContentType, identificationDocument.photo2)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {identificationDocument.photo2ContentType}, {byteSize(identificationDocument.photo2)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{identificationDocument.verified ? 'true' : 'false'}</td>
                  <td>
                    {identificationDocument.uniqueDocumentID ? (
                      <Link to={`gms-user/${identificationDocument.uniqueDocumentID.id}`}>
                        {identificationDocument.uniqueDocumentID.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {identificationDocument.gMSUser ? (
                      <Link to={`gms-user/${identificationDocument.gMSUser.id}`}>{identificationDocument.gMSUser.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${identificationDocument.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${identificationDocument.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${identificationDocument.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gmsApp.identificationDocument.home.notFound">No Identification Documents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ identificationDocument }: IRootState) => ({
  identificationDocumentList: identificationDocument.entities,
  loading: identificationDocument.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IdentificationDocument);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './base-entity.reducer';
import { IBaseEntity } from 'app/shared/model/base-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBaseEntityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BaseEntity = (props: IBaseEntityProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { baseEntityList, match, loading } = props;
  return (
    <div>
      <h2 id="base-entity-heading">
        <Translate contentKey="gmsApp.baseEntity.home.title">Base Entities</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gmsApp.baseEntity.home.createLabel">Create new Base Entity</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {baseEntityList && baseEntityList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gmsApp.baseEntity.iD">I D</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {baseEntityList.map((baseEntity, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${baseEntity.id}`} color="link" size="sm">
                      {baseEntity.id}
                    </Button>
                  </td>
                  <td>{baseEntity.iD ? <Link to={`gms-user/${baseEntity.iD.id}`}>{baseEntity.iD.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${baseEntity.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${baseEntity.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${baseEntity.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="gmsApp.baseEntity.home.notFound">No Base Entities found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ baseEntity }: IRootState) => ({
  baseEntityList: baseEntity.entities,
  loading: baseEntity.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BaseEntity);

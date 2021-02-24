import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IdentificationDocument from './identification-document';
import IdentificationDocumentDetail from './identification-document-detail';
import IdentificationDocumentUpdate from './identification-document-update';
import IdentificationDocumentDeleteDialog from './identification-document-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IdentificationDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IdentificationDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IdentificationDocumentDetail} />
      <ErrorBoundaryRoute path={match.url} component={IdentificationDocument} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IdentificationDocumentDeleteDialog} />
  </>
);

export default Routes;

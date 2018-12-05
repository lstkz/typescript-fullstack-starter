import { ModuleLoader } from 'typeless';
import { epic, reducer } from './module';
import React from 'react';
import { GlobalActions } from './actions';

export default () => (
  <ModuleLoader
    epic={epic}
    reducer={reducer}
    reducerPath={['global']}
    actions={GlobalActions}
  />
);

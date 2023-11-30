/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  type EntityFilterQuery,
  CATALOG_FILTER_EXISTS,
} from '@backstage/catalog-client';
// import {
//   Entity,
//   stringifyEntityRef,
// } from '@backstage/catalog-model';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Box, Button, FormHelperText, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import React, { useEffect, useState } from 'react';
import useAsync from 'react-use/lib/useAsync';
import {
  ResourcePickerFilterQueryValue,
  ResourcePickerProps,
  ResourcePickerUiOptions,
  ResourcePickerFilterQuery,
} from './schema';
import { Select, SelectItem } from '@backstage/core-components';
// import { stringifyEntityRef } from '@backstage/catalog-model';

export { ResourcePickerSchema } from './schema';

const useStyles = makeStyles({
  boxInfo: {
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    background: '#60a5fa40',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '.5rem',
  },
});

// test

export interface Annotations {
  [key: string]: string;
}

/**
 * The underlying component that is rendered in the form for the `ResourcePicker`
 * field extension.
 *
 * @public
 */
export const ResourcePicker = (props: ResourcePickerProps) => {
  const { onChange, required, uiSchema, rawErrors, formData } = props;

  const [entityNameSelected, setEntityNameSelected] = useState<string>(
    'Select the Resource',
  );
  const catalogFilter = buildCatalogFilter(uiSchema);
  const catalogApi = useApi(catalogApiRef);
  const classes = useStyles();

  const { value: entities } = useAsync(async () => {
    const { items } = await catalogApi.getEntities(
      catalogFilter ? { filter: catalogFilter } : undefined,
    );
    onChange(JSON.stringify(items[0].metadata.environment ? {name: items[0].metadata.name, ...items[0].metadata.environment}:{name: items[0].metadata.name}));
    return items;
  });

  useEffect(() => {
    if (entities && entities?.length === 1) {
      onChange(JSON.stringify(entities[0].metadata.environment ? {name: entities[0].metadata.name, ...entities[0].metadata.environment} : { name: entities[0].metadata.name}));
    }
  }, [entities, onChange]);

  const entitiesOptions: SelectItem[] = entities
    ? entities.map(i => ({
        label: i.metadata.name,
        value: JSON.stringify(i.metadata.environment ? {name: i.metadata.name, ...i.metadata.environment} : {name: i.metadata.name}),
      }))
    : [{ label: 'Loading...', value: 'loading' }];

  return (
    <>
      {entities && entities.length > 0 ? (
        <FormControl
          margin="normal"
          required={required}
          error={rawErrors?.length > 0 && !formData}
        >
          <Select
            native
            label="Resource Available"
            onChange={selected => {
              setEntityNameSelected(selected as string);
              onChange(selected);
            }}
            disabled={entities.length === 1}
            selected={entityNameSelected}
            items={entitiesOptions}
          />
          <FormHelperText>Select the desired resource</FormHelperText>
        </FormControl>
      ) : (
        <Box className={classes.boxInfo}>
          ⚠️ No resources available
          <Button
            component={RouterLink}
            to="/create"
            style={{ margin: '16px' }}
            size="large"
            variant="outlined"
          >
            Register Resource
          </Button>
        </Box>
      )}
    </>
  );
};

/**
 * Converts a especial `{exists: true}` value to the `CATALOG_FILTER_EXISTS` symbol.
 *
 * @param value - The value to convert.
 * @returns The converted value.
 */
function convertOpsValues(
  value: Exclude<ResourcePickerFilterQueryValue, Array<any>>,
): string | symbol {
  if (typeof value === 'object' && value.exists) {
    return CATALOG_FILTER_EXISTS;
  }
  return value?.toString();
}

/**
 * Converts schema filters to entity filter query, replacing `{exists:true}` values
 * with the constant `CATALOG_FILTER_EXISTS`.
 *
 * @param schemaFilters - An object containing schema filters with keys as filter names
 * and values as filter values.
 * @returns An object with the same keys as the input object, but with `{exists:true}` values
 * transformed to `CATALOG_FILTER_EXISTS` symbol.
 */
function convertSchemaFiltersToQuery(
  schemaFilters: ResourcePickerFilterQuery,
): Exclude<EntityFilterQuery, Array<any>> {
  const query: EntityFilterQuery = {};

  for (const [key, value] of Object.entries(schemaFilters)) {
    if (Array.isArray(value)) {
      query[key] = value;
    } else {
      query[key] = convertOpsValues(value);
    }
  }

  return query;
}

/**
 * Builds an `EntityFilterQuery` based on the `uiSchema` passed in.
 * If `catalogFilter` is specified in the `uiSchema`, it is converted to a `EntityFilterQuery`.
 * If `allowedKinds` is specified in the `uiSchema` will support the legacy `allowedKinds` option.
 *
 * @param uiSchema The `uiSchema` of an `ResourcePicker` component.
 * @returns An `EntityFilterQuery` based on the `uiSchema`, or `undefined` if `catalogFilter` is not specified in the `uiSchema`.
 */
function buildCatalogFilter(
  uiSchema: ResourcePickerProps['uiSchema'],
): EntityFilterQuery | undefined {
  const defaultKind = uiSchema['ui:options']?.defaultKind;

  const catalogFilter:
    | ResourcePickerUiOptions['catalogFilter']
    | undefined
    | any =
    uiSchema['ui:options']?.catalogFilter ||
    (defaultKind && { kind: defaultKind });

  if (!catalogFilter) {
    return undefined;
  }

  if (Array.isArray(catalogFilter)) {
    return catalogFilter.map(convertSchemaFiltersToQuery);
  }

  return convertSchemaFiltersToQuery(catalogFilter);
}

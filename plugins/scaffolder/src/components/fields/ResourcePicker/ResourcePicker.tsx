import {
  type EntityFilterQuery,
  CATALOG_FILTER_EXISTS,
} from '@backstage/catalog-client';
// import {
//   Entity,
//   stringifyEntityRef,
// } from '@backstage/catalog-model';
import { useApi } from '@backstage/core-plugin-api';
import {
  catalogApiRef,
} from '@backstage/plugin-catalog-react';
import { Box, FormHelperText, makeStyles } from '@material-ui/core';
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
    gap: '.5rem'
  }
})

/**
 * The underlying component that is rendered in the form for the `ResourcePicker`
 * field extension.
 *
 * @public
 */
export const ResourcePicker = (props: ResourcePickerProps) => {
  const {
    onChange,
    required,
    uiSchema,
    rawErrors,
    formData
  } = props;

  const [ entityNameSelected, setEntityNameSelected ] = useState<string>('Select the Resource')
  const catalogFilter = buildCatalogFilter(uiSchema);
  const catalogApi = useApi(catalogApiRef);
  const classes = useStyles();

  const { value: entities } = useAsync(async () => {
    const { items } = await catalogApi.getEntities(
      catalogFilter ? { filter: catalogFilter } : undefined,
    );
    onChange(items[0].metadata.name)
    return items;
  });

  useEffect(() => {
    if (entities && entities?.length === 1) {
      onChange(entities[0].metadata.name);
    }
  }, [entities, onChange]);

  // useEffect(()=>{
  //   filterEntityType(entityNameSelected)
  // },[entityNameSelected])


  const entitiesOptions: SelectItem[] = entities
    ? entities.map(i => ({ label: i.metadata.name, value: i.metadata.name }))
    : [{ label: 'Loading...', value: 'loading' }];

  // const filterEntityType = (entityName: string) => {
  //   const entitySelected = entities?.filter(e => e.metadata.name === entityName &&  e);
  //   if(entitySelected){
  //     console.log(entitySelected[0])
  //     const entity : Entity = entitySelected[0];
  //     const entityType = entity.spec?.type;

  //     switch (entityType) {
  //       case 'website':
  //         return onChange(entity.spec?.url)     
  //       default:
  //         return onChange(entity.spec?.name)
  //     }
  //   }
  // }

  return (
    <>
     { (entities && entities.length > 0) ? (
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
              onChange(selected)
            }
            }
            disabled={entities.length === 1}
            selected={entityNameSelected}
            items={entitiesOptions}
          />
          <FormHelperText>Select the desired resource</FormHelperText>
        </FormControl>
      ):  (<Box 
            className={classes.boxInfo} >
             ⚠️ No resources available
          </Box>)
      }
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

  const catalogFilter: ResourcePickerUiOptions['catalogFilter'] | undefined | any =
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

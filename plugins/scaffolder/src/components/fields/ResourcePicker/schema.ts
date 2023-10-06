import { z } from 'zod';
import { makeFieldSchemaFromZod } from '../utils';

/**
 * @public
 */
export const resourceQueryFilterExpressionSchema = z.record(
  z
    .string()
    .or(z.object({ exists: z.boolean().optional() }))
    .or(z.array(z.string())),
);

/**
 * @public
 */
export const ResourcePickerFieldSchema = makeFieldSchemaFromZod(
  z.string(),
  z.object({
    defaultKind: z
      .string()
      .optional()
      .describe(
        'The default entity kind. Options of this kind will not be prefixed.',
      ),
    catalogFilter: z
      .array(resourceQueryFilterExpressionSchema)
      .or(resourceQueryFilterExpressionSchema)
      .optional()
      .describe('List of key-value filter expression for entities'),
  }),
);

/**
 * The input props that can be specified under `ui:options` for the
 * `ResourcePicker` field extension.
 *
 * @public
 */
export type ResourcePickerUiOptions =
  typeof ResourcePickerFieldSchema.uiOptionsType;

export type ResourcePickerProps = typeof ResourcePickerFieldSchema.type;

export const ResourcePickerSchema = ResourcePickerFieldSchema.schema;

export type ResourcePickerFilterQuery = z.TypeOf<
  typeof resourceQueryFilterExpressionSchema
>;

export type ResourcePickerFilterQueryValue =
  ResourcePickerFilterQuery[keyof ResourcePickerFilterQuery];

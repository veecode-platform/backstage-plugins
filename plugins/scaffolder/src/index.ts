/*
 * Copyright 2020 The Backstage Authors
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

/**
 * The Backstage plugin that helps you create new things
 *
 * @packageDocumentation
 */

export { ScaffolderClient } from './api';

export { createScaffolderLayout, ScaffolderLayouts } from './layouts';
export type { LayoutOptions, LayoutTemplate, LayoutComponent } from './layouts';
export {
  EntityPickerFieldExtension,
  EntityNamePickerFieldExtension,
  EntityTagsPickerFieldExtension,
  OwnerPickerFieldExtension,
  OwnedEntityPickerFieldExtension,
  RepoUrlPickerFieldExtension,
  ScaffolderPage,
  scaffolderPlugin,
} from './plugin';
export * from './components';

/** @deprecated - use imports from @backstage/plugin-scaffolder-react instead */
export {
  createScaffolderFieldExtension,
  ScaffolderFieldExtensions,
  rootRouteRef,
  selectedTemplateRouteRef,
  useTemplateSecrets,
  scaffolderApiRef,
  /** @deprecated - use imports from @backstage/plugin-scaffolder-react instead */
  type ScaffolderApi,
  /** @deprecated */
  type ScaffolderUseTemplateSecrets,
  /** @deprecated */
  type TemplateParameterSchema,
  type CustomFieldExtensionSchema,
  type CustomFieldValidator,
  type FieldExtensionOptions,
  type FieldExtensionComponentProps,
  type FieldExtensionComponent,
  type ListActionsResponse,
  type LogEvent,
  type ScaffolderDryRunOptions,
  type ScaffolderDryRunResponse,
  type ScaffolderGetIntegrationsListOptions,
  type ScaffolderGetIntegrationsListResponse,
  type ScaffolderOutputLink,
  type ScaffolderScaffoldOptions,
  type ScaffolderScaffoldResponse,
  type ScaffolderStreamLogsOptions,
  type ScaffolderTask,
  type ScaffolderTaskOutput,
  type ScaffolderTaskStatus,
} from '@backstage/plugin-scaffolder-react';

export type { TaskPageProps } from './components/TaskPage';

/** next exports */
export { NextScaffolderPage } from './plugin';
export type { NextRouterProps } from './next';
export type { TemplateGroupFilter } from './next';

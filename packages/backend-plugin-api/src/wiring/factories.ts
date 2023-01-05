/*
 * Copyright 2022 The Backstage Authors
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

import { FactoryFunctionWithOptions, MaybeOptions } from '../types';
import {
  BackendRegistrationPoints,
  BackendFeature,
  ExtensionPoint,
} from './types';

/** @public */
export interface ExtensionPointConfig {
  id: string;
}

/** @public */
export function createExtensionPoint<T>(
  config: ExtensionPointConfig,
): ExtensionPoint<T> {
  return {
    id: config.id,
    get T(): T {
      throw new Error(`tried to read ExtensionPoint.T of ${this}`);
    },
    toString() {
      return `extensionPoint{${config.id}}`;
    },
    $$ref: 'extension-point', // TODO: declare
  };
}

/** @public */
export interface BackendPluginConfig<TOptions> {
  id: string;
  register(reg: BackendRegistrationPoints, options: TOptions): void;
}

/** @public */
export function createBackendPlugin<TOptions extends MaybeOptions = undefined>(
  config: BackendPluginConfig<TOptions>,
): FactoryFunctionWithOptions<BackendFeature, TOptions> {
  return (options?: TOptions) => ({
    id: config.id,
    register(register: BackendRegistrationPoints) {
      return config.register(register, options!);
    },
  });
}

/** @public */
export interface BackendModuleConfig<TOptions> {
  pluginId: string;
  moduleId: string;
  register(
    reg: Omit<BackendRegistrationPoints, 'registerExtensionPoint'>,
    options: TOptions,
  ): void;
}

/**
 * Creates a new backend module for a given plugin.
 *
 * @public
 *
 * @remarks
 *
 * The `moduleId` should be equal to the module-specific prefix of the exported name, such
 * that the full name is `moduleId + PluginId + "Module"`. For example, a GitHub entity
 * provider module for the `catalog` plugin might have the module ID `'githubEntityProvider'`,
 * and the full exported name would be `githubEntityProviderCatalogModule`.
 *
 * The `pluginId` should exactly match the `id` of the plugin that the module extends.
 */
export function createBackendModule<TOptions extends MaybeOptions = undefined>(
  config: BackendModuleConfig<TOptions>,
): FactoryFunctionWithOptions<BackendFeature, TOptions> {
  return (options?: TOptions) => ({
    id: `${config.pluginId}.${config.moduleId}`,
    register(register: BackendRegistrationPoints) {
      // TODO: Hide registerExtensionPoint
      return config.register(register, options!);
    },
  });
}

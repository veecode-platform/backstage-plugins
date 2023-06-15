/*
 * Copyright 2023 The Backstage Authors
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
  getOrgsGithub,
  getOrgsGitlab,
  getUserGithub,
  getUserGitlab,
} from './providers';
import { ParamsService, ResponseService } from './types';

export async function getUserAndOrgs(
  Params: ParamsService,
): Promise<ResponseService> {
  const { provider, host, token } = Params;

  switch (provider) {
    case 'github':
      // const user_github = await getUserGithub({host, token});
      // const orgs_github = await getOrgsGithub({host, token});
      return {
        username: await getUserGithub({ host, token }),
        organizations: await getOrgsGithub({ host, token }),
      };
    case 'gitlab':
      // const user_gitlab = await getUserGitlab({host, token});
      // const orgs_gitlab = await getOrgsGitlab({host, token});
      return {
        username: await getUserGitlab({ host, token }),
        organizations: await getOrgsGitlab({ host, token }),
      };
    default:
      return { username: 'Not Found', organizations: ['Not Found'] };
  }
}

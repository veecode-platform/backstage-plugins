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

import React from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import SignOutIcon from '@material-ui/icons/MeetingRoom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  identityApiRef,
  errorApiRef,
  useApi,
  configApiRef,
} from '@backstage/core-plugin-api';

/** @public */
export const UserSettingsMenu = () => {
  const errorApi = useApi(errorApiRef);
  const identityApi = useApi(identityApiRef);
  const config = useApi(configApiRef);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<undefined | HTMLElement>(
    undefined,
  );

  const handleKeycloakSessionLogout = async () => {
    const token = await identityApi.getCredentials();
    const backendBaseUrl = config.getString('backend.baseUrl');
    await fetch(`${backendBaseUrl}/api/devportal/keycloak/logout`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token.token}` },
    });
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        data-testid="user-settings-menu"
        aria-label="more"
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          data-testid="sign-out"
          onClick={async () => {
            if (!config.getBoolean('platform.guest.enabled')) {
              await handleKeycloakSessionLogout();
            }
            identityApi.signOut().catch((error: any) => errorApi.post(error));
          }}
        >
          <ListItemIcon>
            <SignOutIcon />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

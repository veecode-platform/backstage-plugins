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
import React, { useEffect, useState } from 'react';
import { Progress, Select, SelectItem } from '@backstage/core-components';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useApi } from '@backstage/core-plugin-api';
import { scaffolderApiRef } from '@backstage/plugin-scaffolder-react';
import useAsync from 'react-use/lib/useAsync';
import { useIntegrations } from '../../hooks/useIntegrations';

export const RepoUrlPickerHost = (props: {
  host?: string;
  hosts?: string[];
  onChange: (host: string) => void;
  rawErrors: string[];
}) => {
  const { host, hosts, onChange, rawErrors } = props;
  const scaffolderApi = useApi(scaffolderApiRef);


  const [hostsData, setHostsData]=useState<string[]>([]);
  const [hostList, setHostList] = useState<SelectItem[]>();

  const { githubIntegrationsExists, gitlabIntegrationsExists, githubHostIntegration, gitlabHostIntegration  } = useIntegrations();

  const { value: { integrations } = { integrations: [] }, loading } = useAsync(
    async () => {
      return await scaffolderApi.getIntegrationsList({
        allowedHosts: hosts ?? [],
      });
      // const hosts = [];
      // if(githubIntegrationsExists) hosts.push(githubHostIntegration);
      // if(gitlabIntegrationsExists) hosts.push(gitlabHostIntegration);
      // return setHostsData(hosts);
    },
  );

  useEffect(()=>{
    async function fetchData(){
      try{
        const hostss = [];
        if(githubIntegrationsExists) hostss.push(githubHostIntegration);
        if(gitlabIntegrationsExists) hostss.push(gitlabHostIntegration);
        setHostsData(hostss);
      }catch(err){
        console.log(err)
      }
    }
    if(!hosts?.length){
      fetchData()
    }else{
      setHostsData(hosts)
    }
},[]);

  useEffect(()=>{
  const data = itemsList(hostsData as string[]);
  setHostList( data !== undefined ? data : [{label: "loading ...", value: "loading ..."}]);
},[hostsData]);

const itemsList = (data:string[]) : SelectItem[] => {
  if(data !== undefined){
    const hostss:SelectItem[] = [];
    data.forEach((item : string) =>{
       hostss.push({
        label: item,
        value: item
      })
    })
    return hostss;
  } 
    return [{
      label: "loading",
      value: "loading"
    }]
}

  useEffect(() => {
    // If there is no host chosen currently
    if (!host) {
      // Set the first of the allowedHosts option if that available
      if (hosts?.length) {
        onChange(hosts[0]);
        // if there's no hosts provided, fallback to using the first integration
      } else if (hostsData?.length) {
        onChange(hostsData[0]);
      }
    }
  }, [hosts, host, onChange, integrations]);

  // If there are no allowedHosts provided, then show all integrations. Otherwise, only show integrations
  // that are provided in the dropdown for the user to choose from.
  // const hostsOptions: SelectItem[] = integrations
  //   ? integrations
  //       .filter(i => (hosts?.length ? hosts?.includes(i.host) : true))
  //       .map(i => ({ label: i.title, value: i.host }))
  //   : [{ label: 'Loading...', value: 'loading' }];

  const notAvaliable = [{label: "No hosts available", value: "No hosts available"}];

  const selectOptions = hostList?.length ? hostList : notAvaliable

  if (loading) {
    return <Progress />;
  }

  return (
    <>
      <FormControl
        margin="normal"
        required
        error={rawErrors?.length > 0 && !host}
      >
        <Select
          native
          disabled={hosts?.length === 1 ?? false}
          label="Host"
          onChange={s => onChange(String(Array.isArray(s) ? s[0] : s))}
          selected={hostsData[0]}
          items={selectOptions}
          data-testid="host-select"
        />

        <FormHelperText>
          The host where the repository will be created
        </FormHelperText>
      </FormControl>
    </>
  );
};

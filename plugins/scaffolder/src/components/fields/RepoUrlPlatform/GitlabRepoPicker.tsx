import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Select, SelectItem } from '@backstage/core-components';
import { RepoUrlPickerState } from './types';
import { useIntegrations } from '../../hooks/useIntegrations';
import { Grid, Input, InputLabel } from '@material-ui/core';
import { getUserAndOrgs } from '../../services';

export const GitlabRepoPicker = (props: {
  allowedOwners?: string[];
  rawErrors: string[];
  state: RepoUrlPickerState;
  onChange: (state: RepoUrlPickerState) => void;
  hosts: string[]
}) => {
  const { allowedOwners = [], rawErrors, state, onChange , hosts} = props;
  const ownerItems: SelectItem[] | SelectItem  = allowedOwners
    ? allowedOwners.map(i => ({ label: i, value: i }))
    : [{ label: 'Loading...', value: 'loading' }];

  const { owner } = state;

  const [ownerData, setOwnerData ] = useState<string>("loading ...");
  const [items, setItems] = useState<string[]>();
  const [hasIntegration, setHasIntegration] = useState<boolean>(false);
  const [ownerList, setOwnerList] = useState<SelectItem[]>();
  const { gitlabIntegrationsExists, gitlabTokenIntegration, gitlabHostIntegration } = useIntegrations();
  const messageLoading = "loading ...";

  useEffect(()=>{
    async function fetchData(){
      const params = {provider: 'gitlab', host: gitlabHostIntegration ,token: gitlabTokenIntegration};
      const getData = getUserAndOrgs(params);
      try{
        const user = (await getData).username;
        const organizations = (await getData).organizations
        if(user !== "Not found")
        { const ownerDataResult = [user, ...organizations];
          setOwnerData(user);
          setItems(ownerDataResult);
          setHasIntegration(true)
        } else {
          const ownerDataResult = ["Not Found"];
          setOwnerData("Not Found");
          setItems(ownerDataResult);
          setHasIntegration(false)
        }
      }catch(err){
        console.log(err)
      }
    }
    if(!hosts?.includes('gitlab') || gitlabIntegrationsExists){
      fetchData()
    }
},[]);


useEffect(()=>{
  const data = itemsList(items as string[]);
  setOwnerList( data != undefined ? data : [{label: messageLoading, value: messageLoading}]);
},[items]);


  const itemsList = (data:string[]) : SelectItem[] => {
    if(data !== undefined){
      const owners:SelectItem[] = []
      data.forEach((item : string) =>{
         owners.push({
          label: item,
          value: item
        })
      })
      return owners;
    }
    else{
      return [{
        label: messageLoading,
        value: messageLoading
      }]
    }
  }
  
  return (
    <>
      <FormControl
        margin="normal"
        required
        error={rawErrors?.length > 0 && !owner}
      >
        {
          hasIntegration ? (
            <>
                          {allowedOwners?.length ? (
              <Select
                native
                label="Owner Available"
                onChange={s =>
                  onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                }
                disabled={allowedOwners.length === 1}
                selected={owner}
                items={ownerItems}
              />
            ) : (
              <>
                <Grid item style={{marginBottom:'1rem'}}>
                  <Select        
                    native
                    label="Owner"
                    onChange={s =>
                      onChange({ owner: String(Array.isArray(s) ? s[0] : s) })
                    }
                    disabled={allowedOwners.length === 1}
                    selected={ownerData}
                    items={ownerList as SelectItem[]}
                  />
                </Grid>
              </>
            )}
            </>
          ): (
            <>
             {allowedOwners?.length ? (
                  <Select
                    native
                    label="Owner Available"
                    onChange={selected =>
                      onChange({
                        owner: String(Array.isArray(selected) ? selected[0] : selected),
                      })
                    }
                    disabled={allowedOwners.length === 1}
                    selected={owner}
                    items={ownerItems}
                  />
                ) : (
                  <>
                    <InputLabel htmlFor="ownerInput">Owner</InputLabel>
                    <Input
                      id="ownerInput"
                      onChange={e => onChange({ owner: e.target.value })}
                      value={owner}
                    />
                  </>
                )}
            </>
          )

        }
        <FormHelperText>
          GitLab namespace where this repository will belong to. It can be the
          name of organization, group, subgroup, user, or the project.
        </FormHelperText>
      </FormControl>
    </>
  );
};

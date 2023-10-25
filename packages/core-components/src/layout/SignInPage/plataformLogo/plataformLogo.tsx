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
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles';
//import IconPlataform from '../assets/logo.png';
const IconPlataform = '../assets/logo.png';


const useStyles = makeStyles (theme=>({
        logo: {
                position:'relative',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '2em',
                width: '35rem',
                height: 'auto',
        },
        fill:{
                fill: theme.palette.primary.main
        },
        special:{
                fill: 'red'
        },
        icon: {
          width: '65px',      
          padding: '10px',
        }
      }));


export const Logo = () => {

        const classes = useStyles();

  return ( 
<svg xmlns="http://www.w3.org/2000/svg" 
width="100%" height="200.000000pt" 
viewBox="0 0 1373.000000 554.000000" className={classes.logo}>
  <g id="Camada_2" data-name="Camada 2">
    <g id="Camada_1-2" data-name="Camada 1">
      <g>
        <g fill='#25e7ba'>
          <path d="M499.5,284.52q-12.45-11.28-12.45-32.85,0-6.3,2-20.91a211.22,211.22,0,0,0,2-23.9q0-17.25-6.14-26.54T467.14,171h-9.95v-14.6h9.95q11.61,0,17.76-9.29T491,120.58a194.14,194.14,0,0,0-2-22.9q-2-14.59-2-21.24,0-21.9,12.45-33.35t35.34-11.45H565.7V46.58H537.83q-14.94,0-22.9,7.63t-8,22.57c0,2.43.21,5.8.66,10.12s.77,7.69,1,10.12q2,16.59,2,23.56,0,16.26-7,27.21t-20.58,15.6v.66A38.45,38.45,0,0,1,503.48,180q7.14,11.29,7.14,27.22a210.31,210.31,0,0,1-2,23.23c-.22,2.21-.55,5.59-1,10.12s-.66,8-.66,10.45q0,14.6,7.79,22.07t22.74,7.47h28.2V295.8H534.84Q512,295.8,499.5,284.52Z"/>
          <path d="M569.41,226.2q-19.93-21.57-19.94-61.44,0-40.33,20-62.13t56.66-21.8a101.44,101.44,0,0,1,26.35,3.26,62.64,62.64,0,0,1,20.52,9.33l-11.43,26.34q-16.79-9.09-34-9.09-21,0-31.83,13.87T584.91,165q0,52.92,43.14,52.92a67.18,67.18,0,0,0,35.67-10.26l11.19,26.82a84.88,84.88,0,0,1-22.73,9.79,97.66,97.66,0,0,1-26,3.5Q589.34,247.77,569.41,226.2Z"/>
          <path d="M732,42.93q12.44,11.28,12.44,32.85,0,6.3-2,20.91a210.54,210.54,0,0,0-2,23.89q0,17.25,6.14,26.55t17.75,9.29h10V171h-10q-11.61,0-17.75,9.3t-6.14,26.54a193.63,193.63,0,0,0,2,22.9,176.56,176.56,0,0,1,2,21.24q0,21.9-12.44,33.35T696.69,295.8H665.83V280.87h27.88q14.92,0,22.9-7.63t8-22.57q0-3.66-.66-10.12t-1-10.12q-2-16.6-2-23.57,0-16.26,7-27.21t20.57-15.6v-.66a38.39,38.39,0,0,1-20.41-15.93q-7.12-11.28-7.13-27.21a209.66,209.66,0,0,1,2-23.23c.22-2.21.55-5.59,1-10.12s.66-8,.66-10.46q0-14.6-7.8-22.06T694,46.91H665.83V31.64h30.86Q719.6,31.64,732,42.93Z"/>
        </g>
        <g className={classes.fill}>
          <g>
            <polygon points="165.62 13.22 110.08 186.78 107.44 186.78 51.57 13.22 0 13.22 76.69 241.32 135.54 241.32 214.87 13.22 165.62 13.22"/>
            <path d="M461.81,155q0-37-17.36-56.69T393.71,78.68q-35.7,0-55.37,21.81A72,72,0,0,0,323,128.86q-4.12-18.5-14.71-30.51Q290.9,78.69,257.52,78.68q-35.7,0-55.37,21.81T182.48,162q0,40,19.67,61.82t56,21.82A131.71,131.71,0,0,0,294.05,241q16.35-4.62,27.6-13.55L317.35,196a75.53,75.53,0,0,1-23.3,11.57,93.18,93.18,0,0,1-27.28,4q-20.49,0-31.57-10.42t-11.07-30.24h94.81q2,33.57,19.4,52.89,19.67,21.81,56,21.82A131.71,131.71,0,0,0,430.24,241q16.36-4.62,27.6-13.55L453.54,196a75.53,75.53,0,0,1-23.3,11.57,93.16,93.16,0,0,1-27.27,4q-20.5,0-31.57-10.42t-11.08-30.24h100.5A122.92,122.92,0,0,0,461.81,155Zm-237.68-7.93q1-16.2,8.92-25.29t22.81-9.09q13.56,0,20.66,8.92t7.11,25.46Zm136.19,0q1-16.2,8.93-25.29t22.81-9.09q13.54,0,20.66,8.92t7.11,25.46Z"/>
          </g>
          <g>
            <path  d="M1021.65,95.54A51.63,51.63,0,0,0,1002.31,83a69.35,69.35,0,0,0-24.62-4.29q-30.42,0-46.78,22-9.15,12.28-13.18,30-4.87-18.09-16.07-30.33Q881.82,78.69,844.8,78.68q-36.69,0-56.53,21.65T768.43,162q0,40.34,19.84,62t56.53,21.66q37,0,56.86-21.66,11.21-12.22,16.07-30.42,4,17.81,13.18,30.09,16.37,22,45.78,22,31.41,0,48.27-25.46l4,21.16h33V0h-40.33ZM871.57,198.84q-9.26,12.74-26.77,12.73t-26.61-12.73q-9.11-12.72-9.09-36.86t9.09-36.69q9.09-12.57,26.61-12.56t26.77,12.56q9.25,12.57,9.26,36.69T871.57,198.84Zm150.08-1.16a38.71,38.71,0,0,1-13.55,10.25,39.16,39.16,0,0,1-16.53,3.64q-16.53,0-26-12.73T956.2,162q0-23.46,9.09-36.36t25.62-12.89a41.15,41.15,0,0,1,17,3.63,38.47,38.47,0,0,1,13.72,10.25Z"/>
            <path  d="M1206.77,155q0-37-17.35-56.69t-50.75-19.67q-35.7,0-55.37,21.81T1063.63,162q0,40,19.67,61.82t56,21.82A131.66,131.66,0,0,0,1175.2,241q16.36-4.62,27.61-13.55l-4.3-31.41a75.59,75.59,0,0,1-23.31,11.57,93.16,93.16,0,0,1-27.27,4q-20.51,0-31.57-10.42t-11.07-30.24h100.49A122.92,122.92,0,0,0,1206.77,155Zm-101.48-7.93q1-16.2,8.92-25.29t22.81-9.09q13.56,0,20.66,8.92t7.11,25.46Z"/>
          </g>
          <g>
            <path  d="M826.8,333.56H812.71v30.6h-9.57v-73.3H826.8c17.25,0,25.34,9.46,25.34,21.45C852.14,323.46,845,333.56,826.8,333.56Zm0-7.89c10.94,0,15.57-5.15,15.57-13.36,0-8.51-4.63-13.56-15.57-13.56H812.71v26.92Z"/>
            <path  d="M859.82,286.34h9.57v77.82h-9.57Z"/>
            <path  d="M905.25,305.58c10.73,0,18.09,5.47,21.45,11.47V306.53h9.68v57.63H926.7V353.43c-3.47,6.21-10.93,11.68-21.56,11.68-15.35,0-27.23-12.1-27.23-30S889.79,305.58,905.25,305.58Zm1.89,8.31c-10.51,0-19.45,7.68-19.45,21.24s8.94,21.56,19.45,21.56,19.56-7.88,19.56-21.45C926.7,321.88,917.66,313.89,907.14,313.89Z"/>
            <path  d="M950.47,314.42H943v-7.89h7.47V292H960v14.51h15v7.89H960v34c0,5.68,2.1,7.68,8,7.68h7v8.1h-8.62c-10.2,0-16-4.21-16-15.78Z"/>
            <path  d="M984.22,314.42h-7.46v-7.89h7.46v-4.1c0-12.83,6.31-18.62,21-18.62v8c-8.63,0-11.47,3.15-11.47,10.62v4.1h12.1v7.89h-12.1v49.74h-9.57Z"/>
            <path  d="M1038,365.11c-16.3,0-28.71-11.57-28.71-29.87s12.83-29.66,29.13-29.66,29.13,11.47,29.13,29.66S1054.37,365.11,1038,365.11Zm0-8.42c10,0,19.77-6.83,19.77-21.45s-9.57-21.35-19.45-21.35c-10.1,0-19.25,6.84-19.25,21.35S1028,356.69,1038,356.69Z"/>
            <path  d="M1085.49,364.16h-9.57V306.53h9.57v9.36c3.26-6.42,9.47-10.41,18.62-10.41v9.88h-2.53c-9.15,0-16.09,4.1-16.09,17.46Z"/>
            <path  d="M1194.12,331.56c0-11.78-6.31-17.77-15.77-17.77-9.68,0-16.3,6.2-16.3,18.61v31.76h-9.47v-32.6c0-11.78-6.31-17.77-15.77-17.77-9.67,0-16.3,6.2-16.3,18.61v31.76h-9.57V306.53h9.57v8.31c3.79-6.1,10.62-9.36,18.19-9.36,9.47,0,17.36,4.2,21.14,12.83,3.37-8.31,11.57-12.83,20.4-12.83,13.15,0,23.35,8.2,23.35,24.71v34h-9.47Z"/>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>
  );
}

export const Icon = () => {

        const classes = useStyles();

        return (
                <img src={IconPlataform} className={classes.icon} alt="platform logo"/>
        );
      }
      

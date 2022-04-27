import React from 'react'
import BContainer from '../../Base/BContainer/BContainer'
import BGrid from '../../Base/BGrid/BGrid'
import BBox from '../../Base/BBox/BBox'
import BButton from '../../Base/BButton/BButton'
import BLink from '../../Base/BLink/BLink'
import BCheckBox from '../../Base/BCheckBox/BCheckBox'
import BStack from '../../Base/BStack/BStack'
import BPaper from '../../Base/BPaper/BPaper'
import BTypography from '../../Base/BTypography/BTypography'
import BTextField from '../../Base/BTextField/BTextField'
import { styled } from '@mui/system'
import style from './style.css'
import { Typography } from '@mui/material'
import logo from '../../images/logo.png'
import config from '../../config'
import { ConstructionOutlined } from '@mui/icons-material'

const Item = styled(BPaper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(3),
  borderRadius: config.theme.boxRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '410px'
}))

const SignIn = () => { 
  document.title = config.urls.signIn.name + ' | ' + config.app.name
  return (
    <BGrid className={style.mainContainer}>
      <Item>
        <img src={logo} alt='' className={style.logo} />
        <BStack spacing='1.2rem'>
          <div>
          <BTextField label='Email / User name' type='email' fullWidth />
          </div>
          <div>
          <BTextField label='Password' type='password' fullWidth />
          </div>
          <div>            
            <BStack flexDirection='row' justifyContent='space-between' alignItems='center'>
              <BCheckBox label='Remember me' color='primary'/>
              <BLink>Forgot Password?</BLink>
            </BStack>              
          </div>
        </BStack>          
        <BStack>
          <BButton buttonType='signIn' onClick={() => alert('aaa')}>Sign in</BButton>
        </BStack>       
      </Item>
    </BGrid>
  );
};

export default SignIn;
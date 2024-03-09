import { AppBar, Toolbar } from '@mui/material'
import { Logo } from './shared/Logo'

export const Header = () => {
  return (
    <AppBar sx={{bgcolor: 'transparent',position: 'static', boxShadow:'none'}}>
        <Toolbar sx={{display: 'flex'}}>
            <Logo/>
        </Toolbar>
    </AppBar>
  )
}

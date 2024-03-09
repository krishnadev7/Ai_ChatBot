import { AppBar, Toolbar } from '@mui/material'
import { Logo } from './shared/Logo'
import NavLink from './shared/NavLink'
import { useAuth } from '../context/AuthContext'

export const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor: 'transparent',position: 'static', boxShadow:'none'}}>
        <Toolbar sx={{display: 'flex'}}>
            <Logo/>
            <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
        </Toolbar>
    </AppBar>
  )
}

import {React} from 'react'
import { Provider } from 'react-redux';
import store from '../store';
import ConnectionProvider from '../components/ConnectionProvider';
import Navbarx from '../components/Navbarx'
import { Outlet } from 'react-router-dom'
function Layout() {
    
  return (
    <>
    {/* <Navbarx ></Navbarx> */}
     <Provider store={store}>
       <ConnectionProvider> 
       <Outlet>
        </Outlet>
      </ConnectionProvider>
     </Provider>
    </>
  )
}

export default Layout
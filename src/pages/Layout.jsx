import {React} from 'react'
import { Provider } from 'react-redux';
import store from '../store';
import ConnectionProvider from '../components/ConnectionProvider';
import { Outlet } from 'react-router-dom'
function Layout() {

  return (
     <Provider store={store}>
       <ConnectionProvider> 
       <Outlet>
        </Outlet>
      </ConnectionProvider>
     </Provider>
  )
}

export default Layout
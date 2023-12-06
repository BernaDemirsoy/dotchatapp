import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Home() {
  const connection = useSelector(state => state.connection);
  const connectionId = useSelector(state => state.connectionId);
  return (
    <section>
        <Outlet connection={connection} connectionId={connectionId}>
        </Outlet>
    </section>
  )
}

export default Home
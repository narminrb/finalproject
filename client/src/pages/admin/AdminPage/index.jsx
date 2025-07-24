import React from 'react'
import AdminHomeCategory from '../shared/AdminHomeAbout'
import AdminHomePopular from '../shared/AdminHomeChoose'
import AdminHomeBlog from '../shared/AdminHomeBlog'

const AdminPage = () => {
  return (
    <div>
      <AdminHomeCategory/>
      <AdminHomePopular />
      <AdminHomeBlog/>

      
    </div>
  )
}

export default AdminPage
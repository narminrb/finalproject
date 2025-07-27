import React from 'react'
import AdminHomeCategory from '../shared/AdminHomeAbout'
import AdminHomePopular from '../shared/AdminHomeChoose'
import AdminHomeHeaderSlider from '../shared/AdminHomeSlider'

const AdminPage = () => {
  return (
    <div>
      <AdminHomeHeaderSlider/>
      <AdminHomeCategory/>
      <AdminHomePopular />
      {/* <AdminHomeBlog/> */}

      
    </div>
  )
}

export default AdminPage
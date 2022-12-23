import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MAIN_PATH, SEARCH_PATH } from '../../constants'
import MainPage from '../../feature/MainPage'
import SearchPage from '../../feature/SearchPage'

const AppRouting = () => {
  return (
    <Routes>
      <Route path={MAIN_PATH} element={<MainPage />} />
      <Route path={SEARCH_PATH} element={<SearchPage />} />
    </Routes>
  )
}

export default AppRouting
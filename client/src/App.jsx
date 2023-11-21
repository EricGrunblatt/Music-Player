import './App.css'
import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Homepage from './components/Homepage'
import Library from './components/Library'
import Search from './components/Search'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Homepage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/search" element={<Search />} />
    </Route>
  )
)

export default function App({routes}) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

import React from 'react'
import Main2 from '../components/Main2'
import useDocumentTitle from '../Hooks/useDocumentTitle'

function Landingpage() {
  useDocumentTitle('Home')
  return (
    <>
    <Main2/>
    </>
  )
}

export default Landingpage
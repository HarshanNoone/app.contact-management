import { useState } from 'react'
import AllContacts from './components/allContacts'
import CreateContact from './components/createContact'

function App() {
  const [currentPage, setCurrentPage] = useState('all-contacts')

  const navigateToCreateContact = () => {
    setCurrentPage('create-contact')
  }

  const navigateToAllContacts = () => {
    setCurrentPage('all-contacts')
  }

  return (
    <>
      {currentPage === 'all-contacts' && (
        <AllContacts onNavigateToCreate={navigateToCreateContact} />
      )}
      {currentPage === 'create-contact' && (
        <CreateContact onNavigateBack={navigateToAllContacts} />
      )}
    </>
  )
}

export default App

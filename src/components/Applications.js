import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ApplicationService from '../services/application.service'
import AuthService from '../services/auth.service'
import AddApplication from './AddApplication'
import ApplicationRow from './ApplicationRow'
import { ROW_HEADERS } from '../constants/row-headers'
import AuthVerify from '../common/AuthVerify'

const Applications = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [notification, setNotification] = useState()
  const [currentSort, setCurrentSort] = useState('Company')
  const [currentSortOrder, setCurrentSortOrder] = useState('asc')
  const currentUser = AuthService.getCurrentUser()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  useEffect(() => {
    ApplicationService.getApplications()
      .then((response) => {
        setApplications(() => response.data)
      })
      .catch((error) => {
        console.log(error)
        setNotification({
          message: 'Erreur lors de la récupération des candidatures',
          color: 'danger',
        })
      })
  }, [])

  const handleRowDelete = (id) => {
    ApplicationService.deleteApplication(id)
      .then(() => {
        setApplications(
          applications.filter((application) => application.id !== id)
        )
        setNotification({
          message: 'Candidature supprimée',
          color: 'danger',
        })
      })
      .catch((error) => {
        console.log(error)
        setNotification({
          message: 'Erreur lors de la suppression de la candidature',
          color: 'danger',
        })
      })
  }

  const renderHeaders = () => {
    return ROW_HEADERS.map((header) => (
      <th
        key={header}
        style={{ cursor: 'pointer' }}
        onClick={() => handleSort(header)}
      >
        {header}
        {header !== 'actions' && (
          <i
            className={
              header === currentSort && currentSortOrder === 'asc'
                ? 'bi bi-chevron-up'
                : 'bi bi-chevron-down'
            }
            style={{ fontSize: 12 }}
          ></i>
        )}
      </th>
    ))
  }

  const handleSort = (header) => {
    if (currentSort === header) {
      setCurrentSortOrder(() => (currentSortOrder === 'asc' ? 'desc' : 'asc'))
    } else {
      setCurrentSort(() => header)
      setCurrentSortOrder(() => 'asc')
    }
  }

  const sortedApplications = applications.slice().sort((a, b) => {
    if (a[currentSort] < b[currentSort]) {
      return currentSortOrder === 'asc' ? -1 : 1
    }
    if (a[currentSort] > b[currentSort]) {
      return currentSortOrder === 'asc' ? 1 : -1
    }
    return 0
  })

  const renderSortedApplications = () => {
    return sortedApplications.length > 0 ? (
      sortedApplications.map((application) => (
        <ApplicationRow
          key={application.id}
          application={application}
          handleRowDelete={handleRowDelete}
          setNotification={setNotification}
        />
      ))
    ) : (
      <tr>
        <td colSpan='10'>No applications</td>
      </tr>
    )
  }

  return (
    <div className='container-fluid'>
      <h3>Applications</h3>
      {notification && (
        <div
          className={`alert alert-${notification.color} alert-dismissible`}
          role='alert'
        >
          <div>
            {notification.message}
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
            ></button>
          </div>
        </div>
      )}
      <AddApplication
        setApplications={setApplications}
        setNotification={setNotification}
      />
      <div className='table-responsive-xxl'>
        <table className='table table-bordered table-hover'>
          <thead>
            <tr>{renderHeaders()}</tr>
          </thead>
          <tbody className='table-group-divider'>
            {renderSortedApplications()}
          </tbody>
        </table>
      </div>
      <AuthVerify logOut={AuthService.logout} />
    </div>
  )
}

export default Applications

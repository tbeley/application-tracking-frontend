import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ApplicationService from '../services/application.service'
import * as Yup from 'yup'

const ApplicationRow = ({ application, handleRowDelete, setNotification }) => {
  const STATUS = [
    { name: 'Envoyée', color: 'primary' },
    { name: 'Entretien programmé', color: 'info' },
    { name: 'Acceptée', color: 'success' },
    { name: 'Refusée', color: 'secondary' },
  ]
  const [applicationInfos, setApplicationInfos] = useState(application)
  const [edit, setEdit] = useState(false)

  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    company: Yup.string().required('Company is required.'),
    company_infos: Yup.string(),
    job: Yup.string().required('Job is required.'),
    date: Yup.string().required('Date is required.'),
    method: Yup.string().required('Method is required.'),
    description: Yup.string(),
    contact: Yup.string(),
    comment: Yup.string(),
    source: Yup.string().required('Source is required.'),
  })

  const form = useForm({
    defaultValues: {
      company: applicationInfos.company,
      company_infos: applicationInfos.company_infos,
      job: applicationInfos.job,
      date: applicationInfos.date,
      method: applicationInfos.method,
      description: applicationInfos.description,
      contact: applicationInfos.contact,
      comment: applicationInfos.comment,
      source: applicationInfos.source,
    },
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    data.status = applicationInfos.status
    setLoading(() => true)
    ApplicationService.updateApplication(applicationInfos.id, data)
      .then((response) => {
        setLoading(() => false)
        setEdit(() => false)
        setApplicationInfos(() => response.data.application)
        setNotification({
          message: 'Candidature mise à jour',
          color: 'success',
        })
      })
      .catch((error) => {
        setLoading(() => false)
        console.log(error)
        setNotification({
          message: 'Erreur lors de la mise à jour de la candidature',
          color: 'danger',
        })
      })
  }

  const handleStatusChange = (e) => {
    ApplicationService.updateStatus(
      applicationInfos.id,
      parseInt(e.target.value)
    )
      .then((response) => {
        setApplicationInfos(() => response.data.application)
      })
      .catch((error) => {
        setLoading(() => false)
        console.log(error)
        setNotification({
          message: 'Erreur lors de la mise à jour du status',
          color: 'danger',
        })
      })
  }

  const showModal = () => {
    const modal = document.querySelector(`#modal-${applicationInfos.id}`)
    modal.style.display = 'block'
  }

  const hideModal = () => {
    const modal = document.querySelector(`#modal-${applicationInfos.id}`)
    modal.style.display = 'none'
  }

  const handleDelete = (force) => {
    if (force) {
      handleRowDelete(applicationInfos.id)
      hideModal()
    } else {
      hideModal()
    }
  }

  return (
    <tr className={`table-${STATUS[applicationInfos.status].color}`}>
      {edit ? (
        <>
          <td>
            <div className='mb-3'>
              <textarea
                name='company'
                {...form.register('company')}
                className={`form-control ${
                  form.formState.errors.company ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.company?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <textarea
                name='company_infos'
                {...form.register('company_infos')}
                className={`form-control ${
                  form.formState.errors.company_infos ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.company_infos?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <textarea
                name='job'
                {...form.register('job')}
                className={`form-control ${
                  form.formState.errors.job ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.job?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <input
                type='date'
                name='date'
                {...form.register('date')}
                className={`form-control ${
                  form.formState.errors.date ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.date?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <textarea
                name='method'
                {...form.register('method')}
                className={`form-control ${
                  form.formState.errors.method ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.method?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <textarea
                name='description'
                {...form.register('description')}
                className={`form-control ${
                  form.formState.errors.description ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.description?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <textarea
                type='text'
                name='contact'
                {...form.register('contact')}
                className={`form-control ${
                  form.formState.errors.contact ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.contact?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <textarea
                name='comment'
                {...form.register('comment')}
                className={`form-control ${
                  form.formState.errors.comment ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.comment?.message}
              </div>
            </div>
          </td>
          <td>
            <div className='mb-3'>
              <textarea
                name='source'
                {...form.register('source')}
                className={`form-control ${
                  form.formState.errors.source ? 'is-invalid' : ''
                }`}
              />
              <div className='invalid-feedback'>
                {form.formState.errors.source?.message}
              </div>
            </div>
          </td>
        </>
      ) : (
        <>
          <td>{applicationInfos.company}</td>
          <td>{applicationInfos.company_infos}</td>
          <td>{applicationInfos.job}</td>
          <td>{applicationInfos.date}</td>
          <td>{applicationInfos.method}</td>
          <td>{applicationInfos.description}</td>
          <td>{applicationInfos.contact}</td>
          <td>{applicationInfos.comment}</td>
          <td>{applicationInfos.source}</td>
        </>
      )}

      <td>
        <select
          className='form-select'
          onChange={handleStatusChange}
          defaultValue={applicationInfos.status}
        >
          {STATUS.map((status, index) => (
            <option value={index} key={index}>
              {status.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <div className='btn-group' role='group'>
          {edit ? (
            <button
              className='btn btn-success btn-sm'
              type='submit'
              onClick={form.handleSubmit(onSubmit)}
            >
              {loading ? (
                <span
                  className='spinner-grow spinner-grow-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
              ) : (
                <i className='bi bi-check'></i>
              )}
            </button>
          ) : (
            <button className='btn btn-danger btn-sm' onClick={showModal}>
              <i className='bi bi-trash'></i>
            </button>
          )}
          <button
            className='btn btn-primary btn-sm'
            onClick={() => setEdit((prev) => !prev)}
          >
            <i className='bi bi-pen'></i>
          </button>
        </div>
        <div
          className='modal'
          id={`modal-${applicationInfos.id}`}
          tabIndex='-1'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Supprimer</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={hideModal}
                ></button>
              </div>
              <div className='modal-body'>
                <p>Êtes-vous sûr de vouloir supprimer cette candidature ?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={hideModal}
                >
                  Annuler
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => handleDelete(true)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default ApplicationRow

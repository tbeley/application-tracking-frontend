import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ApplicationService from '../services/application.service'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const AddApplication = ({ setApplications, setNotification }) => {
  const [loading, setLoading] = useState(false)
  const [opened, setOpened] = useState(false)

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
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    setLoading(() => true)
    ApplicationService.createApplication(data)
      .then((response) => {
        const newApplication = response.data.application
        setApplications((prev) => [...prev, newApplication])
        setLoading(() => false)
        setOpened(() => false)
        setNotification({
          message: 'Candidature ajoutée',
          color: 'success',
        })
      })
      .catch((error) => {
        setLoading(() => false)
        console.log(error)
        setNotification({
          message: "Erreur lors de l'ajout de la candidature",
          color: 'danger',
        })
      })
  }
  return (
    <>
      <button
        className={opened ? 'btn btn-danger' : 'btn btn-primary'}
        onClick={() => setOpened((prev) => !prev)}
      >
        {opened ? (
          <i className='bi bi-x-circle'></i>
        ) : (
          <i className='bi bi-plus-circle'></i>
        )}
      </button>
      {opened && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <table className='table'>
            <thead>
              <tr>
                <th>Company</th>
                <th>Company infos</th>
                <th>Job</th>
                <th>Date</th>
                <th>Method</th>
                <th>Description</th>
                <th>Contact</th>
                <th>Comment</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
              </tr>
            </tbody>
          </table>
          {loading ? (
            <button className='btn btn-success' type='button' disabled>
              <span
                className='spinner-grow spinner-grow-sm'
                role='status'
                aria-hidden='true'
              ></span>{' '}
              Enregistrement...
            </button>
          ) : (
            <button className='btn btn-success' type='submit'>
              Ajouter
            </button>
          )}
        </form>
      )}
    </>
  )
}

export default AddApplication

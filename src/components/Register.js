import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required.')
      .min(3, 'Username must be at least 3 characters.'),
    email: Yup.string()
      .email()
      .required('Username is required.')
      .min(3, 'Username must be at least 3 characters.'),
    password: Yup.string()
      .required('Password is required.')
      .min(6, 'Password must be at least 6 characters.'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    setLoading(() => true)
    AuthService.register(data.username, data.email, data.password).then(
      () => {
        navigate('/login')
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        console.log(resMessage)
        setLoading(() => false)
      }
    )
  }

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              {...register('username')}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.username?.message}</div>
          </div>
          <div className='form-group'>
            <label htmlFor='username'>Email</label>
            <input
              type='email'
              name='email'
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.email?.message}</div>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.password?.message}</div>
          </div>
          <div className='form-group'>
            <button className='btn btn-primary btn-block' disabled={loading}>
              {loading && (
                <span className='spinner-border spinner-border-sm'></span>
              )}
              <span>Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

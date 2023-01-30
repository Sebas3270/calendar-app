import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { useAuthStore } from '../../hooks'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import registerImage from '../../assets/register.jpg'
import loginImage from '../../assets/login.jpg'

export const LogInPage = () => {

  const { logIn, signUp, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      toast.error(errorMessage)
    }
  }, [errorMessage])


  return (
    <>
      <ToastContainer position='top-right' />
      <LogInLayout>
        <DividerContainer1>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values, { setSubmitting }) => {
              await logIn(values.email, values.password)
              setSubmitting(false)
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (

              <FormContainer onSubmit={handleSubmit}>
                <Title>Sign In</Title>
                <InputContainer>
                  <label htmlFor='email'>Email</label>
                  <input
                    type="email"
                    name='email'
                    // placeholder='Email'
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </InputContainer>
                <InputContainer>
                  <label htmlFor='password'>Password</label>
                  <input
                    name='password'
                    type="password"
                    // placeholder='Password'
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </InputContainer>
                <ButtonLogIn type='submit' disabled={isSubmitting}>Log In</ButtonLogIn>
              </FormContainer>

            )}
          </Formik>
        </DividerContainer1>

        <DividerContainer2>
          <Formik
            initialValues={{ name: '', email: '', password: '', password2: '' }}
            onSubmit={async (values, { setSubmitting }) => {

              if (values.password !== values.password2) {
                toast.error("Passwords don't match");
                return;
              }

              await signUp(values.name, values.email, values.password)

              setSubmitting(false)
            }}
          >

            {({
              values,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (

              <FormContainer onSubmit={handleSubmit}>
                <Title>Sign Up</Title>
                <InputContainer>
                  <label htmlFor="name">Name</label>
                  <input
                    name='name'
                    type="text"
                    // placeholder='Name'
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </InputContainer>
                <InputContainer>
                  <label htmlFor='email'>Email</label>
                  <input
                    name='email'
                    type="email"
                    // placeholder='Email'
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </InputContainer>
                <InputContainer>
                  <label htmlFor="password">Password</label>
                  <input
                    name='password'
                    type="password"
                    // placeholder='Password'
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputContainer>
                <InputContainer>
                <label htmlFor="password2">Repeat password</label>
                <input
                  name='password2'
                  type="password"
                  // placeholder='Repeat password'
                  value={values.password2}
                  onChange={handleChange}
                />
                </InputContainer>
                <ButtonLogIn type='submit' disabled={isSubmitting}>Register</ButtonLogIn>
              </FormContainer>

            )}


          </Formik>
        </DividerContainer2>

      </LogInLayout>
    </>
  )
}

const LogInLayout = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr 1fr;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 350px;

    color: white;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    label{
      color: #dedede;
    }

    input, textarea{
        border: none;
        background-color: #f3f3f3;
        border-radius: 7px;
        padding: 5px;
        width: 100%;
        transition: all 0.2s ease-in-out;

        resize: vertical;

        /* border: 2px solid black; */

        &:focus {
            outline: none;
        }
    }
`

const Title = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 15px;

  /* -webkit-text-stroke: 1.5px black; */
`

const ButtonLogIn = styled.button`
  border: none;
  padding: 5px 0;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 10px;
  background-color: #f3f3f3;
  font-weight: 700;
  border: 2.5px solid black;
`

const DividerContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${loginImage});
  transition: all 0.2s ease-in;

  &:hover{
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${loginImage});
  }
`

const DividerContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${registerImage});
  transition: background 0.6s ease-in;

  &:hover{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${registerImage});
  }
`
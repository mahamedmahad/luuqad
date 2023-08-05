"use client"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import * as Yup from "yup"
import baseUrl from "@/utils/baseUrl"

interface Values {
  title: string
  description: string
  status: number
  section_id: number
}

interface initialProps {
  title: string
  description: string
  status: number
}

const CreateQuestion = () => {
  const router = useRouter()
  const [sections, setSections] = React.useState([])

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/units/sections`)
      .then((res) => {
        setSections(res.data.sections)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const initialValues: initialProps = {
    title: "",
    description: "",
    status: 1,
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.number().required("Status is required"),
    section_id: Yup.number().required("Unit is required"),
  })

  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get("callbackUrl") || "/admin/units/sections/questions"

  const onSubmit = async (values: Values) => {
    try {
      const question = {
        title: values.title,
        description: values.description,
        status: Number(values.status),
        section_id: Number(values.section_id),
      }

      const res = await fetch("/api/units/sections/questions/create", {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.status == 200) {
        router.push(callbackUrl)
      } else {
        console.log(res.status)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className='flex  justify-center min-h-full px-4 sm:px-6 lg:px-8'>
      <div className='max-w-sm'>
        <div>
          <h1 className='text-3xl font-extrabold text-center'>
            Create Question
          </h1>
        </div>
        <Formik
          initialValues={initialValues as any}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <Form>
            <div className='flex flex-col items-center justify-center gap-3 mt-8'>
              <div className='relative mt-2'>
                <Field
                  type='text'
                  name='title'
                  autoComplete='none'
                  required
                  className='relative items-center justify-center block px-3 px-4 py-3 bg-gray-100 border appearance-none rounded-xl w-96 border-black-299 focus:outline-none ring-2 ring-gray-300'
                  placeholder='title'
                />
                <div className='mt-5'></div>
                <Field
                  type='text'
                  name='description'
                  autoComplete='none'
                  required
                  className='relative items-center justify-center block px-3 px-4 py-3 bg-gray-100 border appearance-none rounded-xl w-96 border-black-299 focus:outline-none ring-2 ring-gray-300'
                  placeholder='Description'
                />
                <div className='mt-5 relative'>
                  <Field
                    as='select'
                    required
                    name='section_id'
                    className='relative items-center justify-center block px-3 px-4 py-3 bg-gray-100 border appearance-none rounded-xl w-96 border-black-299 focus:outline-none ring-2 ring-gray-300'>
                    <option value='' disabled selected>
                      Select Section
                    </option>
                    {sections.map((section: any) => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className='mt-5 relative'>
                  <Field
                    as='select'
                    required
                    name='status'
                    className='relative items-center justify-center block px-3 px-4 py-3 bg-gray-100 border appearance-none rounded-xl w-96 border-black-299 focus:outline-none ring-2 ring-gray-300'>
                    <option value='' disabled selected>
                      Select status
                    </option>
                    <option value='1'>Active</option>
                    <option value='0'>Inactive</option>
                  </Field>
                </div>
                {/* forget password link */}
              </div>
            </div>

            <div className='flex flex-col items-center justify-center w-full mt-4 space-y-4 text-center'>
              <button
                type='submit'
                className='w-96 h-12 px-4 pt-2 rounded-xl text-lg tracking-widest bg-blue-400 text-white font-bold hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-[0px_4px_0px_0px_#4299E1]'>
                Create Question
              </button>
            </div>
          </Form>
        </Formik>
        {/* or line */}
      </div>
    </div>
  )
}

export default CreateQuestion
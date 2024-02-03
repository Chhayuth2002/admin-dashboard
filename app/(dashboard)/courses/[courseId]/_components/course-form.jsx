'use client'

import { categoriesList } from '@/app/api/categories'
import { courseCreate } from '@/app/api/courses'
import { tagsList } from '@/app/api/tags'
import { InputFile } from '@/components/input-file'
import { MultiSelect } from '@/components/multi-select'
import { SingleSelect } from '@/components/single-select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Formik, Form, Field, FieldArray } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const initValue = {
  name: '',
  category_id: '',
  image: '',
  summary: '',
  tags: [],
  image: '',
  removeTag: [],
  chapters: [
    {
      name: '',
      summary: '',
      lessons: [
        {
          name: '',
          content: '',
          image: ''
        }
      ]
    }
  ]
}

export const CourseForm = () => {
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await tagsList()

        setTags(res)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchCategories = async () => {
      try {
        const res = await categoriesList()
        setCategories(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
    fetchTags()
  }, [])

  const handleSubmit = async (values, actions) => {
    console.log(values)
    setIsLoading(true)
    try {
      await courseCreate(token, values)

      router.push('/courses')
      toast.success('Succesfully create a course')
      actions.resetForm()
    } catch (error) {
      toast.warning(error?.response?.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initValue}
      onSubmit={handleSubmit}
    >
      {({ values, dirty }) => {
        return (
          <Form className='bg-white p-4 rounded-md border shadow-sm'>
            <div className='border border-slate-300 p-4 rounded-md bg-slate-100'>
              <div className='flex gap-6 '>
                <Field
                  name='name'
                  component={Input}
                  placeholder='Course name'
                />
                <Field
                  name='category_id'
                  options={categories}
                  placeholder='Select category'
                  component={SingleSelect}
                />
              </div>
              <div className='py-2'>
                <Field
                  name='tags'
                  options={tags}
                  component={MultiSelect}
                  placeholder='Select tags'
                />
              </div>
              <div className='py-2'>
                <Field
                  name='summary'
                  component={Textarea}
                  placeholder='Course summary'
                />
              </div>

              <div className='py-2'>
                <Field name='image' component={InputFile} />
              </div>
            </div>

            <section className='pt-2 border-t '>
              <FieldArray name='chapters'>
                {({ remove, push }) => (
                  <>
                    {values.chapters.map((chapterForm, chapterIndex) => (
                      <Accordion
                        key={chapterIndex}
                        collapsible
                        className='w-full '
                        defaultValue='item-0'
                      >
                        <AccordionItem value={`item-${chapterIndex}`}>
                          <AccordionTrigger
                            onClick={() => remove(chapterIndex)}
                          >
                            Chapter: {chapterForm.name || 'Untitle'}
                          </AccordionTrigger>

                          <AccordionContent>
                            <div className='p-2'>
                              <div className='border border-slate-300 bg-slate-200 p-4 rounded-md'>
                                <Field
                                  name={`chapters.${chapterIndex}.name`}
                                  component={Input}
                                  placeholder='Chapter name'
                                />
                                <div className='py-4 border-b'>
                                  <Field
                                    name={`chapters.${chapterIndex}.summary`}
                                    component={Textarea}
                                    placeholder='Chapter summary'
                                  />
                                </div>
                              </div>

                              <FieldArray
                                name={`chapters.${chapterIndex}.lessons`}
                              >
                                {({ remove, push }) => (
                                  <>
                                    {chapterForm.lessons.map(
                                      (lessonForm, lessonIndex) => (
                                        <Accordion
                                          key={lessonIndex}
                                          type='single'
                                          collapsible
                                          className='w-full'
                                          defaultValue='item-0'
                                        >
                                          <AccordionItem
                                            value={`item-${lessonIndex}`}
                                          >
                                            <AccordionTrigger
                                              onClick={() =>
                                                remove(lessonIndex)
                                              }
                                            >
                                              Lesson:{' '}
                                              {lessonForm.name || 'Untitle'}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                              <div className='p-4 flex flex-col gap-2 border border-slate-300 bg-slate-200 rounded-md'>
                                                <Field
                                                  name={`chapters.${chapterIndex}.lessons.${lessonIndex}.name`}
                                                  component={Input}
                                                  placeholder='Lesson name'
                                                />

                                                <Field
                                                  name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content`}
                                                  component={Textarea}
                                                  placeholder='Lesson content'
                                                />

                                                <Field
                                                  name={`chapters.${chapterIndex}.lessons.${lessonIndex}.image`}
                                                  component={InputFile}
                                                />
                                              </div>
                                            </AccordionContent>
                                          </AccordionItem>
                                        </Accordion>
                                      )
                                    )}

                                    <div className='flex items-center justify-center pt-2'>
                                      <Button
                                        type='button'
                                        onClick={() =>
                                          push({
                                            name: '',
                                            content: '',
                                            image: ''
                                          })
                                        }
                                      >
                                        Add new Lesson
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </FieldArray>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}

                    <div className='flex items-center justify-center pt-2'>
                      <Button
                        type='button'
                        onClick={() =>
                          push({
                            name: '',
                            summary: '',
                            lessons: [
                              {
                                name: '',
                                content: '',
                                image: ''
                              }
                            ]
                          })
                        }
                      >
                        Add new Chapter
                      </Button>
                    </div>
                  </>
                )}
              </FieldArray>
            </section>
            <Button
              className='mt-2'
              type='submit'
              disabled={!dirty || isLoading}
            >
              Submit
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

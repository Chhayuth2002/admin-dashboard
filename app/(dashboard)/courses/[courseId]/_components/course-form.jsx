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
import React from 'react'

const initValue = {
  name: '',
  category_id: '',
  image_url: '',
  summary: '',
  tags: [],
  removeTag: [],
  chapters: [
    {
      name: '',
      summary: '',
      lessons: [
        {
          name: '',
          content: '',
          image_url: ''
        },
        {
          name: '',
          content: '',
          image_url: ''
        },
        {
          name: '',
          content: '',
          image_url: ''
        }
      ]
    },
    {
      name: '',
      summary: '',
      lessons: [
        {
          name: '',
          content: '',
          image_url: ''
        }
      ]
    }
  ]
}

export const CourseForm = () => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initValue}
      onSubmit={values => console.log(values)}
    >
      {({ values, dirty, resetForm, setValues }) => {
        return (
          <Form>
            <div className='flex gap-6'>
              <Field name='name' component={Input} placeholder='Course name' />
              <Field name='name' component={Input} placeholder='Category' />
            </div>
            <div className='pt-4'>
              <Field name='name' component={Input} placeholder='Tag' />
            </div>
            <div className='py-4'>
              <Field
                name='summary'
                component={Textarea}
                placeholder='Course summary'
              />
            </div>

            <section className='pt-2 border-t'>
              {/* <div className='py-2'>
                <h1 className=' font-semibold text-lg'>Chapter</h1>
              </div> */}
              <FieldArray name='chapters'>
                {({ remove, push }) => (
                  <>
                    {values.chapters.map((chapterForm, chapterIndex) => (
                      <Accordion
                        key={chapterIndex}
                        collapsible
                        className='w-full'
                      >
                        <AccordionItem value={`item-${chapterIndex}`}>
                          <AccordionTrigger
                            onClick={() => remove(chapterIndex)}
                          >
                            Chapter: {chapterForm.name || 'Untitle'}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className='p-2'>
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
                                              <div className='p-2'>
                                                <Field
                                                  name={`chapters.${chapterIndex}.lessons.${lessonIndex}.name`}
                                                  component={Input}
                                                  placeholder='Lesson name'
                                                />
                                                <div className='py-4'>
                                                  <Field
                                                    name={`chapters.${chapterIndex}.lessons.${lessonIndex}.content`}
                                                    component={Textarea}
                                                    placeholder='Lesson content'
                                                  />
                                                </div>
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
                                            image_url: ''
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
                                image_url: ''
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

            <Button className='mt-2' type='submit'>
              Submit
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

/* eslint-disable @next/next/no-img-element */
'use client'

import { BarChart } from '@/components/bar-chart'
import { Card } from '@/components/card'
import { PageContainer } from '@/components/page-container'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'
import { useSelector } from 'react-redux'

const cardData = [
  {
    label: 'Total Revenue',
    amount: '$45,231.89',
    discription: '+20.1% from last month',
    icon: DollarSign
  },
  {
    label: 'Subscriptions',
    amount: '+2350',
    discription: '+180.1% from last month',
    icon: Users
  },
  {
    label: 'Sales',
    amount: '+12,234',
    discription: '+19% from last month',
    icon: CreditCard
  },
  {
    label: 'Active Now',
    amount: '+573',
    discription: '+201 since last hour',
    icon: Activity
  }
]

const uesrSalesData = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    saleAmount: '+$1,999.00',
    icon: 'Coco'
  },
  {
    name: 'Jackson Lee',
    email: 'isabella.nguyen@email.com',
    saleAmount: '+$1,999.00',
    icon: 'Simon'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    saleAmount: '+$39.00',
    icon: 'Smokey'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    saleAmount: '+$299.00',
    icon: 'Buster'
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    saleAmount: '+$39.00',
    icon: 'Jack'
  }
]

const DashboardPage = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <PageContainer
      title='Dasboard'
      description={`Welcome ${user?.username} to our Course Management Dashboard`}
    >
      <div className='flex flex-col gap-5 w-full'>
        <section className='grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4'>
          {cardData.map((card, index) => (
            <Card
              key={index}
              label={card.label}
              description={card.discription}
              icon={card.icon}
              total={card.amount}
            />
          ))}
        </section>
        <section className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
          <div className='flex w-full flex-col gap-3 rounded-xl border p-5 shadow bg-white'>
            <p className='p-4 font-semibold'>Overview</p>
            <BarChart />
          </div>

          <div className='flex w-full flex-col gap-3 rounded-xl border p-5 shadow bg-white'>
            <p className=' font-semibold'>Recent Courses</p>
            <p className='text-sm text-gray-400'>hahaha</p>
            {uesrSalesData.map((data, index) => (
              <div key={index} className='flex flex-wrap justify-between gap-3'>
                <section className='flex justify-between gap-3 '>
                  <div className='h-12 w-12 rounded-full bg-gray-100 p-1'>
                    <img
                      width={200}
                      height={200}
                      src={
                        'https://api.dicebear.com/7.x/notionists/svg?seed=' +
                        data.icon
                      }
                      alt='avatar'
                    />
                  </div>
                  <div className='text-sm'>
                    <p className=''>{data.name}</p>
                    <div className=' text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400'>
                      {data.email}
                    </div>
                  </div>
                </section>
                <section className='mt-2'>
                  <p className='text-lg'>{data.saleAmount}</p>
                </section>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  )
}

export default DashboardPage

import React from 'react'
import { shallow, mount, render } from 'enzyme'
import faker from 'faker'
import { __RewireAPI__ as RewiredAPI } from './LibAnswersWidget'

const LibAnswersItem = RewiredAPI.__get__("LibAnswersItem")

describe('LibAnswersItem component', () => {

  const record = { 
    question: faker.company.companyName(),
    url: faker.internet.url(),
    topics: [
      'Bento &amp;',
      'Test'
    ]
  }
  const title = 'Bento &, Test'

  it('should render without throwing an error', () => {
    expect(shallow(<LibAnswersItem record = { record } />).exists(<div className='item'></div>)).toBe(true)
  })

  it('should render item title html-decoded', () => {
    let wrapper = shallow(<LibAnswersItem record = { record } />)
    expect(wrapper.find('.types').text()).toEqual(title)
  })

})

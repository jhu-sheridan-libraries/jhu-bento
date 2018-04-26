  import React from 'react'
  import { shallow, mount, render } from 'enzyme'
  import Widget from './Widget'
  import faker from 'faker'

  describe('Widget Component', () => {
    it('should render without throwing an error', () => {
      expect(shallow(<Widget />).exists(<div className='bento-box'></div>)).toBe(true)
    })

    it('should renders a title', () => {
      let title = faker.company.companyName()
      let wrapper = shallow(<Widget title={ title } />)
      expect(wrapper.find('h3').text()).toEqual(title)
    })

    it('should show the loading indicator', () => {
      let wrapper = shallow(<Widget isFetching={ true } />)
      expect(wrapper.find('.loading').length).toEqual(1)
    })
  })
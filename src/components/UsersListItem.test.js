import {shallow} from '@vue/test-utils'
import UsersListItem from './UsersListItem.vue'
describe('UsersListItem.vue', () => {
  let wrapper
  beforeEach(() => {
    const requiredProps = {id: 0}
    wrapper = shallow(UsersListItem, {propsData: requiredProps})
  })

  describe('props', () => {
    test('propsを受け取れること', () => {
      wrapper.setProps({
        id: 0,
        firstName: 'Tarou',
        lastName: 'Yamada',
        gender: 'male',
      })
      expect(wrapper.vm.$props.id).toBe(0)
      expect(wrapper.vm.$props.firstName).toBe('Tarou')
      expect(wrapper.vm.$props.lastName).toBe('Yamada')
      expect(wrapper.vm.$props.gender).toBe('male')
    })

    test('propsの型が期待してる通りか', () => {
      expect(typeof wrapper.vm.$props.id).toBe('number')
      expect(typeof wrapper.vm.$props.firstName).toBe('string')
      expect(typeof wrapper.vm.$props.lastName).toBe('string')
      expect(typeof wrapper.vm.$props.gender).toBe('string')
    })

    describe('id', () => {
      test('requiredがtrueであること', () => {
        const {id} = wrapper.vm.$options.props
        expect(id.required).toBe(true)
      })

      test('typeがStringであること', () => {
        const {id} = wrapper.vm.$options.props
        expect(id.type).toBe(Number)
      })
    })
  })

})

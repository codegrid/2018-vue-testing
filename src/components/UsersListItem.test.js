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

  describe('computed', () => {
    describe('fullName', () => {
      test('lastNameとfirstNameを連結した値が返ってくること', () => {
        wrapper.setProps({
          firstName: 'Tarou',
          lastName: 'Yamada',
        })
        expect(wrapper.vm.fullName).toBe('Tarou Yamada')
      })
    })

    describe('isMale & isFemale', () => {
      test('genderがmaleのときisMaleがtrueであること', () => {
        wrapper.setProps({
          gender: 'male',
        })
        expect(wrapper.vm.isFemale).toBe(false)
        expect(wrapper.vm.isMale).toBe(true)
      })

      test('genderがfemaleのときisFemaleがtrueであること', () => {
        wrapper.setProps({
          gender: 'female',
        })
        expect(wrapper.vm.isMale).toBe(false)
        expect(wrapper.vm.isFemale).toBe(true)
      })

    })
  })

  describe('template', () => {
    describe('v-on', () => {
      test('ルート要素のclickでonClickメソッドが実行されること', () => {
        const stub = jest.fn()
        wrapper.setMethods({
          onClick: stub,
        })
        wrapper.trigger('click')
        expect(stub).toHaveBeenCalled()
      })

      test('removeButtonのclickでonClickRemoveメソッドが実行されること', () => {
        const stub = jest.fn()
        wrapper.setMethods({
          onClickRemove: stub,
        })
        const removeButton = wrapper.find('.UsersListItem_RemoveButton')
        removeButton.trigger('click')
        expect(stub).toHaveBeenCalled()
      })
    })

    describe(':class', () => {
      test('genderがmaleのとき_maleクラスが付与されていること', () => {
        wrapper.setProps({
          gender: 'male',
        })
        expect(wrapper.classes()).toContain('_male')
      })

      test('genderがfemaleのとき_femaleクラスが付与されていること', () => {
        wrapper.setProps({
          gender: 'female',
        })
        expect(wrapper.classes()).toContain('_female')
      })
    })
  })

  describe('methods', () => {
    describe('onClick', () => {
      test('selectイベントがemitされること', () => {
        wrapper.vm.onClick()
        expect(wrapper.emitted('select')).not.toBeUndefined()
      })

      test('selectイベントのemitでidを含むオブジェクトが渡されること', () => {
        wrapper.vm.onClick()
        expect(wrapper.emitted('select')[0][0]).toEqual({id: 0})
      })
    })

    describe('onClickRemove', () => {
      test('removeイベントがemitされること', () => {
        wrapper.vm.onClickRemove()
        expect(wrapper.emitted('remove')).not.toBeUndefined()
      })

      test('removeイベントのemitでidを含むオブジェクトが渡されること', () => {
        wrapper.vm.onClickRemove()
        expect(wrapper.emitted('remove')[0][0]).toEqual({id: 0})
      })
    })
  })
})

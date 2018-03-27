import {shallow, mount} from '@vue/test-utils'
import UsersList from './UsersList.vue'
import UsersListItem from './UsersListItem.vue'
import usersMockData from '../users.json'

describe('UsersList', () => {
  describe('shallow', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(UsersList)
    })

    describe('props', () => {
      test('propsを受け取れること', () => {
        wrapper.setProps({
          users: usersMockData,
        })
        expect(wrapper.vm.$props.users).toEqual(usersMockData)
      })

      test('propsを渡さなかったときにusersが空配列になること', () => {
        expect(wrapper.vm.$props.users).toEqual([])
        expect(wrapper.vm.$props.users).toHaveLength(0)
      })
    })

    describe('methods', () => {
      test('onSelectを実行するとselectイベントがemitされること', () => {
        wrapper.vm.onSelect({id: 1})
        expect(wrapper.emitted('select')).toBeTruthy()
      })

      test('onSelect実行時の引数がselectイベントのemitで指定されていること', () => {
        wrapper.vm.onSelect({id: 1})
        expect(wrapper.emitted('select')[0][0]).toEqual({id: 1})
      })

      test('onRemoveを実行するとremoveイベントがemitされること', () => {
        wrapper.vm.onRemove({id: 1})
        expect(wrapper.emitted('remove')).toBeTruthy()
      })

      test('onRemove実行時の引数がremoveイベントのemitで指定されていること', () => {
        wrapper.vm.onRemove({id: 1})
        expect(wrapper.emitted('remove')[0][0]).toEqual({id: 1})
      })
    })

    describe('slot', () => {
      test('default slotにコンテンツが挿入できること', () => {
        const wrapper = shallow(UsersList, {
          slots: {
            default: '<div data-test="slotContent">slot content</div>'
          }
        })
        const slotContent = wrapper.find('[data-test="slotContent"]')
        expect(slotContent.exists()).toBe(true)
        expect(slotContent.text()).toBe('slot content')
      })

      test('名前付きslotにコンテンツが挿入できること', () => {
        const wrapper = shallow(UsersList, {
          slots: {
            footer: '<div data-test="slotContent">slot content</div>'
          }
        })
        const slotContent = wrapper.find('[data-test="slotContent"]')
        expect(slotContent.exists()).toBe(true)
        expect(slotContent.text()).toBe('slot content')
      })
    })

  })

  describe('mount', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(UsersList, {
        propsData: {
          users: usersMockData,
        },
      })
    })

    test('UsersListItemでselectイベントがemitされたときonSelectが呼ばれること', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        onSelect: stub,
      })
      const child = wrapper.find(UsersListItem)
      child.vm.onClick()
      expect(stub).toHaveBeenCalled()
    })

    test('UsersListItemでremoveイベントがemitされたときonRemoveが呼ばれること', () => {
      const stub = jest.fn()
      wrapper.setMethods({
        onRemove: stub,
      })
      const child = wrapper.find(UsersListItem)
      child.vm.onClickRemove()
      expect(stub).toHaveBeenCalled()
    })

  })
})

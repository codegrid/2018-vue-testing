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

      test('usersがarrayであること', () => {
        wrapper.setProps({
          users: usersMockData,
        })
        expect(Array.isArray(wrapper.vm.$props.users)).toBe(true)
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
            default: '<div data-test="defaultSlot">default slot</div>'
          }
        })
        const slotContent = wrapper.find('[data-test="defaultSlot"]')
        expect(slotContent.text()).toBe('default slot')
      })

      test('default slotを指定しない場合にフォールバックコンテンツがレンダリングされること', () => {
        wrapper.find('[data-test="defaultSlot"]')
        const slotContent = wrapper.find('[data-test="defaultSlot"]')
        expect(slotContent.text()).toBe('UsersList')
      })

      test('名前付きslotにコンテンツが挿入できること', () => {
        const wrapper = shallow(UsersList, {
          slots: {
            footer: '<div data-test="footerSlot">footer slot</div>'
          }
        })
        const slotContent = wrapper.find('[data-test="footerSlot"]')
        expect(slotContent.text()).toBe('footer slot')
      })
    })


  })

  describe('mount', () => {

    describe('UsersListItem', () => {
      let wrapper
      beforeEach(() => {
        wrapper = mount(UsersList, {
          propsData: {
            users: usersMockData,
          },
        })
      })
      test('UsersListItemがレンダリングされること', () => {
        expect(wrapper.contains(UsersListItem)).toBe(true)
      })

      test('usersで渡した数だけUsersListItemがレンダリングされること', () => {
        const children = wrapper.findAll(UsersListItem)
        expect(children).toHaveLength(usersMockData.length)
      })

      test('onClickの実行でuserのidを引数にしてonSelectが呼ばれること', () => {
        const stub = jest.fn()
        wrapper.setMethods({
          onSelect: stub,
        })
        const child = wrapper.find(UsersListItem)
        child.vm.onClick()
        expect(stub).toHaveBeenCalled()
        expect(stub).toBeCalledWith({id: 1})
      })

      test('onClickRemoveの実行でuserのidを引数にonRemoveが呼ばれること', () => {
        const stub = jest.fn()
        wrapper.setMethods({
          onRemove: stub,
        })
        const child = wrapper.find(UsersListItem)
        child.vm.onClickRemove()
        expect(stub).toHaveBeenCalled()
        expect(stub).toBeCalledWith({id: 1})
      })

    })

  })
})

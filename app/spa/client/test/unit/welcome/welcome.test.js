import Vue from 'vue'
import Welcome from 'appComp/Welcome/Welcome'

describe('form 组件的相关测试', () => {
  const Ctor = Vue.extend(Welcome)
  const vm = new Ctor().$mount()

  it('展示 welcome！', () => {
    expect(vm.$el.innerText).to.be.equal('Welcome!')
  })
})

import Vue from 'vue'
import Welcome from 'appComp/Welcome/Welcome'

describe('页面组件 Welcome 的相关测试', () => {
  const Ctor = Vue.extend(Welcome)
  const vm = new Ctor().$mount()

  it('展示 welcome！', () => {
    expect(vm.$el.innerText).to.be.equal('Welcome!')
  })
})

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AvatarComponent, { props: { image: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp' } })
    expect(wrapper.exists()).toBe(true)
    // expect(wrapper.text()).toContain('Hello Vitest')
  })
})

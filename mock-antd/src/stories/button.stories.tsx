import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button, { ButtonType, ButtonSize } from '../components/Button/button'

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size={ButtonSize.Large}>Large Button</Button>
    <Button size={ButtonSize.Small} >Large Button</Button>
  </>
)
 
const buttonWithType = () => (
  <>
    <Button btnType={ButtonType.Primary}>Primary Button</Button>
    <Button btnType={ButtonType.Default}>Default Button</Button>
    <Button btnType={ButtonType.Danger}>Danger Button</Button>
    <Button btnType={ButtonType.Link}>Link Button</Button>
  </>
)


storiesOf('Button Component', module)
.add('Button', defaultButton, {info: { inline: false }})
.add('Button Sizes', buttonWithSize)
.add('Button Types', buttonWithType)
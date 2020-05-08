import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>This is mock antd package</h1>
        <h3>Get it a try</h3>
        <code>
          npm install mock-antd --save
        </code>
      </>
    )
  }, { info : { disable: true }})
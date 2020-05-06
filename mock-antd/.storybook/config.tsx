import '../src/styles/index.scss';
import React from 'react'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

addDecorator(withInfo); 
const styles: React.CSSProperties = {
  textAlign: 'center'
}

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>


library.add(fas)

addDecorator(CenterDecorator)
addDecorator(withInfo)
import '../src/styles/index.scss';
import React from 'react'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo); 
const styles: React.CSSProperties = {
  textAlign: 'center'
}

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

addDecorator(CenterDecorator)
addDecorator(withInfo)
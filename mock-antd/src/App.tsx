import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'

import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";
import Upload from './components/Upload/upload';
import { action } from '@storybook/addon-actions';
library.add(fas)

function App() {
  // const [title, setTitle] = useState('')
  // const postData = {
  //   title: 'my title',
  //   body: 'hello world'
  // }
  // useEffect(() => {
  //   axios.post('https://jsonplaceholder.typicode.com/posts', postData)
  //     .then(res => {
  //       console.log(res)
  //       setTitle(res.data.title)
  //     })
  // })
  const checkFileSize = (file: File) => {
    return !(Math.round(file.size / 1024) > 50)
  }

  // const filePromise = (file: File) => {
  //   const newFile = new File([file], 'new_name.docx', {
  //     type: file.type
  //   })
  //   return Promise.resolve(newFile);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0' defaultOpenSubMenus={['2']} mode='horizontal'>
          <MenuItem>
            link 1
          </MenuItem>
          <MenuItem>link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dd 1
            </MenuItem>
            <MenuItem>dd 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <Button btnType={ButtonType.Danger} onClick={() => {alert("Clicked")}}>
          Hello
        </Button>
        <Button disabled>
          Disabled
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
          Small Primary
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" target="_blank">
          百度
        </Button>
        <Button disabled btnType={ButtonType.Link} href="https://www.baidu.com">
          百度
        </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <Upload
          action="https://jsonplaceholder.typicode.com/posts/" 
          onChange={action('changed')}
          beforeUpload={checkFileSize}
          // beforeUpload={filePromise}
        />
      </div>
    </div>
  );
}

export default App;

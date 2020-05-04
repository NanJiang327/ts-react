import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react"
import { waitFor } from "@testing-library/dom"

import Menu, { MenuProps } from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}
const generateReactMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          dd 1
        </MenuItem>
        <MenuItem>dd 2</MenuItem>
      </SubMenu>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile: string = `
  .menu-submenu {
    display: none;
  }
  .menu-submun.menu-opened {
    display: block;
  }
  `

  const style = document.createElement('style')
  style.type = 'text/css';
  style.innerHTML = cssFile
  return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe("Test Menu and MenuItem Component", () => {
  beforeEach(() => {
    wrapper = render(generateReactMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  })
  it("should render correct Menu and MenuItem based on default props button", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("react-menu test")
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it("click items should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('3')
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  })

  it("should render vertical menu when mode is set to vertical", () => {
    cleanup();
    wrapper = render(generateReactMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  // it("should show dropdown items when hover on subMenu", async () => {
  //   expect(wrapper.queryByText('dd 1')).not.toBeVisible();
  //   const dropdownElement = wrapper.getByText('dropdown')
  //   fireEvent.mouseEnter(dropdownElement)
  //   // await waitFor(() => {
  //   //   expect(wrapper.queryByText('dd 1')).toBeVisible()
  //   // })
  //   // fireEvent.click(wrapper.getByText('dd 1'))
  //   // expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
  //   fireEvent.mouseLeave(dropdownElement)
  //   await waitFor(() => expect(wrapper.queryByText('dd 1')).not.toBeVisible())
  // })
})
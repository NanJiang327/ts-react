import React, { FC, useState, useEffect, ChangeEvent, ReactElement, KeyboardEvent, useRef } from 'react'
import Input, { BaseInputProps } from '../Input/input'
import Icon from '../Icon/icon'
import classNames from 'classnames';
import useDebounce from '../../hooks/useDedounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<BaseInputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [ inputValue, setInputValue ] = useState(value as string)
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [hightlightIndex, setHightlightIndex] = useState(-1)
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => { setSuggestions([]) })
  useEffect(() => {
    if (debouncedValue && triggerSearch) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
  }, [debouncedValue])
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
    const value = e.target.value.trim()
    setHightlightIndex(-1)
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const highlightIndex = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHightlightIndex(index)
  }

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[hightlightIndex]) {
          handleSelect(suggestions[hightlightIndex])
        }
        break;
      case 38:
        highlightIndex(hightlightIndex - 1)
        break;
      case 40:
        highlightIndex(hightlightIndex + 1)
        break;
      case 27:
        setSuggestions([])
        break;
      default:
        break;
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'item-highlighted': index === hightlightIndex
          })
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })} 
      </ul>
    )
  }

  return (
    <div className="react-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        {...restProps}
      />
      {loading && <ul><Icon icon='spinner' spin /></ul>}
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  )
}
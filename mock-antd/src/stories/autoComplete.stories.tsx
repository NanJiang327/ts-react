import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from '../components/AutoComplete/autoComplete'

interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const SimpleComplete = () => {
  // const lakers = [{number: 1, value:'bradley'}, {number: 2, value:'pope'}, {number: 3, value:'caruso'}, {number: 4, value:'cook'}, {number: 5, value:'cousins'}, {number: 6, value:'james'}, {number: 7, value:'ad'}, {number: 8, value:'green'}]
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query))
  // }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
          .then(res => 
            res.json()
          )
          .then(res => {
            console.log(res)
            return res.items.slice(0, 10).map((item: { value: any }) => ({value: item.value, ...item}))
          })
  }
  const renderOption = (item: DataSourceType<GithubUserProps>) => {
    return (
      <>
        <h2>Name: {item.login}</h2>
        <p>url: {item.url}</p>
      </>
    )
  }
  return (
    <AutoComplete 
     fetchSuggestions={handleFetch}
     onSelect={action('selected')}
    //  renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete Component', module)
.add('Simple Complete', SimpleComplete)
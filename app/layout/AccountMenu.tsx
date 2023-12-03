import { MenuItem, Typography } from '@mui/material'
import React from 'react'

interface MenuOption {
  label: string
  onChange: () => void
}

interface MenuProps {
  options: MenuOption[]
}

const Menu: React.FC<MenuProps> = ({ options }) => {
  return (
    <>
      {options.map((option) => (
        <MenuItem key={option.label} onClick={option.onChange}>
          <Typography textAlign='center'>{option.label}</Typography>
        </MenuItem>
      ))}
    </>
  )
}

const settings: MenuOption[] = [
  {
    label: 'プロフィール',
    onChange: () => {
      // Your logic for handling 'プロフィール' selection
      console.log('プロフィール selected')
    },
  },
  {
    label: '閲覧履歴',
    onChange: () => {
      // Your logic for handling '閲覧履歴' selection
      console.log('閲覧履歴 selected')
    },
  },
  {
    label: 'ログアウト',
    onChange: () => {
      // Your logic for handling 'ログアウト' selection
      console.log('ログアウト selected')
    },
  },
]

const MenuComponent: React.FC = () => {
  return <Menu options={settings} />
}

export default MenuComponent

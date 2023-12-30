import { MenuItem, Typography } from '@mui/material'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth'

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

const signout = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
  } catch (e) {
    console.log(e)
  }
}

const settings: MenuOption[] = [
  {
    label: 'プロフィール',
    onChange: () => {
      console.log('プロフィール selected')
    },
  },
  {
    label: '閲覧履歴',
    onChange: () => {
      console.log('閲覧履歴 selected')
    },
  },
  {
    label: 'ログアウト',
    onChange: signout,
  },
]

const MenuComponent: React.FC = () => {
  return <Menu options={settings} />
}

export default MenuComponent

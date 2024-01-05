import { MenuItem, Typography } from '@mui/material'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

interface MenuOption {
  label: string
  onChange?: () => void
  hrefAttribute?: string
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
    hrefAttribute: 'profile',
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
  const router = useRouter()
  let paramSetting = settings.map<MenuOption>((setting) => {
    if (setting.hrefAttribute && !setting.onChange) {
      setting.onChange = () => router.push(`/${setting.hrefAttribute}`)
    }
    return setting
  })
  return <Menu options={paramSetting} />
}

export default MenuComponent

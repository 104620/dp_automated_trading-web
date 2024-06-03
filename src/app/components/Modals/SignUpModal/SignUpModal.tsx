import React, { useState } from "react"

import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Button, Label, Modal, TextInput } from "flowbite-react"
import { ISignUpModal } from "./SignUpModal.interface"

import { enableSignUpModal, setSignUpModal, useAppDispatch, useAppSelector } from "app"
import styles from "./SignUpModal.module.scss"

export const SignUpModal: React.FC<ISignUpModal> = () => {
  const dispatch = useAppDispatch()
  const isSignUpModal = useAppSelector(enableSignUpModal)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currency, setCurrency] = useState("")

  const resetInputs = (): void => {
    setEmail("")
    setName("")
    setPassword("")
    setConfirmPassword("")
    setCurrency("")
  }

  const onCloseModal = (): void => {
    dispatch(setSignUpModal(false))
    resetInputs()
  }

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value) {
      setCurrency(event.target.value as string)
    } else {
      setCurrency("")
    }
  }

  return (
    <>
      <Modal show={isSignUpModal} size='md' onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>Hello!</h3>
            <h3 className='text-xs font-medium text-gray-500 dark:text-white'>
              Please sign up to continue
            </h3>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Full Name' />
              </div>
              <TextInput
                value={name}
                onChange={(event: any) => setName(event.target.value)}
                id='name'
                placeholder='John Doe'
                required
              />
              <div className='mb-2 block'>
                <Label htmlFor='email' value='Email Address' />
              </div>
              <TextInput
                id='email'
                placeholder='johndoe@gmail.com'
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
                required
              />
              <div className='mb-2 block'>
                <Label htmlFor='password' value='Password' />
              </div>
              <TextInput
                placeholder='********'
                id='password'
                type='password'
                value={password}
                onChange={(event: any) => setPassword(event.target.value)}
                required
              />
              <div className='mb-2 block'>
                <Label htmlFor='repeat-password' value='Confirm Password' />
              </div>
              <TextInput
                placeholder='********'
                id='repeat-password'
                type='password'
                value={confirmPassword}
                onChange={(event: any) => setConfirmPassword(event.target.value)}
                required
              />
              <div className='mb-2 block'>
                <Label htmlFor='currency' value='Your Country Currency' />
              </div>
              <div className={styles["select-card-input"]}>
                <Select
                  labelId='demo-simple-select-label'
                  id='currency-select'
                  value={currency}
                  onChange={handleChange}
                >
                  <MenuItem value={undefined}>None</MenuItem>
                  <MenuItem value={"EUR"}>Euro</MenuItem>
                  <MenuItem value={"USD"}>U.S. Dollar</MenuItem>
                  <MenuItem value={"CAD"}>Canadian Dollar</MenuItem>
                  <MenuItem value={"GBP"}>British Pound</MenuItem>
                  <MenuItem value={"CHZ"}>Swiss Franc</MenuItem>
                  <MenuItem value={"SEK"}>Swedish Krona</MenuItem>
                  <MenuItem value={"TRL"}>Turkish Lira</MenuItem>
                  <MenuItem value={"RUB"}>Russian Rouble</MenuItem>
                  <MenuItem value={"JPY"}>Japanese Yen</MenuItem>
                  <MenuItem value={"CNY"}>Chinese Yuan</MenuItem>
                  <MenuItem value={"SAR"}>Saudi Arabian Riyal</MenuItem>
                  <MenuItem value={"AUD"}>Australian Dollar</MenuItem>
                </Select>
              </div>
            </div>
            <div className='w-full'>
              <Button
                onClick={() => console.log("sign up me")}
                disabled={name && email && password && confirmPassword && currency ? false : true}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

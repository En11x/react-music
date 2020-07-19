import React, { useState, useContext } from 'react'
import { Dialog, IDialogProps, InputGroup, Button } from '@blueprintjs/core'
import { noop } from 'helpers/fn'
import authApis from 'apis/auth'

import styles from './style.module.css'
import useAsyncFn from 'hooks/useAsyncFn'
import { LogDispatchContext, ACTIONS } from 'reducers/log'

const LoginDialog: React.FC<IDialogProps> = ({ isOpen, onClose = noop }) => {

    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useContext(LogDispatchContext)
    const [loginState,loginFn] = useAsyncFn(authApis.login)
    const { loading,error } = loginState

    const handleLogin = async ()=>{
        const result = await loginFn({phone,password})

        if(result){
            dispatch({
                type:ACTIONS.LOGIN,
                payload:{
                    user:{
                        ...result,
                        userId:result.profile.userId
                    }
                }
            })
            onClose()
        }
    }

    return (
        <Dialog
            style={{ width: '400px' }}
            title='登录'
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.content}>
                <InputGroup
                    placeholder='请输入手机号'
                    leftIcon='mobile-phone'
                    value={phone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPhone(event.target.value)}
                />
                <InputGroup
                    placeholder='请输入密码'
                    leftIcon='lock'
                    type='password'
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />
                { error && <div className='error'>{error.message}</div> }
                <div className={styles.loginBtn}>
                    <Button onClick={handleLogin}>登录</Button>
                </div>
            </div>
        </Dialog>
    )

}
export default LoginDialog

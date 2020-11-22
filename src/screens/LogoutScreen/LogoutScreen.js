import React, { useState, } from 'react'
import LoginScreen from '../LoginScreen/LoginScreen'

export default function LogoutScreen({navigation}) {
    const [user, setUser] = useState(null)
    if (!user) {
        return (
          <LoginScreen/>
        );
      }
}
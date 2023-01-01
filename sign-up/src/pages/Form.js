import style from './Form.module.css'

import React, { useState } from 'react'
import SignUp from './SignUp';
import FormSuccess from './FormSuccess';


const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
    <div>
        {!isSubmitted ? (
          <SignUp submitForm={submitForm} />
        ) : (
          console.log("ㅎㅇ")
        )}
    </div>
    </>
  )
}

export default Form
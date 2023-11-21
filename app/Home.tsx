import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react'

const HomePage = ({setIsOpen} : {setIsOpen: Dispatch<SetStateAction<boolean>>} ) => {
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log('Email:', email);
        console.log('Password:', password);
    }

    return (
    <div className="h-2/3 ml-40 text-center shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col font-medium gap-2 w-full px-10 pt-10 mb-4">
          <div className="gap-2">
            <label htmlFor='email'> Username </label>
            <input id='email' name='email' type="email" autoComplete="email" required className="p-2 ml-1 rounded-lg border" placeholder="Email or Phone number" />
          </div>
          <div className="gap-2">
            <label htmlFor='password'> Password </label>
            <input id="password" name='password' required className="p-2 ml-1 rounded-lg border " type="password" placeholder="Password" />
          </div>
          <button className="border hover:border-black p-2 mt-2 rounded-lg"> Log in </button>
        </form>
        <hr className="w-3/4 ml-9" />
        <button onClick={() => setIsOpen(true)} className="btn btn-neutral mt-3 mb-2 hover:text-white"> Create new account </button>  
      </div>
  )
}

export default HomePage
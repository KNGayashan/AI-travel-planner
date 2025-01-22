import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,

} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

    const [openDialog, setopenDialog] = useState(false);


  useEffect(() => {
    console.log(user)

  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setopenDialog(false);
      window.location.reload();
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>

      <img src='/logo.svg' />

      <div>
        {user
          ? <div className='flex gap-5 items-center'>
            <a href="/create-trip" className='cursor-pointer text-black hover:text-gray-500'>
            <Button variant='outline' className="rounded-full">Create Trip</Button>
            </a>
            <a href="/my-trips" className='cursor-pointer text-black hover:text-gray-500'>
            <Button variant='outline' className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger><img src={user?.picture} alt="" className='rounded-full h-[35px] w-[35px]' /></PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>


            {/* <Button>Sign Out</Button> */}
          </div>
          : <Button onClick={()=>setopenDialog(true)}>Sign In</Button>
        }

      </div>


      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign in to the App with Google Authentication securely</p>

              <Button

                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>

                <FcGoogle className='h-7 w-7' />
                Sign In with Google

              </Button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>



    </div>
  )
}

export default Header


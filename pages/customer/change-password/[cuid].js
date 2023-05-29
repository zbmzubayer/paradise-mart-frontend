import AccountSideBar from '@/components/acount-sidebar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function ChangePassword({ customer }) {
  const { Guid } = customer;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`http://localhost:44355/api/customer/change-password/${Guid}`, data);
      const isChanged = await response.data;
      console.log(isChanged);
      if (isChanged) {
        setSuccess('Password changed successfully.');
        reset();
      } else {
        setError('Incorrect current password.');
      }
    } catch (error) {
      console.log(error);
      setError('Failed ' + error);
    }
  };
  return (
    <>
      {/* <SessionCheck /> */}
      <div className="flex mx-auto w-[85%] px-4 sm:px-6 lg:px-8">
        <AccountSideBar />
        <div className="w-full bg-gray-300 mx-6 px-6 py-4 rounded-md">
          <form action="#" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center">
              <input
                type="password"
                placeholder="Current Password"
                className="input input-bordered w-full max-w-xs"
                id="name"
                {...register('CurrentPassword', { required: true })}
              />
              {errors.CurrentPassword && <span className="ml-3 text-red-400">Current Password is required</span>}
            </div>
            <div className="flex items-center">
              <input
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full max-w-xs"
                id="name"
                {...register('NewPassword', { required: true })}
              />
              {errors.NewPassword && <span className="ml-3 text-red-400">New Password is required</span>}
            </div>
            <div>
              <button type="submit" className="btn bg-violet-500 rounded-full hover:bg-violet-700 w-full max-w-xs">
                Confirm
              </button>
            </div>
            {success && <span className="text-green-400">{success}</span>}
            {error && <span className="text-red-400">{error}</span>}
          </form>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const uid = context.params.cuid;
  const res = await axios.get('http://localhost:44355/api/customers/' + uid);
  const customer = await res.data;

  return { props: { customer } };
}

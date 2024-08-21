import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    async function submitForm(formData){
            
        const data = await sendreq(formData);

        if (data?.success) {
            reset();
            toast("User logged in successfully");
            navigate("/home");
          } else {
            toast("Incorrect user credentials...!");
          }

}

async function sendreq(formData) {

    const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData,
        { withCredentials: true }
      );
      
    return response?.data
}


    const navigate = useNavigate();

    const schema = z.object({
        email: z.string().min(1, { message: 'Email is required' }).email('Invalid email address'),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
      });
    const {register,handleSubmit,formState: { errors },reset} = useForm({resolver: zodResolver(schema)});



    return  <div className="w-1/3 mt-20 flex mx-auto min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100">
                <ToastContainer />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input {...register('email')} id="email" name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>
                
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input {...register('password')} id="password" name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                
                        <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>
                
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member? &nbsp;
                        <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Regsiter</Link>
                    </p>
                </div>
            </div>
}
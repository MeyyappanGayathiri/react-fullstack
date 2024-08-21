import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Registration(){

    async function submitForm(formData){
            
            const data = await sendreq(formData);

            if (data?.success) {
                reset();
                toast("User register successful");
                navigate("/home");
              } else {
                toast("Some error occured");
              }

    }

    async function sendreq(formData) {

        const response = await axios.post(
            "http://localhost:8000/api/user/register",
            formData,
            { withCredentials: true }
          );
          
        return response?.data
    }

    const navigate = useNavigate();

    const schema = z.object({
        firstname: z.string().min(1, { message: 'First name is required' }),
        lastname: z.string().min(1, { message: 'Last name is required' }),
        email: z.string().min(1, { message: 'Email is required' }).email('Invalid email address'),
        phone: z.string().min(10, { message: 'Phone number should be 10 digit' }),
        role: z.string().min(1, { message: 'choose the role' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
      });
    const {register,handleSubmit,formState: { errors },reset} = useForm({resolver: zodResolver(schema)});


    return  <div className="w-1/3 flex mt-10 flex-col items-center justify-center px-16 py-8 mx-auto md:h-screen lg:py-0 bg-slate-100">
                    <ToastContainer />
                    <div className="w-full">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Registration 
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submitForm)}>
                                <div>
                                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input {...register('firstname')} type="text" name="firstname" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="First Name"  />
                                    {errors.firstname && <p className="text-red-600">{errors.firstname.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                    <input {...register('lastname')} type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Last Name"  />
                                    {errors.lastname && <p className="text-red-600">{errors.lastname.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input {...register('email')} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com"  />
                                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                                    
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                    <input {...register('phone')} type="number" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="98******01"  />
                                    {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
                                    
                                </div>
                                <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                                    <select {...register('role')} name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                        <option value="Guest">Guest</option>
                                    </select>
                                    {errors.role && <p className="text-red-600">{errors.role.message}</p>}
                                    
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input {...register('password')} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                                </div>
                                
                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
            </div>

}
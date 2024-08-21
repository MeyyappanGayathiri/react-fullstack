import { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";


export default function Home() {

  const getAllTasksApi = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/user/getuser`
    );
  
    return response?.data;
  };

  async function loadData() {
    const dataList = await getAllTasksApi();

    if(dataList?.success) {
      setUserList(dataList?.userList);

    }
  }

  useEffect( () => {
    loadData();
  }, []);

  const [userList,setUserList] = useState(null);


    return <div>
        <Header/>
        <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-left text-sm font-light text-surface dark:text-white">
          <thead
            className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">First Name</th>
              <th scope="col" className="px-6 py-4">Last Name</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Phone</th>
              <th scope="col" className="px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody>
          {userList?.length > 0 ? (
            userList.map((userItem,index) => (
              <tr key={index+1} className="border-b border-neutral-200 dark:border-white/10">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
              <td className="whitespace-nowrap px-6 py-4">{userItem.firstname}</td>
              <td className="whitespace-nowrap px-6 py-4">{userItem.lastname}</td>
              <td className="whitespace-nowrap px-6 py-4">{userItem.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{userItem.phone}</td>
              <td className="whitespace-nowrap px-6 py-4">{userItem.role}</td>
            </tr>
            ))
          ) : (
            <h1>No User added! Please add one</h1>
          )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
}
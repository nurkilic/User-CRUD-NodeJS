import React from "react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../services/user/getUser";
import { postUser } from "../services/user/postUser";
import { deleteUser } from "../services/user/deleteUser";
import { putUser } from "../services/user/putUser";

const Home = () => {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editState, setEditState] = useState({
    edit: false,
    userId: 0,
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getUser,
  });

  const handleAddData = (e) => {
    e.preventDefault();

    if (editState.edit) {
      editUser(editState.userId);
    }

    if (!editState.edit) {
      const newUser = {
        id: Math.round(Math.random() * 10000),
        first_name: firstName,
        last_name: lastName,
      };
      postMutation.mutate(newUser);
      setFirstName("");
      setLastName("");
    }

    setEditState({
      edit: false,
      userId: "",
    });
  };

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId);
  };

  const handleUpdate = (updatedId) => {
    const findUser = data.find((item) => item.id == updatedId);
    setFirstName(findUser.first_name);
    setLastName(findUser.last_name);
    setEditState({
      edit: true,
      userId: updatedId,
    });
  };

  const editUser = (updatedId) => {
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
    };

    putMutation.mutate({ id: updatedId, updateData: updatedUser });

    setFirstName("");
    setLastName("");
  };

  const postMutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
      console.log("User added successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
      console.log("User deleted successfully");
    },
  });

  const putMutation = useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div className="mb-2">
        <input
          type="text"
          placeholder="İsim giriniz"
          className="p-2 bg-red-100 rounded-md mr-2"
          name="isim"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Soyisim giriniz"
          className="p-2 bg-red-100 rounded-md mr-2"
          name="soyisim"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button
          onClick={handleAddData}
          className="bg-teal-600 p-1 rounded-md h-10 w-20 text-white "
        >
          Ekle{" "}
        </button>
      </div>
      <div className="flex gap-3 ">
        <div className="max-h-[600px] overflow-scroll w-[500px] bg-slate-300 p-4 rounded-md ">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-1 border-b-2 border-solid border-gray-600"
            >
              <div className="flex">
                <div className="w-24"> Ad:{item.first_name}</div>{" "}
                <div>Soyad:{item.last_name}</div>
              </div>
              <div>
                <button
                  className="p-1 px-2 bg-slate-400 rounded-md mr-2"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Sil
                </button>
                <button
                  className="p-1 px-2 bg-slate-400 rounded-md"
                  onClick={() => handleUpdate(item.id)}
                >
                  Güncelle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

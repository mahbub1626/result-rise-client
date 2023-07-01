import { useState } from "react";
import MidSpinner from "../../../../components/Spiner/MidSpinner";
import { useFirebase } from "../../../../context/UserContext";
import AlertMessage from "../../../../Hooks/AlertMessage";
import Layout from "../../../../Layout/Layout";


const index = () => {
  const [loading, setLoading] = useState(false);
  const { successMessage, errorMessage } = AlertMessage();
  const { user } = useFirebase();


  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const body = form.body.value;
    const formData = {
      title, body,
      photoURL: user?.photoURL,
      name: user?.displayName
    }
    if (!title || !body) {
      return errorMessage("Please Provide The information");
    }


    fetch("http://localhost:3100/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        form.reset();
        successMessage(
          "Notice post the server"
        );
        // router.push('/dashboard/profile')

      });
  }

  if (loading) return <MidSpinner />

  return (
    <Layout>
      <div className="bg-gray-200 ">
        <form onSubmit={handleSubmit} className="flex items-center h-[96vh] justify-center">
          <div className="border lg:w-2/3 mx-auto bg-white shadow-sm p-4 md:p-7">
            <h1 className="text-center font-semibold text-3xl pb-4">Notice Board</h1>

            <div className="text-xl md:text-3xl text-center">Please Provide The information</div>
            <div className="flex flex-col items-center justify-center mt-5 p-4 md:p-0">
              <div className="w-4/5 flex flex-col items-center py-5">

                <div className="flex items-center w-full md:w-2/3 mt-2">
                  <label className="mx-2 w-full">Type Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="flex items-center w-full md:w-2/3 mt-2">
                  <label className="mx-2 w-full">Enter Subject </label>
                  <textarea type="text"
                    name="body"
                    placeholder='message'
                    className="textarea textarea-bordered textarea-lg w-full max-w-xs mt-2" >
                  </textarea>
                </div>
              </div>
              <div className=" w-full md:w-3/5 text-right">
                <button
                  type="submit"
                  className="btn btn-sm mt-5">Push Notification</button>
              </div>
            </div>
          </div>
        </form>
      </div>




      {/* <form onSubmit={handleSubmit} className="flex border w-1/2 mx-auto mt-4 p-5 flex-col items-center justify-center">
        <input
          type="text"
          name="title"
          placeholder="title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder='message'
          className="textarea textarea-bordered textarea-lg w-full max-w-xs mt-2"
        />

        <button className="btn btn-sm mt-2" type="submit">Submit</button>

      </form> */}

    </Layout>
  );
}

export default index;



import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";


const ShowNotification = ({ setNoticeForModal }) => {
  const route = useRouter();
  const url = `http://localhost:3100/notice`;
  const {
    data: noticeData = [], refetch, isLoading, } = useQuery({
      queryKey: ["noticeData"],
      queryFn: async () => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      },
    });
  refetch();
  return (
    <div className="bg-white max-w-xl h-screen overflow-scroll mx-auto">
      <div className="flex justify-between items-center px-3">
        <div>
          <h1 className="font-bold text-xl mt-4">Notifications</h1>
        </div>
        <div className="">
          {route.pathname === "/dashboard/notification/shownotification"
            ? undefined :
            <Link
              className="text-blue-500"
              href="/dashboard/notification/shownotification">
              See All ...
            </Link>}
        </div>
      </div>
      <div>
      </div>
      <div className="mt-5">
        {noticeData?.map((notice, i) => (
          <div className="flex items-center pl-4 space-x-3 w-full" key={i}>
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12 my-2">
                <img className="rounded-full w-12" src={notice?.photoURL} />
              </div>
            </div>
            <div>
              <div className="font-bold">{notice.name}</div>
              <div className="text-sm opacity-50"><p>Title: {notice.title}</p>
                {notice?.body?.length > 30 ?
                  <>
                    {notice?.body.slice(0, 20) + ""}
                    <label
                      onClick={() => setNoticeForModal(notice)}
                      htmlFor="my-modal-10" className="font-semibold cursor-pointer">...</label>
                  </>
                  :
                  <>
                    <p>{notice.body} </p>
                  </>
                }
              </div>
            </div>
            {/* <label htmlFor="my-modal-10" className="btn">open modal</label> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowNotification;
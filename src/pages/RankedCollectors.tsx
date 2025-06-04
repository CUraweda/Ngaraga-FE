import userStore from "@/store/user.store";
import { useEffect } from "react";
const RankedCollectors = () => {
  const { allUser, getAllUser } = userStore();

  const fetchData = async () => {
    const payload = `limit=20&page=1`;
    await getAllUser(payload);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex justify-center p-3 sm:p-20 w-full min-h-screen">
      <div className="w-full sm:w-5/6">
        <h1 className="text-3xl font-bold">Ranked Collectors</h1>
        <h1 className="text-xl">
          Check out top ranking Card Collectors on the Card Marketplace.
        </h1>
        <div className="w-full bg-white p-4 rounded-lg shadow-md mt-5">
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Most collectors this week
            </li>
            {allUser?.items?.map((item: any, index: number) => (
            <li className="list-row" key={index}>
              <div className="text-4xl font-thin opacity-30 tabular-nums">
                {index + 1}
              </div>
              <div>
                <img
                  className="size-10 rounded-box"
                  src={
                    item.profilePic
                      ? `${
                          import.meta.env.VITE_REACT_API_URL
                        }/api/download?path=${item.profilePic}`
                      : "https://imgs.search.brave.com/XmWo89rrDH7sV2NOJzKw5vMt4FrPmtc6_nK7g0VHrMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzYwLzI2LzA4/LzM2MF9GXzU2MDI2/MDg4MF9PMVYzUW0y/Y05PNUhXak42Nm1C/aDJOcmxQSE5IT1V4/Vy5qcGc"
                  }
                />
              </div>
              <div className="list-col-grow">
                <div className="text-sm font-semibold uppercase">{item.name}</div>
                <div className="text-xs  font-semibold opacity-60">
                  {item.email}
                </div>
              </div>

              <div className="flex justify-end">
                <p className="text-xl opacity-30 tabular-nums">{item.totalCards} Cards</p>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RankedCollectors;

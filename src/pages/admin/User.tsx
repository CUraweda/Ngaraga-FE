import Pagination from "@/components/ui/Pagination";
import userStore from "@/store/user.store";
import { useEffect, useState } from "react";

const User = () => {
  const { allUser, getAllUser } = userStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}&search=name:${search}`;
    await getAllUser(payload);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    if (allUser) {
      setTotalPages(allUser.total_pages);
    }
  }, [allUser, itemsPerPage]);

  return (
    <div>
      <div className="flex flex-col w-full">
        <h1 className="text-3xl font-bold">Member</h1>
        <p className="text-gray-500">Manage your Member</p>
      </div>
      <div className="flex flex-col gap-4 w-full mt-5">
        <div className="flex w-full justify-end">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Account</th>
                <th>Card Collection</th>
                <th>Total Card</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allUser.items?.map((user: any, index: number) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              user.image
                                ? `${
                                    import.meta.env.VITE_REACT_API_URL
                                  }/api/download?path=${user.image}`
                                : "https://imgs.search.brave.com/XmWo89rrDH7sV2NOJzKw5vMt4FrPmtc6_nK7g0VHrMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzYwLzI2LzA4/LzM2MF9GXzU2MDI2/MDg4MF9PMVYzUW0y/Y05PNUhXak42Nm1C/aDJOcmxQSE5IT1V4/Vy5qcGc"
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user.whatsapp}
                    </span>
                  </td>
                  <td>
                    {user.totalNormalCards} Normal Card
                    <br />
                    {user.totalSpecialCards} Special Card
                  </td>
                  <th>{user.totalCards}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-end mt-4">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            onTotalPageItem={(total) => setItemsPerPage(total)}
          />
        </div>
      </div>
    </div>
  );
};

export default User;

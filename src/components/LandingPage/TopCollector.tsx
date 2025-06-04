import { listedParam } from "@/constant/listed.param";
import userStore from "@/store/user.store";
import { useEffect } from "react";
import { CiTrophy } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const TopCollector = () => {
  const { allUser, getAllUser } = userStore();
  const navigate = useNavigate();
  const fetchData = async () => {
    const payload = `limit=12&page=1`;
    await getAllUser(payload);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-white  rounded-lg p-5">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Top collectors
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Checkout Top Rated Collectors on the Ngaraga Marketplace
                </p>
              </div>
              <button className="btn btn-primary" onClick={() => navigate(listedParam.rankedCollectors)}>
                <CiTrophy className="h-4 w-4" />
                <span>View Rankings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {allUser?.items?.map((item: any, index: number) => (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 bg-gray-700 dark:bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={
                          item.profilePic
                            ? `${
                                import.meta.env.VITE_REACT_API_URL
                              }/api/download?path=${item.profilePic}`
                            : "https://imgs.search.brave.com/XmWo89rrDH7sV2NOJzKw5vMt4FrPmtc6_nK7g0VHrMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzYwLzI2LzA4/LzM2MF9GXzU2MDI2/MDg4MF9PMVYzUW0y/Y05PNUhXak42Nm1C/aDJOcmxQSE5IT1V4/Vy5qcGc"
                        }
                        alt={`${item.name}'s avatar`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Card: <span className="font-medium">{item.totalCards} Card</span>
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopCollector;

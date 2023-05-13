/* eslint-disable no-unused-vars */
import { useState } from "react";
import useRefetch from "../../Hooks/useRefetch";
import Loading from "../../Share/Loading/Loading";
import Pagination from "./Pagination";
import SingleOrder from "./SingleOrder";
import { useQueryFetch } from "../../Hooks/useQueryFetch";

function AllBookings() {
  const limits = [10, 20, 30];
  const [limit, setLimit] = useState(limits[0]);
  const [page, setPage] = useState(1);

  // const {data,loading: bookingLoading,refetch: refetchBooking,} = useRefetch(`http://localhost:5000/get-all-booking-info?limit=${limit}&page=${page}`,{});

  const { data, loading: bookingLoading, refetch: refetchBooking, } = useQueryFetch('all-booking', `http://localhost:5000/get-all-booking-info?limit=${limit}&page=${page}`);

  return (
    <div className="overflow-x-auto">
      {bookingLoading && <Loading />}
      <div className="min-w-screen bg-gray-100 flex justify-center font-sans overflow-hidden">
        <div className=" w-full px-5 mt-5 ">
          <section className="flex justify-between items-center max-w-7xl mb-4 gap-x-5 gap-y-3 pl-10 lg:pl-0">
            <h3>Total Bookings : {data?.totalBookings}</h3>
            <div className="inline-flex gap-3 items-center">
              <h3>Bookings per page :</h3>
              <select
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="w-20 py-1 text-center text-lg font-bold rounded-lg border-2 border-highlight outline-none cursor-pointer"
              >
                {limits.map((p, i) => (
                  <option
                    key={i}
                    value={p}
                    className="text-lg outline-none border-none"
                  >
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <div className="max-w-7xl overflow-x-auto mx-auto  min-h-[15rem]">
            <table className="table-auto mx-auto border-2" id="table-to-xls">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="p-2 text-center min-w-[18rem]">
                    Customer Info
                  </th>
                  <th className="p-2 text-center min-w-[5rem]">time</th>
                  <th className="p-2 text-center min-w-[12rem]">
                    Packages & Services
                  </th>
                  <th className="p-2 text-center min-w-[9rem]">Total price</th>
                  <th className="p-2 text-center min-w-[9rem]">
                    Payment Status
                    <br />
                    <small>(red = unpaid)</small>
                    <br />
                    <small>(green = paid)</small>
                  </th>
                  <th className="p-2 text-center min-w-[5rem]">Cancel</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data?.bookings?.map((booking, i) => (
                  <SingleOrder
                    i={i}
                    booking={booking}
                    key={booking._id}
                    refetch={refetchBooking}
                    page={page}
                    limit={limit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <section className="py-8 flex justify-center items-center">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages}
        />
      </section>
    </div>
  );
}

export default AllBookings;

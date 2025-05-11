import React from 'react'

const Series = () => {
  return (
    <div>
      <div className="contauiner mx-auto flex w-full">
        <div className="w-full flex flex-col">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <h1 className="text-3xl font-bold">Series</h1>
              <p className="text-gray-500">Manage your Series Product</p>
            </div>
            <div className="flex flex-col w-full mt-5">
             
              <div className="w-full flex justify-end">
                <button className="btn btn-primary">Add Series</button>
              </div>
              <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Parent Code</th>
                      <th>Uniqe Code</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Series

import React, { useEffect, useState } from "react";
import SeriesStore from "@/store/series.store";
import Pagination from "@/components/ui/Pagination";
import Modal, { closeModal, openModal } from "@/components/ui/Modal";
import Input from "@/components/ui/InputField";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type props = {
  code: string;
  name: string;
  description: string;
};

const Series = () => {
  const {
    series,
    seriesById,
    getSeries,
    createSeries,
    deleteSeries,
    getOneSeries,
    updateSeries,
  } = SeriesStore();
  const [currentPage, setCurrentPage] = useState(1);
  // const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [edit, setEdit] = useState(false);

  const fetchData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}`;
    await getSeries(payload);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<props>({
    defaultValues: { code: "", name: "", description: "" },
    resolver: yupResolver(
      yup.object().shape({
        code: yup.string().required("code required"),
        name: yup.string().required("name required"),
        description: yup.string().required("description required"),
      })
    ),
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (series) {
      setTotalPages(series.total_pages);
    }
  }, [series, itemsPerPage]);

  useEffect(() => {
    if (seriesById) {
      setValue("code", seriesById.code);
      setValue("name", seriesById.name);
      setValue("description", seriesById.description);
    }
  }, [seriesById]);

  const onSubmit = async (formData: props) => {
    await createSeries(formData);
    closeModal("add-master");
    reset();
  };
  const onEdit = async (formData: props) => {
    const id = seriesById.id;
    await updateSeries(id, formData);
    closeModal("add-master");
    setEdit(false);
    reset();
  };

  const handleKlikSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (edit) {
      handleSubmit(onEdit)(e);
    } else {
     handleSubmit(onSubmit)(e);
    }
  };

  const trigerDelete = async (id: string) => {
    await deleteSeries(id);
  };

  const getDataById = async (id: string) => {
    await getOneSeries(id);
    openModal("add-master");
    setEdit(true);
  };

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
                <button
                  className="btn btn-primary"
                  onClick={() => openModal("add-master")}
                >
                  Add Collection
                </button>
              </div>
              <div className="overflow-x-auto rounded-box border border-base-content/5 mt-5">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Uniqe Code</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {series?.items.map((item: any, index: number) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => getDataById(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => trigerDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
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
        </div>
      </div>

      <Modal id="add-master">
        <div className="container mx-auto flex w-full flex-col">
          <span className="text-xl font-bold">Data Series</span>
          <form onSubmit={handleKlikSubmit}>
            <div className="flex flex-col w-full mt-5">
              <label htmlFor="">Code</label>
              <Input
                type="text"
                className="grow"
                placeholder="Code"
                error={errors.code?.message}
                {...register("code")}
              />
            </div>
            <div className="flex flex-col w-full mt-5">
              <label htmlFor="">Name</label>
              <Input
                type="text"
                className="grow"
                placeholder="Name"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div className="flex flex-col w-full mt-5">
              <label htmlFor="">Description</label>
              <textarea
                className="textarea w-full"
                placeholder="Description"
                {...register("description")}
              ></textarea>
            </div>

            <button className="btn btn-primary mt-5 w-full" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Series;

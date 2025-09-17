import React, { useEffect, useState } from "react";
import CardStore from "@/store/card.store";
import masterStore from "@/store/master.store";
import categoryStore from "@/store/category.store";
import seriesStore from "@/store/series.store";
import Pagination from "@/components/ui/Pagination";
import Modal, { closeModal, openModal } from "@/components/ui/Modal";
import Input from "@/components/ui/InputField";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileUploader from "@/components/ui/FileUpload";
import Select from "@/components/ui/Select";
import { Message } from "@/components/error.field";
import { useNavigate } from "react-router-dom";
import { listedParamAdmin } from "@/constant/listed.param";
import { formatRupiah } from "@/helper/formatRupiah";


type props = {
  masterId: string;
  categoryId: string;
  seriesId: string;
  code: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  image: File;
  isSpecial: boolean;
};

const Cards = () => {
  const {
    cards,
    cardItem,
    getOneCard,
    getCard,
    createCard,
    deleteCard,
    updateCard,
  } = CardStore();
  const { masters, getMaster } = masterStore();
  const { categories, getCategory } = categoryStore();
  const { series, getSeries } = seriesStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const payload = `limit=${itemsPerPage}&page=${currentPage}&search=name:${search}`;
    await getCard(payload);
  };

  const fetchParentCode = async () => {
    const payload = `limit=100`;
    await getMaster(payload);
    await getCategory(payload);
    await getSeries(payload);
    openModal("add-master");
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<props>({
    defaultValues: {
      masterId: "",
      categoryId: "",
      seriesId: "",
      code: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      image: undefined,
      isSpecial: false,
    },
    resolver: yupResolver(
      yup.object().shape({
        masterId: yup.string().required("masterId required"),
        categoryId: yup.string().required("categoryId required"),
        seriesId: yup.string().required("seriesId required"),
        code: yup.string().required("code required"),
        name: yup.string().required("name required"),
        description: yup.string().required("description required"),
        price: yup.string().required("price required"),
        stock: yup.string().required("stock required"),
        image: yup
          .mixed<File>()
          .required("image required")
          .test(
            "fileSize",
            "File size must not exceed 2MB",
            (value) => (value ? value.size <= 2 * 1024 * 1024 : false) // 2MB limit
          )
          .test(
            "fileType",
            "Only image files jpeg, jpg, png are allowed",
            (value) =>
              value ? ["image/jpeg", "image/png"].includes(value.type) : false
          ),
        isSpecial: yup.boolean().required("isSpecial required"),
      })
    ),
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    if (cards) {
      setTotalPages(cards.total_pages);
    }
  }, [cards, itemsPerPage]);

  useEffect(() => {
    if (cardItem) {
      setValue("masterId", cardItem.masterId);
      setValue("categoryId", cardItem.categoryId);
      setValue("seriesId", cardItem.seriesId);
      setValue("code", cardItem.code);
      setValue("name", cardItem.name);
      setValue("price", cardItem.price);
      setValue("stock", cardItem.stock);
      setValue("description", cardItem.description);
      setValue("isSpecial", cardItem.isSpecial)
    }
  }, [cardItem]);

  const onSubmit = async (formData: props) => {
    const data = new FormData();
    data.append("masterId", formData.masterId);
    data.append("categoryId", formData.categoryId);
    data.append("seriesId", formData.seriesId);
    data.append("code", formData.code);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("image", formData.image);
    data.append("isSpecial", formData.isSpecial.toString());

    await createCard(data);

    closeModal("add-master");
    reset();
  };

  const onEdit = async (formData: props) => {
    const id = cardItem.id;
    const data = new FormData();
    data.append("masterId", formData.masterId);
    data.append("categoryId", formData.categoryId);
    data.append("seriesId", formData.seriesId);
    data.append("code", formData.code);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    formData.image ? data.append("image", formData.image) : null;
    data.append("isSpecial", formData.isSpecial.toString());
    await updateCard(id, data);
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
    await deleteCard(id);
  };

  const getDataById = async (id: string) => {
    await getOneCard(id);
    fetchParentCode();
    openModal("add-master");
    setEdit(true);
  };

  const handleDetail = (id: string, isSpecial: boolean) => {
    const params = new URLSearchParams({
      card: id,
      type: isSpecial ? "special" : "regular",
    });

    navigate(`${listedParamAdmin.cardsDetail}?${params.toString()}`);
  };

  return (
    <div>
      <div className="contauiner mx-auto flex w-full">
        <div className="w-full flex flex-col">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <h1 className="text-3xl font-bold">Cards</h1>
              <p className="text-gray-500">Manage your List Card</p>
            </div>
            <div className="flex flex-col w-full mt-5">
              <div className="w-full flex justify-end gap-3">
                <input
                  type="text"
                  className="input "
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => fetchParentCode()}
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
                      <th>Type</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock / Max Claim</th>
                      <th>Linked User</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards?.items.map((item: any, index: number) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex font-bold cursor-pointer">
                            <span
                              className="tooltip hover:text-green-500"
                              data-tip={item.master.name}
                            >
                              {item.master.code}
                            </span>
                            <span
                              className="tooltip hover:text-green-500"
                              data-tip={item.category.name}
                            >
                              -{item.category.code}
                            </span>
                            <span
                              className="tooltip hover:text-green-500"
                              data-tip={item.series.name}
                            >
                              -{item.series.code}
                            </span>
                            <span
                              className="tooltip hover:text-green-500"
                              data-tip={item.name}
                            >
                              -{item.code}
                            </span>
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.isSpecial ? <span className="badge badge-primary">Special</span> : <span className="badge badge-secondary">Regular</span>}</td>
                        <td>{item.category.name}</td>
                        <td>{formatRupiah(item.price)}</td>
                        <td>{item.stock}</td>
                        <td>{item.totalLinkedCardLists}</td>
                        <td className="join">
                          <button
                            className="btn btn-sm btn-info join-item"
                            onClick={() => handleDetail(item.id, item.isSpecial)}
                          >
                            Detail
                          </button>
                          <button
                            className="btn btn-sm btn-primary join-item"
                            onClick={() => getDataById(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-error join-item"
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

      <Modal id="add-master" width="">
        <div className="container mx-auto flex w-full flex-col">
          <span className="text-xl font-bold">Data Card</span>
          <form onSubmit={handleKlikSubmit}>
            <div className="flex flex-col w-full mt-5 ">
              <label htmlFor="">Parent Code</label>
              <div className="flex flex-row w-full">
                <Select
                  data={masters?.items}
                  className="w-full"
                  placeholder="Master"
                  error={errors?.masterId}
                  {...register("masterId")}
                />
                <Select
                  data={categories?.items}
                  className="w-full"
                  placeholder="Category"
                  error={errors?.categoryId}
                  {...register("categoryId")}
                />
                <Select
                  data={series?.items}
                  className="w-full"
                  placeholder="Series"
                  error={errors?.seriesId}
                  {...register("seriesId")}
                />
              </div>
            </div>
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 mt-3">
              <legend className="fieldset-legend">Card Type</legend>
              <label className="label">
                Reguler Card
                <input type="checkbox" className="toggle" {...register("isSpecial")} />
                Special Card
              </label>
            </fieldset>
            <div className="flex flex-col w-full mt-5">
              <label htmlFor="">Uniqe Code</label>
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
              <label htmlFor="">Price</label>
              <Input
                type="number"
                className="grow"
                placeholder="Price"
                error={errors.price?.message}
                {...register("price")}
              />
            </div>
            <div className="flex flex-col w-full mt-5">
              <label htmlFor="">{watch("isSpecial") ? "Max Claim" : "Stock"}</label>
              <Input
                type="number"
                className="grow"
                placeholder="Stock"
                error={errors.stock?.message}
                {...register("stock")}
              />
            </div>
            <div className="flex flex-col w-full mt-5">
              <label htmlFor="">Image</label>
              <FileUploader
                value={watch("image") ?? undefined}
                onChange={(file) => {
                  if (file) {
                    setValue("image", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              <Message
                isError={Boolean(errors?.image)}
                message={errors?.image?.message || " "}
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

export default Cards;

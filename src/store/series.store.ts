import { create } from "zustand";
import getErrorMessage from "@/helper/helper.api";

import Swal from "sweetalert2";
import { createSeries, deleteSeries, getAllSeries, getSeriesById, updateSeries } from "@/middleware/Series";

interface State {
  series: any | null;
  seriesById: any | null;
  getSeries: (payload: string) => Promise<void>;
  createSeries: (payload: any) => Promise<void>;
  deleteSeries: (id: string) => Promise<void>;
  getOneSeries: (id: string) => Promise<void>;
  updateSeries: (id: string, payload: any) => Promise<void>;
}

const SeriesStore = create<State>((set) => ({
  series: null,
  seriesById: null,

  getSeries: async (payload) => {
    const { data } = await getAllSeries(payload);

    set({
      series: data,
    });
  },

  createSeries: async (payload) => {
    try {
      await createSeries(payload);
      const { data } = await getAllSeries("");
      set({ series: data });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },
  updateSeries: async (id, payload) => {
    try {
      await updateSeries(id, payload);
      const { data } = await getAllSeries("");
      set({ series: data });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },

  deleteSeries: async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteSeries(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const { data } = await getAllSeries("");
          set({ series: data });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },
  getOneSeries: async (id) => {
    try {
      const { data } = await getSeriesById(id);
      set({ seriesById: data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getErrorMessage(error, "failed. Please try again."),
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      });
    }
  },
}));

export default SeriesStore;

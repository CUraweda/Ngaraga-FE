import { useEffect,} from "react";
import { useForm } from "react-hook-form";
import Input from "./ui/InputField";
import userStore from "@/store/user.store";
import { closeModal } from "./ui/Modal";

interface ProfileFormData {
  name: string;
  whatsapp: string;
  bio: string;
}

const EditProfile = () => {
  const { user , updateProfile} = userStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      whatsapp: user?.whatsapp || "",
      bio: user?.bio || "",
    },
  });

  const handleFormSubmit = (data: ProfileFormData) => {
    const payload = {
      name: data.name,
      whatsapp: data.whatsapp,
      bio: data.bio,
    };

    updateProfile(user?.id ?? "", payload).then(() => {
     closeModal('modal-EditProfile')
    });
  };

  useEffect(() => {
    setValue("name", user?.name ?? "");
    setValue("whatsapp", user?.whatsapp ?? "");
    setValue("bio", user?.bio ?? "");
  }, [user]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Setting</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
        <div>
          <label className="block mb-2">Name</label>
          <Input
            type="text"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
        </div>

        <div>
          <label className="block mb-2">WhatsApp</label>
          <Input
            type="text"
            placeholder="Enter your WhatsApp number"
            error={errors.whatsapp?.message}
            {...register("whatsapp")}
          />
        </div>

        <div>
          <label className="block mb-2">Bio</label>
          <textarea
            className="textarea w-full"
            placeholder="Tell us about yourself"
            {...register("bio")}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>

    </div>
  );
};

export default EditProfile;

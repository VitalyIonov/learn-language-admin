import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type UploadImageParams = {
  file: File;
  uploadUrl: string;
};

export const useImageUpload = () => {
  const { mutateAsync } = useMutation({
    mutationKey: ["imageUpload"],
    mutationFn: async ({ file, uploadUrl }: UploadImageParams) => {
      return axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
    },
  });

  return { imageUpload: mutateAsync };
};

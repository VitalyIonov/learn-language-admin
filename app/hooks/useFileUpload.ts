import { useState } from "react";
import { useImageUploadInit } from "~/hooks/api/useImageUploadInit";
import { useImageUpload } from "~/hooks/api/useImageUpload";
import { useImageUploadCommit } from "~/hooks/api/useImageUploadCommit";

type UploadReturn = {
  imageId: number;
  imageUrl: string;
};

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { imageUploadInit } = useImageUploadInit();
  const { imageUpload } = useImageUpload();
  const { imageUploadCommit } = useImageUploadCommit();

  const uploadFile = async (file: File): Promise<UploadReturn> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const { data: uploadInitData } = await imageUploadInit({
        contentType: file.type,
        sizeBytes: file.size,
        alt: file.name,
      });
      setUploadProgress(33);

      await imageUpload({ file, uploadUrl: uploadInitData.uploadUrl });
      setUploadProgress(67);

      const { data: uploadCommitData } = await imageUploadCommit({
        imageId: uploadInitData.imageId,
      });
      setUploadProgress(100);

      return {
        imageId: uploadInitData.imageId,
        imageUrl: uploadCommitData.imageUrl,
      };
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploadFile,
    isUploading,
    uploadProgress,
  };
};

import React, { useRef, useState } from "react";
import { type Control, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useFileUpload } from "~/hooks/useFileUpload";
import { Loader2, Upload, X, Check } from "lucide-react";

type Props = {
  name: string;
  label: string;
  initialImageUrl?: string;
  control: Control<any>;
  accept?: string;
  disabled?: boolean;
};

export const InputFileField = ({
  name,
  label,
  control,
  initialImageUrl,
  accept = "image/*",
  disabled = false,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const { uploadFile, isUploading, uploadProgress } = useFileUpload();

  const { field } = useController({
    name,
    control,
  });

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setUploadStatus("idle");

    if (!file) {
      field.onChange("");
      return;
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadStatus("idle");
      const { imageId, imageUrl: newImageUrl } = await uploadFile(selectedFile);
      field.onChange(imageId);
      setImageUrl(newImageUrl);
      setUploadStatus("success");
      // Очищаем selectedFile после успешной загрузки
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setUploadStatus("error");
      console.error("Upload failed:", error);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadStatus("idle");
    field.onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(undefined);
    field.onChange("");
  };

  // Показывать инпут только если нет загруженного изображения
  const showFileInput = !imageUrl || uploadStatus === "error";

  const getStatusIcon = () => {
    if (isUploading) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (uploadStatus === "success")
      return <Check className="h-4 w-4 text-green-600" />;
    return <Upload className="h-4 w-4" />;
  };

  const getUploadButtonText = () => {
    if (isUploading) return `Uploading... ${uploadProgress}%`;
    if (uploadStatus === "success") return "Uploaded";
    return "Upload";
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-3">
              {/* Image Preview */}
              {imageUrl && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Current image"
                      className="max-h-48 max-w-full rounded-md border border-border object-contain"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={handleRemoveImage}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* File Input - показывать только если нет изображения */}
              {showFileInput && (
                <div className="flex items-center gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    disabled={disabled || isUploading}
                    onChange={(e) =>
                      handleFileSelect(e.target.files?.[0] || null)
                    }
                    className="flex-1"
                  />
                  {selectedFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleClear}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              {/* Selected File Info */}
              {selectedFile && showFileInput && (
                <div className="flex items-center justify-between rounded-md bg-muted p-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    onClick={handleUpload}
                    disabled={isUploading || uploadStatus === "success"}
                    className="ml-2"
                  >
                    {getStatusIcon()}
                    {getUploadButtonText()}
                  </Button>
                </div>
              )}

              {/* Progress Bar */}
              {isUploading && (
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {/* Status Messages */}
              {uploadStatus === "error" && (
                <p className="text-sm text-red-600">
                  Upload failed. Please try again.
                </p>
              )}

              {uploadStatus === "success" && field.value && (
                <p className="text-sm text-green-600">
                  File uploaded successfully. Image ID: {field.value}
                </p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

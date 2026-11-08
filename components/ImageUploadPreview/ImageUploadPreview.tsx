"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./ImageUploadPreview.module.scss";
import Button from "../Button/Button";

type ImageUploadPreviewProps = {
  imageDefaultValue?: string;
  uploadTitle?: string;
  uploadSubtitle?: string;
  removeButtonText?: string;
};

export default function ImageUploadPreview({
  imageDefaultValue,
  uploadTitle = "Upload animal image",
  uploadSubtitle = "PNG, JPG or WEBP",
  removeButtonText = "Remove",
}: ImageUploadPreviewProps) {
  const [preview, setPreview] = useState<string | null>(
    () => imageDefaultValue ?? null,
  );

  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  }

  function handleRemove() {
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="image-upload" className={styles.uploadLabel}>
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={200}
            className={styles.previewImage}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.icon}>📤</span>

            <div>
              <p className={styles.title}>{uploadTitle}</p>

              <p className={styles.subtitle}>{uploadSubtitle}</p>
            </div>
          </div>
        )}
      </label>

      <input
        ref={inputRef}
        id="image-upload"
        type="file"
        name="image"
        accept="image/*"
        className={styles.input}
        onChange={handleChange}
      />

      {preview && (
        <div className={styles.actions}>
          <Button variant="secondary" type="button" onClick={handleRemove}>
            {removeButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}

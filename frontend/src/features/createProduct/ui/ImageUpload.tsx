import React, { useEffect, useState } from 'react';

import deleteIcon from '@/shared/assets/icons/delete.svg';
import galeryAddIcon from '@/shared/assets/icons/gallery-add.svg';
import rotareIcon from '@/shared/assets/icons/rotate.svg';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ImageUploadProps {
  onInputsChange: (inputs: InputData[]) => void;
}

export interface InputData {
  id: number;
  file?: File;
  previewUrl?: string;
  rotation: number;
  isHovering?: boolean;
}

interface RotateImageFileCallback {
  (rotatedFile: File, newPreviewUrl: string): void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onInputsChange }) => {
  const [inputs, setInputs] = useState<InputData[]>([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    addInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange =
    (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const fileUrl = URL.createObjectURL(file);

        setInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.id === id
              ? { ...input, file, previewUrl: fileUrl, rotation: 0 }
              : input,
          ),
        );
      }
    };

  const addInput = () => {
    if (inputs.length < 8) {
      setInputs((prevInputs) => [...prevInputs, { id: nextId, rotation: 0 }]);
      setNextId(nextId + 1);
    }
  };

  const rotateImage = (id: number) => {
    const input = inputs.find((input) => input.id === id);

    if (!input || !input.file) return;

    rotateImageFile(
      input.file,
      (input.rotation + 90) % 360,
      (rotatedFile, newPreviewUrl) => {
        setInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.id === id
              ? {
                  ...input,
                  file: rotatedFile,
                  previewUrl: newPreviewUrl,
                  rotation: (input.rotation + 90) % 360,
                }
              : input,
          ),
        );
      },
    );
  };

  const rotateImageFile = (
    file: File,
    rotationDegrees: number,
    callback: RotateImageFileCallback,
  ) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        if (rotationDegrees === 0) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else if (rotationDegrees === 90) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else if (rotationDegrees === 180) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else if (rotationDegrees === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((90 * Math.PI) / 180);
        // ctx.drawImage(img, -img.height / 2, -img.width / 2);
        ctx.drawImage(img, -canvas.height / 2, -canvas.width / 2);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const rotatedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          const newPreviewUrl = URL.createObjectURL(rotatedFile);

          callback(rotatedFile, newPreviewUrl);
        }, file.type);
      };
      if (e.target?.result) {
        img.src = e.target.result.toString();
      }
    };
    reader.readAsDataURL(file);
  };

  const removeInput = (id: number) => {
    setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
    // Optionally cleanup the created object URLs
  };

  const handleMouseEnter = (id: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, isHovering: true } : input,
      ),
    );
  };

  const handleMouseLeave = (id: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, isHovering: false } : input,
      ),
    );
  };

  useEffect(() => {
    onInputsChange(inputs);
  }, [inputs, onInputsChange]);

  let additionalDivCount = 4 - inputs.length;

  if (inputs.length > 4) {
    additionalDivCount = 8 - inputs.length;
  }

  // sceleton gen
  const additionalDivs = [];

  if (additionalDivCount > 0) {
    for (let i = 0; i < additionalDivCount; i += 1) {
      additionalDivs.push(
        <div
          key={i}
          className="provider w-[222px] h-[150px] bg-selected-dark rounded-2xl relative items-center justify-center"
        />,
      );
    }
  }

  return (
    <>
      <HStack className="w-full gap-4 bg-dark-grey px-4 py-6 min-h-[158px] mb-5 rounded-2xl ">
        <VStack className="mb-[6px]">
          <Text Tag="p" size="lg" color="white" text="Завантажити фотографії" />
        </VStack>
        <VStack className="gap-4" wrap="wrap">
          {inputs.map((input, index) => (
            <HStack
              key={input.id}
              className="provider w-[222px] h-[150px] bg-selected-dark rounded-2xl relative items-center justify-center"
              onMouseEnter={() => handleMouseEnter(input.id)}
              onMouseLeave={() => handleMouseLeave(input.id)}
            >
              {!input.previewUrl && (
                <HStack
                  className="absolute px-7 py-7 gap-[10px] w-full h-full"
                  justify="center"
                  align="center"
                >
                  <img src={galeryAddIcon} alt="galery add icon" />
                  <Text
                    Tag="p"
                    size="sm"
                    text="Завантажте фотографію розміром до 10 Мегабайт"
                    color="gray"
                    align="center"
                  />
                </HStack>
              )}
              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <label
                htmlFor={`${input.id}`}
                className=" cursor-pointer w-full h-full absolute"
              >
                <input
                  type="file"
                  id={`${input.id}`}
                  onChange={handleFileChange(input.id)}
                  className="hidden w-full h-full cursor-pointer bg-whiter"
                />
              </label>
              {input.previewUrl && (
                <>
                  <img
                    src={input.previewUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    className="rounded-2xl"
                  />
                  {index === 0 && (
                    <VStack className=" bg-secondary-yellow rounded-lg py-[2px] px-[10px] absolute bottom-[7px] left-[7px] ">
                      Головна
                    </VStack>
                  )}
                  {input.previewUrl && input.isHovering && (
                    <>
                      <div className="overlay absolute bg-black opacity-50 w-full h-full rounded-2xl" />
                      <VStack
                        className="absolute w-full h-full rounded-2xl gap-8"
                        justify="center"
                        align="center"
                      >
                        <Button
                          variant="primary"
                          onClick={() => rotateImage(input.id)}
                          className="p-[10px] rounded-lg"
                        >
                          <img src={rotareIcon} alt="rotate icon" />
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => removeInput(input.id)}
                          className="p-[10px] rounded-lg"
                        >
                          <img src={deleteIcon} alt="delete icon" />
                        </Button>
                      </VStack>
                    </>
                  )}
                </>
              )}
            </HStack>
          ))}
          {/* clear */}
          {additionalDivs}
        </VStack>
      </HStack>
      <div className="flex justify-start gap-4">
        <Button variant="clear" onClick={addInput} className="pb-1 border-b border-main ">
          <Text
            Tag="p"
            size="sm"
            text={`Завантажте ще ${8 - inputs.length} фотографії`}
            className=" font-normal !text-main"
          />
        </Button>
      </div>
    </>
  );
};

export default ImageUpload;

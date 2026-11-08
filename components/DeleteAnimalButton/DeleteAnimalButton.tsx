"use client";

import { deleteAnimal } from "@/actions/admin/animals/delete";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

type DeleteAnimalButtonProps = {
  animalId: string;
  animalName: string;
  confirmDeleteText: string;
  deleteText: string;
};

export default function DeleteAnimalButton({
  animalId,
  animalName,
  confirmDeleteText,
  deleteText,
}: DeleteAnimalButtonProps) {
  async function handleDelete() {
    const confirmed = confirm(`${confirmDeleteText} ${animalName}?`);

    if (!confirmed) return;

    const result = await deleteAnimal(animalId);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    await deleteAnimal(animalId);
  }

  return (
    <button onClick={handleDelete} aria-label={`${deleteText} ${animalName}`}>
      <FaTrash />
    </button>
  );
}

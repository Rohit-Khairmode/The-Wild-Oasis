import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted sucessfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isDeleting };
}

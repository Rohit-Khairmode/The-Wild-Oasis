import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //Manually setting react queries cache
      queryClient.setQueryData(["user"], user.user); // we done this because when we first time login that time we also getting the loading spinner while opening dashboard this is happening because where ever we opening App  ProtectedRoute call useUser hook which internally calls the getCurrentUser which updata the ['user'](react query key) cache and during this Spinner is stated to loading but here we are updating ['user'] when ever we first time loging in so getCurrentUser returne isLoading not become true because required data is already available in cache
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}

import { useSignal, useSignalEffect } from "@preact/signals";
import Icon from "../../ui/Icon.tsx";
import { numberOfLikes } from "../../../sdk/useLikes.ts";
import { invoke } from "deco-sites/petopia2/runtime.ts";
import { Bounce, toast, ToastContainer } from "react-toastify";


export interface Props {
  productId: string;
}

export default function BeginProductCard({ productId }: Props) {
  const likes = useSignal<number>(0);
  const clicked = useSignal(false);
  // deno-lint-ignore no-explicit-any
  const ToastContainerComponent = ToastContainer as any;

  useSignalEffect(() => {
    async function addLike() {
      const response = await invoke["deco-sites/petopia2"].actions
        .postLike({
          productId: productId,
        });
      numberOfLikes.value++;
      if (response) {
        likes.value = response.product;
      }
      toast.success("Obrigado por curtir! ✌️", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
        theme: "dark",
        transition: Bounce,
      });
    }

    async function verifyLikes() {
      const res = await invoke["deco-sites/petopia2"].loaders.Product
        .getLikesProducts({ productId: productId });
      likes.value = res?.product ?? 0;
    }
    setInterval(() => {
      verifyLikes();
    }, 3e4);

    if (clicked.value) {
      addLike();
    } else {
      verifyLikes();
    }
  });

  return (
    <div class="absolute cursor-pointer flex flex-row gap-2 items-center left-3 top-3 ">
      {!clicked.value
        ? <Icon id="moodSmile" size={24} onClick={() => clicked.value = true} />
        : <Icon id="moodCheck" size={24} />}
      <span class="font-bold text-sm">{likes.value} Likes</span>
      <ToastContainerComponent />
    </div>
  );
}
import Icon from "../../ui/Icon.tsx";
import { numberOfLikes } from "../../../sdk/useLikes.ts";
import { useSignal, useSignalEffect } from "@preact/signals";
import { invoke } from "deco-sites/petopia2/runtime.ts"; 

export default function TheLikes() {
    const number = useSignal(0);

    useSignalEffect(() => {
        async function getLikes() {
            const response = await invoke["deco-sites/petopia2"].loaders
                .Product.getAllLikes({});
            number.value = response.total;
        }

        if (numberOfLikes.value) {
            getLikes();
        }

        setInterval(() => {
            getLikes();
        }, 3e4);

        getLikes();
    });

    return (
        <div class="flex flex-row gap-2">
            <Icon id="friends" size={24} />
            <span>{number.value}</span>
        </div>
    );
}
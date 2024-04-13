import { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
  temperature?: Temperature | null;
}

export default function Weather({ temperature }: Props) {
  return temperature && (
    <div class="flex items-center justify-end fixed">
      <p class="badge badge-info gap-2 rounded-full h-20 flex-col w-full text-green-500">
        Brasil
        <span class="text-primary text-lg">{temperature?.celsius}°</span>
      </p>
    </div>
  );
}

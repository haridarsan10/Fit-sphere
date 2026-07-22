import { Spinner } from "./spinner"

export default function FullPageLoader(){
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
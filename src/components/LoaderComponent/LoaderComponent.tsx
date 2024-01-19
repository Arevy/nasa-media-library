
import { observer } from "mobx-react";
import { NASAStore } from "../../stores/NASAStore";

interface LoaderComponentProps {
  store: NASAStore;
}

const LoaderComponent = observer(({ store }: LoaderComponentProps) => {
  return store?.isLoading ? <div>Loading...</div> : null;
});

export default LoaderComponent;

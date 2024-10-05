import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
 defaultOptions:{
  queries:{
    refetchOnWindowFocus:false
  }
 }


});
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

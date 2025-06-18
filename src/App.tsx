import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import APIBrowserPage from "./pages/APIBrowserPage";
import EntityDetailPage from "./pages/EntityDetailPage";
import HomePage from "./pages/HomePage";
import InteractiveDiagramPage from "./pages/InteractiveDiagramPage";
import KeyConceptsPage from "./pages/KeyConceptsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<HomePage />} />
          <Route path="/a-p-i-browser" element={<APIBrowserPage />} />
          <Route path="/entity-detail" element={<EntityDetailPage />} />
          <Route path="/interactive-diagram" element={<InteractiveDiagramPage />} />
          <Route path="/key-concepts" element={<KeyConceptsPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;

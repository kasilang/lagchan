import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Board from "@/pages/Board";
import Thread from "@/pages/Thread";
import FAQ from "@/pages/FAQ";
import Rules from "@/pages/Rules";
import Contact from "@/pages/Contact";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/faq" component={FAQ} />
      <Route path="/rules" component={Rules} />
      <Route path="/contact" component={Contact} />
      <Route path="/legal" component={Legal} />
      <Route path="/:boardSlug" component={Board} />
      <Route path="/:boardSlug/thread/:threadId" component={Thread} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

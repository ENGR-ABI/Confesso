import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { ensureUserSignedIn } from "@/lib/firebase";

// Import our new pages (we'll create these next)
import CreateQuestion from "@/pages/CreateQuestion";
import ViewQuestion from "@/pages/ViewQuestion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/create" component={CreateQuestion} />
      <Route path="/q/:questionId" component={ViewQuestion} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Firebase Auth when app loads
  useEffect(() => {
    const initAuth = async () => {
      try {
        await ensureUserSignedIn();
        console.log("Firebase auth initialized");
      } catch (error) {
        console.error("Error initializing Firebase auth:", error);
      }
    };
    
    initAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 min-h-screen text-white">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;

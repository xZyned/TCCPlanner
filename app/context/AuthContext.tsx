
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  course?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active session on initial load
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          setIsLoading(false);
          return;
        }
        
        if (data?.session) {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();
            
          if (userError && userError.code !== "PGRST116") {
            console.error("Error fetching user data:", userError);
          }
          
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || "",
            name: userData?.name || "",
            avatar_url: userData?.avatar_url || "",
            course: userData?.course || "",
          });
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          // Get user profile data when signed in
          const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
            
          if (userError && userError.code !== "PGRST116") {
            console.error("Error fetching user data:", userError);
          }
          
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: userData?.name || "",
            avatar_url: userData?.avatar_url || "",
            course: userData?.course || "",
          });
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Erro ao realizar login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      // Create auth account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create profile record
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: data.user.id,
              name,
              email,
            },
          ]);
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          // We should handle this better, perhaps by deleting the auth user
        }
      }
      
      toast.success("Conta criada com sucesso! Verifique seu email para confirmar.");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Erro ao criar conta");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success("Logout realizado com sucesso!");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Erro ao realizar logout");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Camera, CreditCard, Shield, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [subscription, setSubscription] = useState<string>("Gratuito");
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('name, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setName(data.name || '');
          setAvatarUrl(data.avatar_url);
        }

        // Simulamos a informação de assinatura
        // Em uma implementação real, você buscaria essa informação de um serviço de pagamento
        setSubscription("Gratuito");
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar seus dados de perfil.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar suas informações.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      setUploadingAvatar(true);

      // Upload da imagem para o storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obtemos a URL pública da imagem
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Atualizamos o perfil com a URL da imagem
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(publicUrl);
      
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Erro ao atualizar foto",
        description: "Não foi possível fazer o upload da imagem.",
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSubscriptionUpgrade = () => {
    // Lógica para redirecionar para página de pagamento ou iniciar processo de upgrade
    toast({
      title: "Em breve!",
      description: "O sistema de pagamentos será implementado em breve.",
    });
    setShowUpgradeDialog(false);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Tabs defaultValue="perfil" className="max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="assinatura">Assinatura</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24">
                        {avatarUrl ? (
                          <AvatarImage src={avatarUrl} alt="Foto de perfil" />
                        ) : (
                          <AvatarFallback className="bg-indigo-100 text-indigo-600 text-lg">
                            {getInitials(name || 'Usuário')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="absolute bottom-0 right-0">
                        <label 
                          htmlFor="avatar-upload" 
                          className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700"
                        >
                          <Camera className="h-4 w-4" />
                          <input 
                            id="avatar-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleAvatarUpload}
                            disabled={uploadingAvatar}
                          />
                        </label>
                      </div>
                    </div>
                    {uploadingAvatar && (
                      <p className="text-sm text-indigo-600 flex items-center">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Enviando foto...
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={user?.email || ''} 
                        disabled 
                        className="bg-gray-100"
                      />
                      <p className="text-sm text-gray-500">
                        O email não pode ser alterado
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={updating}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Atualizando...
                        </>
                      ) : (
                        "Atualizar Perfil"
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assinatura">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Minha Assinatura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Plano atual</h3>
                    <span className="bg-indigo-100 text-indigo-800 font-medium py-1 px-2 rounded-full text-sm">
                      {subscription}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 mb-4">
                    {subscription === "Gratuito" 
                      ? "Você está usando o plano gratuito com recursos limitados." 
                      : "Você tem acesso a todos os recursos premium do PlanejaTCC."}
                  </p>
                  
                  {subscription === "Gratuito" && (
                    <Button 
                      className="w-full"
                      onClick={() => setShowUpgradeDialog(true)}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Fazer upgrade para Premium
                    </Button>
                  )}
                  
                  {subscription !== "Gratuito" && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Próxima cobrança</span>
                        <span className="font-medium">15/08/2024</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        Gerenciar assinatura
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Comparação de planos</h3>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Plano Gratuito */}
                    <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-medium">Gratuito</h4>
                        <span className="text-sm text-gray-500">R$ 0</span>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <PlanFeature included text="Cronograma básico" />
                        <PlanFeature included text="Checklist de tarefas" />
                        <PlanFeature included={false} text="Templates personalizados" />
                        <PlanFeature included={false} text="Sugestões de referências" />
                        <PlanFeature included={false} text="Exportação para PDF" />
                      </ul>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-500">Ideal para quem está começando</p>
                      </div>
                    </div>
                    
                    {/* Plano Premium */}
                    <div className="border rounded-lg p-6 bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-xl font-medium">Premium</h4>
                          <span className="inline-flex items-center mt-1 bg-indigo-100 text-indigo-800 text-xs py-0.5 px-2 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                            <Shield className="h-3 w-3 mr-1" />
                            Recomendado
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">R$ 29,90<span className="text-xs">/mês</span></span>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <PlanFeature included text="Cronograma avançado" />
                        <PlanFeature included text="Checklist detalhado" />
                        <PlanFeature included text="Templates personalizados" />
                        <PlanFeature included text="Sugestões de referências" />
                        <PlanFeature included text="Exportação para PDF" />
                      </ul>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-500">Ideal para quem quer o melhor resultado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog de upgrade */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fazer upgrade para Premium</DialogTitle>
            <DialogDescription>
              Desbloqueie todos os recursos do PlanejaTCC e garanta o sucesso do seu trabalho acadêmico.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-500">
              Após o pagamento, sua conta será atualizada automaticamente para o plano Premium.
            </p>
            
            <div className="bg-indigo-50 p-4 rounded-md dark:bg-indigo-900/20">
              <h4 className="font-medium mb-2">Plano Premium</h4>
              <p className="text-2xl font-bold mb-1">R$ 29,90<span className="text-sm font-normal">/mês</span></p>
              <p className="text-sm text-gray-500">Cancele a qualquer momento</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>Cancelar</Button>
            <Button onClick={handleSubscriptionUpgrade}>Continuar para pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Componente auxiliar para exibir características do plano
const PlanFeature = ({ included, text }: { included: boolean; text: string }) => {
  return (
    <li className="flex items-start">
      <span className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} mr-2`}>
        {included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </span>
      <span className={included ? '' : 'text-gray-400'}>{text}</span>
    </li>
  );
};

export default Profile;

import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  Search, 
  ArrowLeft, 
  Compass, 
  MapPin,
  Calendar,
  Users,
  FileText,
  Settings,
  HelpCircle
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const suggestedPages = [
    { name: "Dashboard", path: "/", icon: Home, description: "Visão geral do sistema" },
    { name: "Agenda", path: "/calendar", icon: Calendar, description: "Gerencie agendamentos" },
    { name: "Pacientes", path: "/pacientes", icon: Users, description: "Lista de pacientes" },
    { name: "Prontuário", path: "/prontuario", icon: FileText, description: "Registros médicos" },
    { name: "Configurações", path: "/configuracoes", icon: Settings, description: "Ajustes do sistema" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple search logic - navigate to most relevant page
    const query = searchQuery.toLowerCase();
    const matchedPage = suggestedPages.find(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    );
    if (matchedPage) {
      navigate(matchedPage.path);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: "1s",
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center animate-fade-in">
        {/* Floating Icon */}
        <div 
          className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-8 shadow-2xl backdrop-blur-sm"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotate(${mousePosition.x * 0.1}deg)`,
            transition: "transform 0.3s ease-out"
          }}
        >
          <Compass className="w-16 h-16 text-primary animate-spin-slow" />
        </div>

        {/* 404 Text */}
        <div className="relative mb-6">
          <h1 className="text-8xl sm:text-9xl font-black bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-2xl opacity-50 -z-10" />
        </div>

        {/* Message */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Parece que você se perdeu. A página <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{location.pathname}</span> não existe.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar página..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 text-lg rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm shadow-lg focus:shadow-xl transition-shadow"
            />
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            className="gap-2 h-12 px-6 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            className="gap-2 h-12 px-6 rounded-xl"
          >
            <Home className="h-4 w-4" />
            Ir para Dashboard
          </Button>
        </div>

        {/* Suggested Pages */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            Páginas sugeridas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {page.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help Link */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Precisa de ajuda?{" "}
            <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              Central de Suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
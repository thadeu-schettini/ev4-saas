import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback onRetry={this.handleRetry} onGoHome={this.handleGoHome} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  onRetry: () => void;
  onGoHome: () => void;
  title?: string;
  description?: string;
}

export function ErrorFallback({ 
  onRetry, 
  onGoHome,
  title = "Algo deu errado",
  description = "Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial."
}: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <Card className="relative w-full max-w-lg p-8 text-center space-y-6 border-destructive/20 bg-card/80 backdrop-blur-xl shadow-2xl">
        {/* Icon */}
        <div className="relative mx-auto">
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
          <div className="relative h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center border border-destructive/30">
            <AlertTriangle className="h-12 w-12 text-destructive animate-bounce" style={{ animationDuration: "2s" }} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={onRetry}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar Novamente
          </Button>
          <Button 
            variant="outline" 
            onClick={onGoHome}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Ir para Início
          </Button>
        </div>

        {/* Debug Info (Development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="pt-4 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
              onClick={() => {
                const details = document.getElementById("error-details");
                if (details) {
                  details.classList.toggle("hidden");
                }
              }}
            >
              <Bug className="h-4 w-4" />
              Ver detalhes técnicos
            </Button>
            <div id="error-details" className="hidden mt-4 text-left">
              <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-auto max-h-40 text-muted-foreground">
                Erro capturado pelo ErrorBoundary
              </pre>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// Compact error fallback for smaller sections
export function CompactErrorFallback({ 
  onRetry,
  className
}: { 
  onRetry: () => void;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-destructive/20 bg-destructive/5",
      className
    )}>
      <AlertTriangle className="h-8 w-8 text-destructive mb-3" />
      <p className="text-sm text-muted-foreground mb-4">
        Erro ao carregar este conteúdo
      </p>
      <Button size="sm" variant="outline" onClick={onRetry} className="gap-2">
        <RefreshCw className="h-3 w-3" />
        Tentar novamente
      </Button>
    </div>
  );
}

export default ErrorBoundary;

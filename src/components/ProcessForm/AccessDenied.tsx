import React from 'react';
import { AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AccessDeniedProps {
  message: string;
  showEditButton?: boolean;
  onEditClient?: () => void;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ 
  message, 
  showEditButton = false, 
  onEditClient 
}) => {
  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Acesso Restrito
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-destructive/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {message}
          </AlertDescription>
        </Alert>
        
        {showEditButton && onEditClient && (
          <div className="flex justify-start">
            <Button 
              variant="outline" 
              onClick={onEditClient}
              className="gap-2 border-primary/20 hover:bg-primary/10"
            >
              <Settings className="h-4 w-4" />
              Editar Cliente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccessDenied;
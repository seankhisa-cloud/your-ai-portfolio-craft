import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Play, CheckCircle, Webhook, Database, Mail, Slack, Clock, Zap } from 'lucide-react';
import { toast } from 'sonner';

const N8nDemo = () => {
  const navigate = useNavigate();
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [executionStep, setExecutionStep] = useState(0);

  const workflows = [
    {
      id: 'lead-qualification',
      name: 'Lead Qualification Automation',
      description: 'Automatically qualifies leads from web forms, enriches data from HubSpot, and sends notifications',
      steps: [
        { icon: Webhook, name: 'Webhook Trigger', desc: 'Receives form submission', status: 'pending' },
        { icon: Database, name: 'HubSpot Lookup', desc: 'Enriches lead data', status: 'pending' },
        { icon: Zap, name: 'Lead Scoring', desc: 'Calculates lead score', status: 'pending' },
        { icon: Slack, name: 'Slack Notification', desc: 'Notifies sales team', status: 'pending' },
        { icon: Database, name: 'CRM Update', desc: 'Updates lead in CRM', status: 'pending' },
      ],
      metrics: { executions: 1247, successRate: 98.5, avgTime: '2.3s' }
    },
    {
      id: 'invoice-processing',
      name: 'Invoice Processing Pipeline',
      description: 'Processes invoices from email, extracts data, updates accounting system, and generates reports',
      steps: [
        { icon: Mail, name: 'Email Monitor', desc: 'Watches for invoice emails', status: 'pending' },
        { icon: Zap, name: 'PDF Extraction', desc: 'Extracts invoice data', status: 'pending' },
        { icon: Database, name: 'Stripe Validation', desc: 'Validates payment info', status: 'pending' },
        { icon: Database, name: 'Update PostgreSQL', desc: 'Stores invoice data', status: 'pending' },
        { icon: Mail, name: 'Send Receipt', desc: 'Emails confirmation', status: 'pending' },
      ],
      metrics: { executions: 856, successRate: 99.2, avgTime: '3.1s' }
    },
    {
      id: 'customer-onboarding',
      name: 'Customer Onboarding Sequence',
      description: 'Automated customer onboarding with account setup, welcome emails, and training schedule',
      steps: [
        { icon: Database, name: 'New User Trigger', desc: 'Detects new signup', status: 'pending' },
        { icon: Database, name: 'Create Workspace', desc: 'Sets up user workspace', status: 'pending' },
        { icon: Mail, name: 'Welcome Email', desc: 'Sends welcome message', status: 'pending' },
        { icon: Clock, name: 'Schedule Training', desc: 'Books onboarding call', status: 'pending' },
        { icon: Slack, name: 'Team Alert', desc: 'Notifies support team', status: 'pending' },
      ],
      metrics: { executions: 432, successRate: 97.8, avgTime: '1.8s' }
    },
  ];

  const executeWorkflow = (workflowId: string) => {
    setActiveWorkflow(workflowId);
    setExecutionStep(0);
    
    const workflow = workflows.find(w => w.id === workflowId);
    if (!workflow) return;

    toast.success(`Starting ${workflow.name}...`);

    // Simulate step-by-step execution
    workflow.steps.forEach((_, index) => {
      setTimeout(() => {
        setExecutionStep(index + 1);
        if (index === workflow.steps.length - 1) {
          setTimeout(() => {
            toast.success('Workflow completed successfully!', {
              description: `All ${workflow.steps.length} steps executed in ${workflow.metrics.avgTime}`
            });
            setActiveWorkflow(null);
            setExecutionStep(0);
          }, 500);
        }
      }, (index + 1) * 1000);
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-3d-blue">n8n Workflow Automation Demo</h1>
            <p className="text-muted-foreground">Interactive demonstration of enterprise automation workflows</p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-panda-blue/10 rounded-lg">
                <Zap className="w-8 h-8 text-panda-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Executions</p>
                <p className="text-3xl font-bold text-3d-blue">2,535</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-panda-green/10 rounded-lg">
                <CheckCircle className="w-8 h-8 text-panda-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold text-3d-green">98.5%</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-panda-orange/10 rounded-lg">
                <Clock className="w-8 h-8 text-panda-orange" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Execution Time</p>
                <p className="text-3xl font-bold text-3d-orange">2.4s</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Workflows */}
        <div className="space-y-8">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="p-8 bg-card/80 backdrop-blur-sm card-3d card-3d-blue">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-3d-blue">{workflow.name}</h2>
                    <p className="text-muted-foreground">{workflow.description}</p>
                  </div>
                  <Button 
                    onClick={() => executeWorkflow(workflow.id)}
                    disabled={activeWorkflow !== null}
                    className="gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Execute Workflow
                  </Button>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <Badge variant="secondary">
                    {workflow.metrics.executions.toLocaleString()} executions
                  </Badge>
                  <Badge variant="secondary">
                    {workflow.metrics.successRate}% success rate
                  </Badge>
                  <Badge variant="secondary">
                    Avg. {workflow.metrics.avgTime}
                  </Badge>
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-4">
                  {workflow.steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = activeWorkflow === workflow.id;
                    const isCompleted = isActive && executionStep > index;
                    const isCurrent = isActive && executionStep === index;
                    
                    return (
                      <div key={index} className="relative pl-16 pb-8 last:pb-0">
                        <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-panda-green text-white scale-110' 
                            : isCurrent 
                            ? 'bg-panda-blue text-white animate-pulse scale-110'
                            : 'bg-background border-2 border-border'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}
                        </div>
                        <div className={`transition-all duration-300 ${isCurrent ? 'scale-105' : ''}`}>
                          <h3 className={`font-semibold mb-1 ${
                            isCompleted ? 'text-panda-green' : isCurrent ? 'text-panda-blue' : ''
                          }`}>
                            {step.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Integration Info */}
        <Card className="mt-12 p-8 bg-card/80 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 text-3d-purple">Integrated Services & APIs</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {['HubSpot CRM', 'Salesforce', 'Slack API', 'PostgreSQL', 'Stripe Payments', 'SendGrid', 'Google Calendar', 'Webhooks'].map((service) => (
              <div key={service} className="p-4 bg-background/50 border border-border rounded-lg text-center hover:border-panda-purple hover:bg-panda-purple/10 transition-all">
                <p className="font-medium">{service}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default N8nDemo;

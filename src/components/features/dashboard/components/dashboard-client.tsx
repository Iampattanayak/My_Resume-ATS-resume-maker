/* ****** Dashboard Client Component ****** */

"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { createLocalDataExport } from "@/lib/db/import-export";
import {
  FileText,
  Target,
  BriefcaseBusiness,
  KeyRound,
  Sparkles,
  UserCheck,
  Download,
  Upload,
  Database,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";
import { ApiKeyDialog } from "./api-key-dialog";
import { ImportDataDialog } from "./import-data-dialog";
import { useAIConfig } from "../hooks/use-ai-config";
import { useProfile } from "@/components/features/profile/hooks/use-profile";

/* ****** Step card data ****** */
const STEPS = [
  {
    step: "01",
    title: "Build Profile",
    description:
      "Add your work history, skills, and education once — reuse forever.",
    icon: UserCheck,
    gradient: "from-blue-500/15 via-cyan-500/10 to-transparent",
    borderColor: "border-blue-200/60 dark:border-blue-800/40",
    iconGradient: "from-blue-500 to-cyan-500",
    textAccent: "text-blue-600 dark:text-blue-400",
    hoverShadow:
      "hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]",
  },
  {
    step: "02",
    title: "Pick Template & Build Resume",
    description: "Choose from Classic, Modern, Technical, Executive and more.",
    icon: FileText,
    gradient: "from-violet-500/15 via-purple-500/10 to-transparent",
    borderColor: "border-violet-200/60 dark:border-violet-800/40",
    iconGradient: "from-violet-500 to-purple-500",
    textAccent: "text-violet-600 dark:text-violet-400",
    hoverShadow:
      "hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]",
  },
] as const;


export function DashboardClient() {
  const router = useRouter();
  const { config, hasApiKey, saveConfig, getDecryptedApiKey } = useAIConfig();
  const { isProfileCompleted } = useProfile();
  const [isApiDialogOpen, setIsApiDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [initialProvider, setInitialProvider] = useState("");
  const [initialModel, setInitialModel] = useState("");
  const [initialApiKey, setInitialApiKey] = useState("");

  const handleSaveConfig = useCallback(
    async (provider: string, modelName: string, apiKey: string) => {
      await saveConfig(provider, modelName, apiKey);
    },
    [saveConfig],
  );

  const openApiDialog = useCallback(async () => {
    if (hasApiKey && config) {
      try {
        const key = await getDecryptedApiKey();
        setInitialProvider(config.provider ?? "");
        setInitialModel(config.modelName ?? "");
        setInitialApiKey(key ?? "");
      } catch {
        setInitialProvider(config.provider ?? "");
        setInitialModel(config.modelName ?? "");
        setInitialApiKey("");
      }
    } else {
      setInitialProvider("");
      setInitialModel("");
      setInitialApiKey("");
    }

    setIsApiDialogOpen(true);
  }, [hasApiKey, config, getDecryptedApiKey]);

  function handleStepClick(stepIndex: number) {
    if (stepIndex === 0) router.push("/dashboard/profile");
    else if (stepIndex === 1)
      router.push(
        isProfileCompleted ? "/dashboard/builder" : "/dashboard/profile",
      );
    else if (stepIndex === 2 && isProfileCompleted)
      router.push("/dashboard/builder");
  }

  function stepButtonLabel(stepIndex: number) {
    if (stepIndex === 0)
      return isProfileCompleted ? "Edit Profile" : "Start Profile";
    if (stepIndex === 1)
      return isProfileCompleted ? "Browse Templates" : "Complete Profile First";
    return isProfileCompleted ? "Export Resume" : "Complete Profile First";
  }

  function isStepDisabled(stepIndex: number) {
    return stepIndex === 2 && !isProfileCompleted;
  }

  function isStepDone(stepIndex: number) {
    return stepIndex === 0 && isProfileCompleted;
  }

  const handleExportData = useCallback(async () => {
    try {
      setIsExporting(true);

      const payload = await createLocalDataExport();
      const json = JSON.stringify(payload, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      const dateToken = new Date().toISOString().replace(/[:.]/g, "-");
      anchor.href = url;
      anchor.download = `myresume-backup-${dateToken}.json`;
      anchor.click();

      URL.revokeObjectURL(url);
      toast.success("Local data exported as JSON.");
    } catch {
      toast.error("Unable to export local data.");
    } finally {
      setIsExporting(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ApiKeyDialog
        open={isApiDialogOpen}
        onOpenChange={setIsApiDialogOpen}
        onSave={handleSaveConfig}
        initialProvider={initialProvider}
        initialModel={initialModel}
        initialApiKey={initialApiKey}
      />
      <ImportDataDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
      />

      <main className="container mx-auto px-6 py-8 space-y-10">
        {/* ****** Hero header ****** */}
        <BlurFade delay={0} direction="up">
          <div className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-background/50 backdrop-blur-xl p-8 md:p-12 shadow-2xl transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20">
            {/* Animated border beam */}
            <BorderBeam
              colorFrom="#a855f7"
              colorTo="#6366f1"
              duration={6}
              borderWidth={2}
            />

            {/* Premium background styling */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.2),transparent_50%)]" />
            <div className="absolute -left-10 -top-10 size-64 rounded-full bg-primary/20 blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-primary/30" />
            <div className="absolute -bottom-12 -right-10 size-64 rounded-full bg-violet-600/20 blur-[100px] transition-transform duration-700 group-hover:scale-150 group-hover:bg-violet-600/30" />
            
            <div className="relative flex flex-col md:flex-row md:items-center gap-8 justify-between z-10">
              
              <div className="flex-1 space-y-5">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                  Build your <span className="bg-linear-to-r from-primary via-violet-500 to-indigo-500 bg-clip-text text-transparent">perfect resume</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Build a professional, ATS-optimised resume in three quick steps with complete privacy on your device.
                </p>

                {hasApiKey && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 pt-2"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      AI Pipeline Secure
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-9 px-4 text-xs font-semibold hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                      onClick={openApiDialog}
                    >
                      Manage Connection
                    </Button>
                  </motion.div>
                )}
              </div>

              {!hasApiKey && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-full md:w-auto shrink-0"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-500/5 to-primary/5 p-6 md:p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-violet-500/10">
                     <div className="absolute -right-4 -top-4 size-32 rounded-full bg-violet-500/20 blur-3xl mix-blend-screen" />
                     <div className="relative flex flex-col gap-5">
                       <div className="flex items-center gap-4">
                         <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-primary/20 text-violet-600 dark:text-violet-400 shadow-inner">
                           <KeyRound className="size-6 drop-shadow-sm" />
                         </div>
                         <div>
                           <h3 className="text-lg font-bold text-foreground">Unlock AI Power</h3>
                           <p className="text-sm text-muted-foreground w-48 leading-tight mt-0.5">Connect your API key to write faster</p>
                         </div>
                       </div>
                       <Button
                         size="lg"
                         onClick={openApiDialog}
                         className="w-full bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02]"
                       >
                         Connect API Key
                       </Button>
                     </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* ****** Core Action Steps ****** */}
            <section>
              <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <UserCheck className="size-5 text-primary" />
                  Your Setup Checklist
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Complete your profile to unlock full AI generation capabilities.</p>
              </div>
              
              <div className="flex flex-col gap-4">
                {STEPS.map((s, index) => {
                  const Icon = s.icon;
                  const done = isStepDone(index);
                  const disabled = isStepDisabled(index);
                  const statusClass = done 
                        ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30" 
                        : disabled 
                        ? "border-border/40 bg-muted/20 opacity-70 grayscale-[0.5]" 
                        : "border-primary/20 bg-background hover:bg-muted/30 hover:border-primary/40 shadow-sm";
                  const iconBg = done ? "bg-emerald-500/10 text-emerald-600" : disabled ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary";
                  
                  return (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, type: "spring" }}
                      className={"group relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border p-5 transition-all duration-300 " + statusClass}
                    >
                      <div className="flex items-start sm:items-center gap-5">
                        <div className={"flex size-14 shrink-0 items-center justify-center rounded-xl shadow-inner transition-colors duration-300 " + iconBg}>
                          <Icon className="size-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className={"font-bold text-lg transition-colors " + (done ? "text-emerald-700 dark:text-emerald-400" : "text-foreground")}>
                              {s.title}
                            </h3>
                            {done ? (
                              <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] uppercase tracking-wider bg-emerald-500/10">Done</Badge>
                            ) : disabled ? (
                              <Lock className="size-3.5 text-muted-foreground" />
                            ) : null}
                          </div>
                          <p className="text-sm text-muted-foreground max-w-md">{s.description}</p>
                        </div>
                      </div>
                      
                      <Button
                        size="lg"
                        variant={done ? "outline" : disabled ? "secondary" : "default"}
                        disabled={disabled}
                        onClick={() => handleStepClick(index)}
                        className={"shrink-0 gap-2 font-semibold transition-all rounded-xl w-full sm:w-auto " + (done ? "border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-600" : "shadow-md hover:scale-105")}
                      >
                        {stepButtonLabel(index)}
                        {!disabled && !done && <ArrowRight className="size-4" />}
                        {done && <CheckCircle2 className="size-4" />}
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ****** AI Power Tools ****** */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                 <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Zap className="size-5 text-violet-500" />
                    AI Intelligence Suite
                 </h2>
                 <Badge variant="outline" className="border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-500/10 text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                    Premium Tools
                 </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BlurFade delay={0.2} direction="up" className="h-full">
                  <div className="group relative h-full flex flex-col overflow-hidden rounded-[1.5rem] border border-border/50 bg-background transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 hover:border-violet-500/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-background to-transparent opacity-100 transition-opacity" />
                    
                    <div className="p-7 flex-1 flex flex-col relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/25">
                          <BriefcaseBusiness className="size-7 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      </div>
                      <h3 className="font-extrabold text-xl mb-3 tracking-tight">Company-wise Tailor</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        Instantly contextualize your core experience to perfectly match specific job requirements and bypass harsh ATS filters.
                      </p>
                    </div>
                    <div className="p-7 pt-0 mt-auto relative z-10">
                      <Button
                         className="w-full bg-foreground text-background hover:bg-violet-600 hover:text-white dark:hover:text-white transition-all duration-300 font-bold rounded-xl h-12 shadow-sm"
                         disabled={!isProfileCompleted || !hasApiKey}
                         onClick={() => router.push("/dashboard/company-resumes")}
                      >
                        {!isProfileCompleted ? "Complete Profile First" : !hasApiKey ? "Add AI Key First" : "Launch AI Editor"}
                      </Button>
                    </div>
                  </div>
                </BlurFade>

                <BlurFade delay={0.3} direction="up" className="h-full">
                  <div className="group relative h-full flex flex-col overflow-hidden rounded-[1.5rem] border border-border/50 bg-background transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1 hover:border-teal-500/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-background to-transparent opacity-100 transition-opacity" />
                    
                    <div className="p-7 flex-1 flex flex-col relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25">
                          <Target className="size-7 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      </div>
                      <h3 className="font-extrabold text-xl mb-3 tracking-tight">ATS Score Checker</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        Run a diagnostic analysis against job postings to surface critical missing skills and structural flaws before you apply.
                      </p>
                    </div>
                    <div className="p-7 pt-0 mt-auto relative z-10">
                      <Button
                         className="w-full bg-foreground text-background hover:bg-teal-600 hover:text-white dark:hover:text-white transition-all duration-300 font-bold rounded-xl h-12 shadow-sm"
                         disabled={!isProfileCompleted || !hasApiKey}
                         onClick={() => router.push("/dashboard/ats-scorer")}
                      >
                        {!isProfileCompleted ? "Complete Profile First" : !hasApiKey ? "Add AI Key First" : "Scan Resume"}
                      </Button>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </section>
          </div>
          
          <div className="space-y-6 pt-2 lg:pt-0">
            <BlurFade delay={0.4} direction="up">
              <div className="rounded-[1.5rem] border border-border/50 bg-background/60 backdrop-blur-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20">
                <div className="bg-primary/5 p-6 border-b border-border/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-5">
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <div className="flex flex-col gap-2 relative z-10">
                     <div className="flex size-10 items-center justify-center rounded-xl bg-background shadow-sm text-primary border border-border/50">
                        <Database className="size-5" />
                     </div>
                     <h3 className="font-extrabold text-xl mt-3 tracking-tight">Local Vault</h3>
                     <p className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">Browser Storage Active</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All your master profile information and customized resumes remain 100% physically on this machine. Download backups routinely.
                  </p>

                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full justify-center h-12 rounded-xl border-dashed border-2 border-border hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-all font-semibold"
                      onClick={() => setIsImportDialogOpen(true)}
                    >
                      <Upload className="size-4 mr-2" />
                      Restore From Backup
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-center h-12 rounded-xl transition-all shadow-md font-bold"
                      onClick={handleExportData}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                         <div className="flex items-center">
                           <div className="size-4 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                           Encrypting JSON...
                         </div>
                      ) : (
                         <>
                           <Download className="size-4 mr-2" />
                           Download JSON Backup
                         </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </main>
    </div>
  );
}

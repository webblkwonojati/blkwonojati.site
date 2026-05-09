"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Copy, 
  Link as LinkIcon,
  ExternalLink,
  ArrowUpRight
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { saveShortlink, deleteShortlink } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  target_url: z.string().url("URL harus valid (gunakan http:// atau https://)"),
  code: z.string().min(1, "Kode wajib diisi").regex(/^[a-zA-Z0-9-_]+$/, "Hanya huruf, angka, strip, dan underscore"),
});

export default function ShortlinkClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate Stats
  const totalLinks = data.length;
  const totalClicks = data.reduce((acc, curr) => acc + (Number(curr.clicks) || 0), 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target_url: "",
      code: "",
    },
  });

  const handleAdd = () => {
    setEditingId(null);
    form.reset({
      target_url: "",
      code: Math.random().toString(36).substring(2, 8),
    });
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingId(record.id);
    form.reset({
      target_url: record.target_url,
      code: record.code,
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const res = await deleteShortlink(deletingId);
    if (res.success) {
      toast.success("Shortlink berhasil dihapus");
      setData(data.filter((item) => item.id !== deletingId));
    } else {
      toast.error(res.error || "Gagal menghapus shortlink");
    }
    setIsAlertOpen(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const res = await saveShortlink(values, editingId || undefined);
    
    if (res.success) {
      toast.success(editingId ? "Shortlink diperbarui" : "Shortlink berhasil dibuat");
      setIsModalOpen(false);
      
      if (editingId) {
        setData(data.map(item => item.id === editingId ? { ...item, ...values } : item));
      } else {
        setData([res.data, ...data]);
      }
    } else {
      toast.error(res.error || "Gagal menyimpan shortlink");
    }
    setLoading(false);
  };

  const copyToClipboard = (code: string) => {
    const url = `https://bit.blkwonojati.site/${code}`;
    navigator.clipboard.writeText(url);
    toast.success("URL disalin ke clipboard!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      {/* ─── Page Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EAEAEA]">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-black tracking-tight">
            Shortlink Manager
          </h1>
          <p className="text-[#666] text-sm">
            Manage custom short URLs for your domain.
          </p>
        </div>
        <Button 
          onClick={handleAdd}
          className="bg-black hover:bg-black/90 text-white font-medium rounded-md h-9 px-4 transition-colors"
        >
          Create Shortlink
        </Button>
      </div>

      {/* ─── Stats Grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Total Links" value={totalLinks} icon={LinkIcon} />
        <StatsCard label="Total Clicks" value={totalClicks} icon={ArrowUpRight} />
        <StatsCard label="Domain" value="bit.blkwonojati.site" isText icon={ExternalLink} />
      </div>

      {/* ─── Table Section ───────────────────────────────────────────────── */}
      <Card className="border-[#EAEAEA] shadow-sm rounded-lg bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow className="hover:bg-[#FAFAFA] border-[#EAEAEA]">
                  <TableHead className="font-medium text-[#666] text-[13px] py-4 pl-6">Code Alias</TableHead>
                  <TableHead className="font-medium text-[#666] text-[13px] py-4">Destination</TableHead>
                  <TableHead className="font-medium text-[#666] text-[13px] py-4 text-center">Clicks</TableHead>
                  <TableHead className="font-medium text-[#666] text-[13px] py-4 text-right pr-6">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <LinkIcon className="text-[#EAEAEA]" size={32} />
                        <p className="text-[#666] text-sm">No shortlinks found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.id} className="group border-[#EAEAEA] hover:bg-[#FAFAFA] transition-colors">
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                           <div className="flex flex-col">
                             <span className="font-medium text-black text-sm">/{item.code}</span>
                             <button 
                               onClick={() => copyToClipboard(item.code)}
                               className="text-[12px] text-[#666] flex items-center gap-1 hover:text-black transition-colors"
                             >
                               Copy URL <Copy size={12} />
                             </button>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col max-w-[300px]">
                          <a 
                            href={item.target_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#666] text-sm hover:text-black transition-colors truncate"
                          >
                            {item.target_url}
                          </a>
                          <span className="text-[12px] text-[#999] mt-1">
                            {new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <span className="text-sm font-medium text-black">{item.clicks || 0}</span>
                      </TableCell>
                      <TableCell className="text-right py-4 pr-6">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleEdit(item)}
                                  className="h-8 w-8 text-[#666] hover:text-black hover:bg-[#EAEAEA] rounded-md"
                                >
                                  <Pencil size={14} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-black text-white border-black">Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => confirmDelete(item.id)}
                                  className="h-8 w-8 text-[#666] hover:text-red-600 hover:bg-red-50 rounded-md"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-black text-white border-black">Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ─── Modals ────────────────────────────────────────────────────── */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-lg border-[#EAEAEA] p-6 bg-white shadow-lg">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-semibold text-black">
              {editingId ? "Edit Shortlink" : "New Shortlink"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="target_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium text-sm">Destination URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://..." 
                        {...field} 
                        className="h-10 rounded-md border-[#EAEAEA] focus:border-[#999] focus:ring-0 transition-colors text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black font-medium text-sm">Custom Alias</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-[#999] text-sm pointer-events-none select-none">
                          bit /
                        </div>
                        <Input 
                          placeholder="alias" 
                          {...field} 
                          className="h-10 pl-12 rounded-md border-[#EAEAEA] focus:border-[#999] focus:ring-0 transition-colors text-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-8">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full rounded-md h-10 font-medium bg-black hover:bg-black/90 text-white transition-colors"
                >
                  {loading ? "Saving..." : (editingId ? "Update Link" : "Create Link")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-lg border-[#EAEAEA] p-6 shadow-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-black">Delete Link?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#666] text-sm mt-2">
              This action cannot be undone. Users will no longer be redirected to the destination URL.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-2">
            <AlertDialogCancel className="rounded-md h-10 font-medium border-[#EAEAEA] bg-white text-black hover:bg-[#FAFAFA] flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-md h-10 font-medium bg-red-600 hover:bg-red-700 text-white flex-1"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatsCard({ label, value, icon: Icon, isText }: any) {
  return (
    <Card className="border-[#EAEAEA] shadow-sm rounded-lg bg-white overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-medium text-[#666]">{label}</p>
          <div className="flex items-center justify-between">
            <h3 className={cn("font-semibold text-black tracking-tight", isText ? "text-lg" : "text-3xl")}>
              {value}
            </h3>
            <Icon className="w-4 h-4 text-[#999]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

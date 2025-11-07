import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface EducationItem {
  id: string;
  title: string;
  organization: string;
  description: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  type: string;
  created_at: string;
}

const EducationAdmin = () => {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
  });

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const { data, error } = await supabase
        .from('timeline_items')
        .select('*')
        .eq('type', 'education')
        .order('start_date', { ascending: false });

      if (error) throw error;
      setEducation(data || []);
    } catch (error) {
      console.error('Error loading education:', error);
      toast.error('Failed to load education');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToSave = {
        title: formData.title,
        organization: formData.organization,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.is_current ? null : formData.end_date,
        is_current: formData.is_current,
        type: 'education',
      };

      if (editingItem) {
        const { error } = await supabase
          .from('timeline_items')
          .update(dataToSave)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Education updated successfully');
      } else {
        const { error } = await supabase
          .from('timeline_items')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Education added successfully');
      }

      setIsDialogOpen(false);
      resetForm();
      loadEducation();
    } catch (error) {
      console.error('Error saving education:', error);
      toast.error('Failed to save education');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      const { error } = await supabase
        .from('timeline_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Education deleted successfully');
      loadEducation();
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Failed to delete education');
    }
  };

  const handleEdit = (item: EducationItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      organization: item.organization,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date || '',
      is_current: item.is_current,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      organization: '',
      description: '',
      start_date: '',
      end_date: '',
      is_current: false,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-3d-blue">Education Management</h1>
          <p className="text-muted-foreground mt-2">Manage educational qualifications and degrees</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={20} />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Education' : 'Add New Education'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Degree/Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., MSc in Data Science"
                  required
                />
              </div>
              <div>
                <Label htmlFor="organization">Institution</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g., WorldQuant University"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the focus areas and key learnings..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    disabled={formData.is_current}
                    required={!formData.is_current}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_current"
                  checked={formData.is_current}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_current: checked })}
                />
                <Label htmlFor="is_current">Currently Pursuing</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? 'Update' : 'Add'} Education
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {education.length === 0 ? (
          <Card className="p-12 text-center">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Education Entries</h3>
            <p className="text-muted-foreground mb-4">
              Add your first education entry to get started
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus size={20} />
              Add Education
            </Button>
          </Card>
        ) : (
          education.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-panda-purple/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-panda-purple" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-panda-blue font-medium mb-2">{item.organization}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                      {item.is_current
                        ? 'Present'
                        : item.end_date
                        ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        : 'Present'}
                    </p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="text-panda-blue hover:bg-panda-blue/10"
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="text-panda-red hover:bg-panda-red/10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EducationAdmin;

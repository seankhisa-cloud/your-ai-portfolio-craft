import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  read_time: number;
  published: boolean;
  views: number;
  likes: number;
}

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover_image: "",
    category: "",
    tags: "",
    read_time: 5,
    published: false,
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading blog posts", variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const postData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    if (editingPost) {
      const { error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id);

      if (error) {
        toast({ title: "Error updating post", variant: "destructive" });
      } else {
        toast({ title: "Post updated successfully" });
      }
    } else {
      const { error } = await supabase.from("blog_posts").insert(postData);

      if (error) {
        toast({ title: "Error creating post", variant: "destructive" });
      } else {
        toast({ title: "Post created successfully" });
      }
    }

    setDialogOpen(false);
    resetForm();
    loadPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting post", variant: "destructive" });
    } else {
      toast({ title: "Post deleted successfully" });
      loadPosts();
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !post.published })
      .eq("id", post.id);

    if (error) {
      toast({ title: "Error updating post", variant: "destructive" });
    } else {
      toast({ title: post.published ? "Post unpublished" : "Post published" });
      loadPosts();
    }
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content || "",
      cover_image: post.cover_image || "",
      category: post.category || "",
      tags: post.tags?.join(", ") || "",
      read_time: post.read_time || 5,
      published: post.published,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      cover_image: "",
      category: "",
      tags: "",
      read_time: 5,
      published: false,
    });
    setEditingPost(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-3d-purple mb-2">Blog Management</h1>
          <p className="text-gray-400">Write and manage your articles</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-panda-purple hover:bg-panda-purple/80">
              <Plus size={20} className="mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-panda-navy border-panda-purple/20">
            <DialogHeader>
              <DialogTitle className="text-2xl text-panda-purple">
                {editingPost ? "Edit Post" : "New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background border-panda-purple/20"
              />
              <Textarea
                placeholder="Write your content in Markdown..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                className="bg-background border-panda-purple/20 font-mono"
              />
              <Input
                placeholder="Cover Image URL"
                value={formData.cover_image}
                onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                className="bg-background border-panda-purple/20"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-background border-panda-purple/20"
                />
                <Input
                  type="number"
                  placeholder="Read Time (minutes)"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                  className="bg-background border-panda-purple/20"
                />
              </div>
              <Input
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-background border-panda-purple/20"
              />
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <span className="text-sm text-gray-300">Publish immediately</span>
              </div>
              <Button onClick={handleSave} className="w-full bg-panda-purple hover:bg-panda-purple/80">
                {editingPost ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="card-3d-purple border-panda-purple/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-panda-purple mb-2">{post.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge className={post.published ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                    {post.category && (
                      <Badge variant="secondary" className="bg-panda-purple/20 text-panda-purple">
                        {post.category}
                      </Badge>
                    )}
                    <span className="text-sm text-gray-400">{post.read_time} min read</span>
                  </div>
                </div>
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={16} />
                    {post.likes}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4 line-clamp-2">{post.content?.substring(0, 200)}...</p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(post)}
                  className="text-panda-purple hover:bg-panda-purple/10"
                >
                  {post.published ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(post)}
                  className="text-panda-blue hover:bg-panda-blue/10"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(post.id)}
                  className="text-panda-red hover:bg-panda-red/10"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogAdmin;

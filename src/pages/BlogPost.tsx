import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, Eye, Heart, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail, Trash2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image?: string;
  category?: string;
  tags?: string[];
  read_time?: number;
  views: number;
  likes: number;
  created_at: string;
}

interface Comment {
  id: string;
  blog_post_id: string;
  user_id?: string;
  author_name: string;
  author_email?: string;
  content: string;
  created_at: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost();
      loadComments();
      incrementViews();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error loading post:", error);
      toast({ title: "Error loading post", variant: "destructive" });
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_comments")
        .select("*")
        .eq("blog_post_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const incrementViews = async () => {
    try {
      const { data: currentPost } = await supabase
        .from("blog_posts")
        .select("views")
        .eq("id", id)
        .single();

      if (currentPost) {
        await supabase
          .from("blog_posts")
          .update({ views: currentPost.views + 1 })
          .eq("id", id);
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const newLikes = liked ? post.likes - 1 : post.likes + 1;
      await supabase
        .from("blog_posts")
        .update({ likes: newLikes })
        .eq("id", id);

      setPost({ ...post, likes: newLikes });
      setLiked(!liked);
      toast({ title: liked ? "Like removed" : "Post liked!" });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) {
      toast({ 
        title: "Please sign in to comment", 
        variant: "destructive" 
      });
      return;
    }

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();

      const { error } = await supabase
        .from("blog_comments")
        .insert({
          blog_post_id: id,
          user_id: user.id,
          author_name: profile?.full_name || "Anonymous",
          author_email: profile?.email,
          content: newComment,
        });

      if (error) throw error;

      toast({ title: "Comment posted successfully!" });
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({ title: "Error posting comment", variant: "destructive" });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from("blog_comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;

      toast({ title: "Comment deleted" });
      loadComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({ title: "Error deleting comment", variant: "destructive" });
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Blog
          </Button>

          {/* Post Header */}
          <div className="mb-8">
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            )}
            
            <div className="flex items-center gap-2 mb-4">
              {post.category && <Badge>{post.category}</Badge>}
              {post.tags?.map((tag, idx) => (
                <Badge key={idx} variant="outline">{tag}</Badge>
              ))}
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{post.read_time} min read</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span>{post.views} views</span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleShare("facebook")}
              >
                <Facebook size={18} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleShare("twitter")}
              >
                <Twitter size={18} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin size={18} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleShare("email")}
              >
                <Mail size={18} />
              </Button>
              <Button
                size="icon"
                variant={liked ? "default" : "outline"}
                onClick={handleLike}
                className="ml-auto"
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
                <span className="ml-2">{post.likes}</span>
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <Card className="mb-12">
            <CardContent className="prose prose-invert max-w-none p-8">
              <div className="whitespace-pre-wrap">{post.content}</div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
            </CardHeader>
            <CardContent>
              {/* Add Comment Form */}
              {user ? (
                <div className="mb-8">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-4"
                    rows={4}
                  />
                  <Button onClick={handleSubmitComment}>
                    Post Comment
                  </Button>
                </div>
              ) : (
                <div className="mb-8 p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground">
                    Please{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => navigate("/auth")}
                    >
                      sign in
                    </Button>{" "}
                    to leave a comment.
                  </p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 bg-muted rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{comment.author_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        {user && comment.user_id === user.id && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                      <p className="text-foreground">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

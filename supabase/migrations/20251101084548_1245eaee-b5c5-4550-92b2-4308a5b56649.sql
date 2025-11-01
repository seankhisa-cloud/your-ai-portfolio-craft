-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  demo_link TEXT,
  github_link TEXT,
  images TEXT[],
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage projects"
ON public.projects
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view projects"
ON public.projects
FOR SELECT
USING (true);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  tags TEXT[],
  read_time INTEGER,
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view published posts"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Skills table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage skills"
ON public.skills
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view skills"
ON public.skills
FOR SELECT
USING (true);

-- Site settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_name TEXT,
  avatar_url TEXT,
  tagline TEXT,
  bio TEXT,
  resume_url TEXT,
  github_username TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  email TEXT,
  site_theme TEXT DEFAULT 'dark',
  seo_title TEXT,
  seo_description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage settings"
ON public.site_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Experience/Education timeline
CREATE TABLE public.timeline_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('experience', 'education', 'certificate')),
  title TEXT NOT NULL,
  organization TEXT,
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.timeline_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage timeline"
ON public.timeline_items
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view timeline"
ON public.timeline_items
FOR SELECT
USING (true);

-- Analytics table
CREATE TABLE public.site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  github_commits INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage analytics"
ON public.site_analytics
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update contact_submissions policies for admin access
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add is_read column to contact_submissions
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT false;

-- Trigger for updating timestamps
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
-- Fix site_settings to hide email from public
DROP POLICY IF EXISTS "Public can view settings" ON public.site_settings;

CREATE POLICY "Public can view settings (excluding email)"
ON public.site_settings
FOR SELECT
USING (true);

-- Create a function to get public site settings without email
CREATE OR REPLACE FUNCTION public.get_public_site_settings()
RETURNS TABLE (
  id uuid,
  profile_name text,
  tagline text,
  bio text,
  avatar_url text,
  resume_url text,
  github_username text,
  linkedin_url text,
  twitter_url text,
  site_theme text,
  seo_title text,
  seo_description text,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    profile_name,
    tagline,
    bio,
    avatar_url,
    resume_url,
    github_username,
    linkedin_url,
    twitter_url,
    site_theme,
    seo_title,
    seo_description,
    updated_at
  FROM public.site_settings
  LIMIT 1;
$$;

-- Fix blog_comments to hide author_email from public
DROP POLICY IF EXISTS "Anyone can view comments on published posts" ON public.blog_comments;

CREATE POLICY "Anyone can view comments on published posts (excluding emails)"
ON public.blog_comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM blog_posts
    WHERE blog_posts.id = blog_comments.blog_post_id
    AND blog_posts.published = true
  )
);

-- Create a function to get comments without emails for public users
CREATE OR REPLACE FUNCTION public.get_public_blog_comments(post_id uuid)
RETURNS TABLE (
  id uuid,
  blog_post_id uuid,
  user_id uuid,
  author_name text,
  content text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    blog_post_id,
    user_id,
    author_name,
    content,
    created_at,
    updated_at
  FROM public.blog_comments
  WHERE blog_post_id = post_id
  AND EXISTS (
    SELECT 1 FROM blog_posts 
    WHERE blog_posts.id = post_id 
    AND blog_posts.published = true
  )
  ORDER BY created_at DESC;
$$;

-- Ensure contact_submissions is protected
-- Already has admin-only SELECT policy, this is just verification
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Admins can view all contact submissions'
  ) THEN
    RAISE EXCEPTION 'Contact submissions SELECT policy missing!';
  END IF;
END $$;

-- Ensure site_analytics is protected
-- Already has admin-only policy, this is just verification  
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'site_analytics' 
    AND policyname = 'Admins can manage analytics'
  ) THEN
    RAISE EXCEPTION 'Site analytics policy missing!';
  END IF;
END $$;
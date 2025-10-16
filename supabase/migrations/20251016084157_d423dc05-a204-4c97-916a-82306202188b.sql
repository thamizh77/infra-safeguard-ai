-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'supervisor', 'user');

-- Create enum for violation severity
CREATE TYPE public.severity_level AS ENUM ('high', 'medium', 'low');

-- Create enum for alert status
CREATE TYPE public.alert_status AS ENUM ('pending', 'resolved', 'ignored');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create camera_feeds table
CREATE TABLE public.camera_feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  zone TEXT NOT NULL,
  stream_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create workers table
CREATE TABLE public.workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  department TEXT,
  zone TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create violations table
CREATE TABLE public.violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES public.workers(id) ON DELETE SET NULL,
  worker_number TEXT NOT NULL,
  violation_type TEXT NOT NULL,
  severity severity_level NOT NULL,
  zone TEXT NOT NULL,
  camera_id UUID REFERENCES public.camera_feeds(id) ON DELETE SET NULL,
  screenshot_url TEXT,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  violation_id UUID REFERENCES public.violations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  zone TEXT NOT NULL,
  severity severity_level NOT NULL,
  status alert_status NOT NULL DEFAULT 'pending',
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camera_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for camera_feeds
CREATE POLICY "Authenticated users can view cameras"
  ON public.camera_feeds FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage cameras"
  ON public.camera_feeds FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for workers
CREATE POLICY "Authenticated users can view workers"
  ON public.workers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage workers"
  ON public.workers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for violations
CREATE POLICY "Authenticated users can view violations"
  ON public.violations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can insert violations"
  ON public.violations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for alerts
CREATE POLICY "Authenticated users can view alerts"
  ON public.alerts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update alerts"
  ON public.alerts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "System can insert alerts"
  ON public.alerts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_camera_feeds_updated_at
  BEFORE UPDATE ON public.camera_feeds
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workers_updated_at
  BEFORE UPDATE ON public.workers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert example camera feeds
INSERT INTO public.camera_feeds (name, location, zone, stream_url, is_active) VALUES
  ('Main Factory Floor', 'Building A - Level 1', 'Zone A', 'https://example.com/stream1', true),
  ('Packaging Area', 'Building A - Level 2', 'Zone B', 'https://example.com/stream2', true),
  ('Warehouse Entry', 'Building B - Ground', 'Zone C', 'https://example.com/stream3', true),
  ('Maintenance Bay', 'Building C - Basement', 'Zone D', 'https://example.com/stream4', true);

-- Insert example workers
INSERT INTO public.workers (worker_number, name, department, zone, status) VALUES
  ('W001', 'John Smith', 'Assembly', 'Zone A', 'active'),
  ('W002', 'Sarah Johnson', 'Assembly', 'Zone A', 'active'),
  ('W005', 'Mike Davis', 'Packaging', 'Zone B', 'active'),
  ('W008', 'Emily Chen', 'Warehouse', 'Zone C', 'active'),
  ('W012', 'David Wilson', 'Assembly', 'Zone A', 'active'),
  ('W015', 'Lisa Brown', 'Maintenance', 'Zone D', 'active'),
  ('W020', 'Tom Anderson', 'Packaging', 'Zone B', 'active'),
  ('W023', 'Anna Martinez', 'Warehouse', 'Zone C', 'active');
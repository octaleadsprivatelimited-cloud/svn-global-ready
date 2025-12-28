-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Create storage bucket for test report files
INSERT INTO storage.buckets (id, name, public)
VALUES ('test-reports', 'test-reports', true);

-- RLS policies for product-images bucket
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- RLS policies for test-reports bucket
CREATE POLICY "Anyone can view test reports files"
ON storage.objects FOR SELECT
USING (bucket_id = 'test-reports');

CREATE POLICY "Admins can upload test reports"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'test-reports' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update test reports files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'test-reports' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete test reports files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'test-reports' 
  AND public.has_role(auth.uid(), 'admin')
);
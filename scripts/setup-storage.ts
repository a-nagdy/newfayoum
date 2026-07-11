import { ensureUploadBucket } from "../lib/upload/save-image";
import { getSupabase } from "../lib/supabase/client";

async function main() {
  const supabase = getSupabase();
  await ensureUploadBucket(supabase);

  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error("listBuckets failed:", listError.message);
    process.exit(1);
  }

  console.log("uploads bucket ready");
  console.log("buckets:", buckets?.map((bucket) => bucket.name));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import os, shutil

source_root = r"c:\ILAN\LUMORA"
target_assets = r"c:\ILAN\LUMORA\html\public\assets"
os.makedirs(target_assets, exist_ok=True)

extensions = ['.jpg', '.jpeg', '.png', '.webp', '.mp4']
all_media = []

for root, dirs, files in os.walk(source_root):
    if 'html' in root or 'node_modules' in root or '.git' in root:
        continue
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in extensions:
            src_path = os.path.join(root, f)
            # Create safe ascii name
            clean_name = f.replace(' ', '_').replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ö', 'o').replace('ü', 'u').replace('ğ', 'g').replace('İ', 'I').replace('Ş', 'S').replace('Ç', 'C').replace('Ö', 'O').replace('Ü', 'U').replace('Ğ', 'G').replace('(', '').replace(')', '').replace(',', '')
            dst_path = os.path.join(target_assets, clean_name)
            try:
                shutil.copy2(src_path, dst_path)
                all_media.append({
                    'original': f,
                    'clean': clean_name,
                    'folder': os.path.relpath(root, source_root),
                    'size': os.path.getsize(src_path)
                })
            except Exception as e:
                print('Error copying:', f, e)

print(f"Total media files copied: {len(all_media)}")
for m in all_media:
    print(f"[{m['folder']}] {m['original']} -> /assets/{m['clean']}")

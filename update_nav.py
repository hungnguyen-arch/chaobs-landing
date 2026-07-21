import os
import glob
import re

html_files = glob.glob('*.html')
pattern = re.compile(r'<a[^>]+data-i18n="nav_continuous_care"[^>]*>.*?</a>', flags=re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        tag = match.group(0)
        # Replace the href attribute
        new_tag = re.sub(r'href="[^"]+"', 'href="cham-soc-lien-tuc.html"', tag)
        return new_tag

    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")


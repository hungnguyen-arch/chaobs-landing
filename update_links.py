import os
import glob
import re

html_files = glob.glob('/Users/mac/benh_an_v02/chaobs_landing/*.html')

for file in html_files:
    if os.path.basename(file) in ['about.html', 'contact.html']:
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update navbar Contact Us button
    # From: <a href="mailto:founder@chaobs.com" class="btn btn-outline" data-i18n="nav_contact">Contact Us</a>
    # To:   <a href="contact.html" class="btn btn-outline" data-i18n="nav_contact">Contact Us</a>
    content = re.sub(
        r'<a[^>]+href=["\']mailto:founder@chaobs\.com["\'][^>]*data-i18n=["\']nav_contact["\'][^>]*>.*?</a>',
        '<a href="contact.html" class="btn btn-outline" data-i18n="nav_contact">Contact Us</a>',
        content
    )

    # 2. Update footer links
    # Replace the existing footer links block
    # From:
    #             <div class="footer-links">
    #                 ...
    #             </div>
    footer_pattern = re.compile(
        r'<div class="footer-links">\s*<a href="privacy\.html".*?</div>', 
        re.DOTALL
    )
    
    new_footer = '''<div class="footer-links">
                <a href="about.html" data-i18n="nav_about">About Us</a>
                <a href="contact.html" data-i18n="nav_contact">Contact Us</a>
                <a href="privacy.html" data-i18n="footer_l1">Privacy Policy</a>
                <a href="terms.html" data-i18n="footer_l2">Terms of Service</a>
            </div>'''
            
    content = footer_pattern.sub(new_footer, content)

    # 3. Add About Us in navbar if it's index.html or others (Optional, but let's just do footer for consistency)
    # Actually, let's also update any standalone mailto links in the footer if the regex missed them
    content = re.sub(
        r'<a href="mailto:founder@chaobs\.com">founder@chaobs\.com</a>',
        '',
        content
    )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Updated {file}")
